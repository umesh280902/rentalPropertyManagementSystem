const express = require('express');
const Router = express.Router();
const multer = require('multer');
const { authenticate } = require('./user');
const Property = require('./propertySchema');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { User } = require('./database');

const propertySecretKey = 'propertyFilesNotToBeShared';

// Define a storage strategy for multer to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public'); // Destination folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Set the filename
    },
});

const upload = multer({ storage });

Router.get('/user/property', authenticate, (req, res) => {
    res.render('uploadRentDetails');
});

Router.post('/user/property', authenticate, upload.array('images'), async (req, res) => {
    try {
        const {
            propertyType,
            buildingName,
            facing,
            contactNo,
            squareFeet,
            securityDeposit,
            furnishing,
            flooring,
            ageOfConstruction,
            waterAvailability,
            numberOfLifts,
            electricityStatus,
            landmark,
            noOfBedroom,
            noOfBathroom,
            rentalValue,
            description,
            street,
            area,
            city,
            state,
            postalCode,
            country
        } = req.body;

        const images = req.files.map(file => ({
            fileName: file.path, // Store the filename in the database
        }));

        if (images.length === 0 || !buildingName || !propertyType || !facing || !contactNo || !squareFeet || !securityDeposit || !furnishing || !flooring || !ageOfConstruction || !waterAvailability || !numberOfLifts || !electricityStatus||!landmark||
            !noOfBedroom||
            !noOfBathroom||
            !rentalValue||
            !description
            ) {
            return res.send('Please fill out all the details.');
        }

        const propertyDetails = new Property({
            images,
            propertyType,
            buildingName,
            facing,
            contactNo,
            squareFeet,
            securityDeposit,
            furnishing,
            flooring,
            ageOfConstruction,
            waterAvailability,
            numberOfLifts,
            landmark,
            noOfBedroom,
            noOfBathroom,
            rentalValue,
            description,
            electricityStatus,
            address: {
                street,
                area,
                city,
                state,
                postalCode,
                country
            },
        });

        const saveData = await propertyDetails.save();
        console.log(saveData);
        res.redirect('/user/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

Router.get('/property', async (req, res) => {
    try {
        const Properties = await Property.find({});

        // Map through the properties and create a combined address
        const updatedProperties = Properties.map((property) => {
            const combinedAddress = `${property.address.area} ${property.address.street} ${property.address.city} ${property.address.state} ${property.address.postalCode} ${property.address.country}`;
            const imagePath='http://localhost:8800/'
            // Remove the 'public' directory from each image's fileName
            const removedPath=property.images[0].fileName.replace('public\\','')
            const updatedImages =imagePath+removedPath 

            return {
                ...property.toObject(),
                address: combinedAddress,
                images: updatedImages,
            };
        });

        console.log(updatedProperties);
        res.send([updatedProperties]);
    } catch (error) {
        console.log(error);
    }
});



Router.get('/property/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const property = await Property.findOne({ _id: id });
        console.log(property)
        //console.log(property.images)
        if (!property) {
            return res.status(404).send('Property not found');
        }

        const findToken = req.cookies.propertyViewsToken;
        const uniqueToken = uuidv4();

        if (!findToken) {
            // If the user doesn't have a view token, generate one and store it in a cookie.
            property.views = property.views || [];
            property.views.push({ token: uniqueToken });
            await property.save();
            const token = jwt.sign({ uniqueToken }, propertySecretKey);
            res.cookie('propertyViewsToken', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
        }

        res.render(property);
    } catch (error) {
        console.log(error);
        // Handle other errors as needed.
    }
});


Router.post('/property/:id', authenticate, async (req, res) => {
    try {
        const details = req.body;
        const email = req.email;

        // Find the user by email
        const findUser = await User.findOne({ email });
        const name = findUser.firstname + ' ' + findUser.lastname;

        // Find the property by its ID
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).send('Property not found');
        }

        // Check if the user has already commented
        const existingComment = property.comments.find((comment) => comment.name === name);

        if (existingComment) {
            // If the user has already commented, append to their existing comment
            existingComment.comment.push(details.comment);
        } else {
            // If it's the user's first comment on this property, create a new comment entry
            property.comments.push({
                name,
                comment: [details.comment]
            });
        }

        // Save the property with the updated comments
        await property.save();

        // Redirect back to the property page
        res.redirect(`/property/${propertyId}`);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});

// Add this route to your Express application
Router.post('/property/:id/like', authenticate, async (req, res) => {
    try {
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId);

        // Check if the user has already liked this property
        const findUser = await User.findOne({ email: req.email });
        const name=findUser.firstname+' '+findUser.lastname
        if (property.likes.some((like) => like.name === name)) {
            return res.status(400).json({ error: 'You have already liked this property' });
        }

        // Increment the likes count and add the user's like to the property
        property.likes.push({
            name: name,
        });

        property.likesCount += 1;

        // Save the property with the updated likes
        await property.save();

        res.redirect(`/property/${propertyId}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports=Router
