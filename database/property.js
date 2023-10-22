const express = require('express');
const Router = express.Router();
const multer = require('multer');
const {authenticate} = require('./user');
const Property = require('./propertySchema');
const jwt=require('jsonwebtoken')
const {v4:uuidv4}=require('uuid');
const { User } = require('./database');
// Define a storage strategy for multer to handle file uploads

const propertySecretKey='propertyFilesNotToBeShared'

const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public'); // Destination folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Set the filename
    },
});

const upload=multer({storage:Storage})

Router.get('/user/property', authenticate, (req, res) => {
    res.render('uploadRentDetails');
});

// Use upload.array to allow multiple image uploads with the same field name 'images'
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
            'address.street': street,
            'address.area': area,
            'address.city': city,
            'address.state': state,
            'address.postalCode': postalCode,
            'address.country': country
        } = req.body;

        console.log(req.files);
        console.log(req.body);
        
        const images = req.files.map(file => ({
            fileName: file.path, // Store the filename in the database
        }));
        
        console.log(images);
        console.log(req.body);

        if (images.length === 0 || !buildingName || !propertyType || !facing || !contactNo || !squareFeet || !securityDeposit || !furnishing || !flooring || !ageOfConstruction || !waterAvailability || !numberOfLifts || !electricityStatus) {
            return res.send("Please fill out all the details.");
        }

        const propertyDetails = new Property({
            images: images,
            propertyType: propertyType,
            buildingName: buildingName,
            facing: facing,
            contactNo: contactNo,
            squareFeet: squareFeet,
            securityDeposit: securityDeposit,
            furnishing: furnishing,
            flooring: flooring,
            ageOfConstruction: ageOfConstruction,
            waterAvailability: waterAvailability,
            numberOfLifts: numberOfLifts,
            electricityStatus: electricityStatus,
            address: {
                street: street,
                area: area,
                city: city,
                state: state,
                postalCode: postalCode,
                country: country
            }
        });

        const saveData = await propertyDetails.save();
        console.log(saveData);
        res.redirect('/user/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

Router.get('/property',async (req,res)=>{
    try {
        const Properties=await Property.find({})
        console.log(Properties[0].images)
        res.render('property',{
            Properties
        }) 
    } catch (error) {
        console.log(error)
    }
})
Router.get('/property/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const property = await Property.findOne({ _id: id });
        //console.log(property)
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

        res.render('singleProperty',{property} );
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




module.exports = Router;
