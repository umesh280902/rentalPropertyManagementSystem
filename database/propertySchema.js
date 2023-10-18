const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    images: [
        {
            name: {
                type: String,
                required: true,
            },
            data: {
                type: Buffer,
                required: true,
            },
            contentType: {
                required: true,
                type: String,
            },
        },
    ],
    propertyType: {
        type: String,
        required: true,
        enum: ['sell', 'rent', 'commercial'],
    },
    buildingName: {
        type: String,
        required: true,
    },
    facing: {
        type: String,
        required: true,
        enum: ['east', 'west', 'north', 'south', 'northeast', 'northwest', 'southeast', 'southwest'],
    },
    contactNo: {
        type: String, // Store phone numbers as strings
        required: true,
        ref: 'User', // Reference to the User collection
    },
    squareFeet: {
        type: String,
        required: true,
    },
    securityDeposit: {
        type: String,
        required: true,
    },
    furnishing: {
        type: String,
        required: true,
        enum: ['furnished', 'semi-furnished', 'unfurnished'],
    },
    flooring: {
        type: String,
        required: true,
    },
    ageOfConstruction: {
        type: String,
        required: true,
    },
    waterAvailability: {
        type: String,
        required: true,
    },
    numberOfLifts: {
        type: Number,
        required: true,
    },
    electricityStatus: {
        type: String,
        required: true,
    },
    // Add more fields as needed
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
