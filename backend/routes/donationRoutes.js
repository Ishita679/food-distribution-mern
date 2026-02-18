const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get donations
// @route   GET /api/donations
// @access  Private (Donor sees theirs, NGO sees pending/theirs)
router.get('/', protect, async (req, res) => {
    try {
        const { status, donorId } = req.query;
        let query = {};
        if (status) query.status = status;
        if (donorId) query.donor = donorId;
        // If no specific filters, implement role-based logic if needed
        // For now, let's keep it flexible as previously implemented
        const donations = await Donation.find(query)
            .populate('donor', 'name phone address')
            .sort({ createdAt: -1 });

        res.json({ donations }); // Frontend expects { donations: [] }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// @desc    Create donation
// @route   POST /api/donations
// @access  Private (Donor only)
router.post('/', protect, async (req, res) => {
    if (req.user.role !== 'donor') {
        return res.status(403).json({ message: 'Only donors can create donations' });
    }
    try {
        const donation = await Donation.create({
            ...req.body,
            donor: req.user._id,
        });
        res.status(201).json(donation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// @desc    Update donation status
// @route   PUT /api/donations/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }
        // Role-based logic
        if (req.user.role === 'ngo') {
            const { status } = req.body;
            // Accepting a donation
            if (status === 'accepted' && donation.status === 'pending') {
                donation.status = 'accepted';
                donation.claimedBy = req.user._id;
                donation.claimedAt = Date.now();
            }
            // Marking as picked up
            else if (status === 'picked-up' && donation.status === 'accepted' && donation.claimedBy.toString() === req.user._id.toString()) {
                donation.status = 'picked-up';
                donation.pickedUpAt = Date.now();
            }
            // Marking as delivered
            else if (status === 'delivered' && donation.status === 'picked-up' && donation.claimedBy.toString() === req.user._id.toString()) {
                donation.status = 'delivered';
                donation.deliveredAt = Date.now();
            } else {
                return res.status(400).json({ message: 'Invalid status transition or unauthorized' });
            }
        } else {
            // Allow donors or admins to update specific fields if needed, or just return 403
            // For MVP, only NGOs update status via this route usually
            return res.status(403).json({ message: 'Not authorized to update this donation' });
        }
        const updatedDonation = await donation.save();
        res.json(updatedDonation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
