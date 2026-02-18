const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Donation = require('../models/Donation');
// @desc    Get impact stats
// @route   GET /api/stats
// @access  Public
router.get('/', async (req, res) => {
    try {
        const totalDonors = await User.countDocuments({ role: 'donor' });
        const totalNGOs = await User.countDocuments({ role: 'ngo' });
        // Total food saved (delivered donations)
        const totalFoodSaved = await Donation.countDocuments({ status: 'delivered' });
        // Total meals served (sum of quantity of delivered donations)
        const result = await Donation.aggregate([
            { $match: { status: 'delivered' } },
            { $group: { _id: null, totalMeals: { $sum: '$quantity' } } }
        ]);
        const totalMealsServed = result.length > 0 ? result[0].totalMeals : 0;
        res.json({
            totalDonors,
            totalNGOs,
            totalFoodSaved,
            totalMealsServed,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
