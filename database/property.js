const express = require('express');
const Router = express.Router();
const multer = require('multer');
const {authenticate} = require('./user');
const Property = require('./propertySchema');

// Define a storage strategy for multer to handle file uploads
const storage = multer.memoryStorage();

// Create a multer instance with the defined storage
const upload = multer({ storage: storage });

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
            electricityStatus
        } = req.body;

        const images = req.files.map(file => ({
            name: file.originalname, // Store the original filename
            data: file.buffer, // Store image data as a Buffer
            contentType: file.mimetype // Store content type for later use
        }));
        console.log(images)
        console.log(req.body)
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
            electricityStatus: electricityStatus
        });

        const saveData = await propertyDetails.save();
        console.log(saveData);
        res.redirect('/user/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = Router;
