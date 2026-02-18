const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    foodType: {
        type: String,
        enum: ['veg', 'non-veg'],
        required: [true, 'Please specify food type'],
    },
    quantity: {
        type: Number, // Number of people it serves
        required: [true, 'Please specify quantity (number of people)'],
    },
    pickupAddress: {
        type: String,
        required: [true, 'Please specify pickup address'],
    },
    location: { // GeoJSON point
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: [0, 0], // [longitude, latitude]
        },
    },
    expiryTime: {
        type: Date,
        required: [true, 'Please specify when the food expires'],
    },
    contactPhone: {
        type: String,
        required: [true, 'Please provide contact phone'],
    },
    specialInstructions: String,
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'picked-up', 'delivered', 'expired'],
        default: 'pending',
    },
    claimedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // The NGO/Volunteer who claimed it
    },
    claimedAt: Date,
    pickedUpAt: Date,
    deliveredAt: Date,
}, { timestamps: true });

// Index for geospatial queries
DonationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Donation', DonationSchema);
