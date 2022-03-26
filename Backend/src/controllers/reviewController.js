const { reviews } = require("../models");

const getAllReviews = async (req, res) => {
    try {
        const listOfReviews = await reviews.findAll({
            where: {
                user_id: req.params.userId
            }
        });
        if (!listOfReviews || !listOfReviews.length) {
            res.status(404).json({
                message: "No Review Available",
                success: false
            })
        } else {
            res.status(200).json({
                message: "Reviews Retrieved",
                success: true,
                ratings: listOfReviews
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        })
    }
};

const getReview = async (req, res) => {
    try {
        const user = req.params.userId;
        const property = req.params.propertyId;
        const review = await reviews.findOne({
            where: { user_id: user, property_id: property }
        })

        if (!review || !review.length) {
            res.status(404).json({
                message: "No Review Available",
                success: false
            })
        } else {
            res.status(200).json({
                message: "Review Retrieved",
                success: true,
                ratings: review
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        })
    }
};

const addReview = async (req, res) => {
    try {
        await reviews.create(req.body).then(() => {
            res.status(201).json({
                message: "Review Added",
                success: true
            })
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        })
    }
};

const updateReview = async (req, res) => {
    try {
        const user = req.params.userId;
        const property = req.params.propertyId;
        const review = await reviews.findOne({
            where: { user_id: user, property_id: property }
        })

        if (!review) {
            res.status(404).json({
                message: "Review not available",
                success: false
            })
        } else {
            await reviews.update(req.body, {
                where: { rating_id: review.rating_id }
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        })
    }
};

const deleteReview = async (req, res) => {
    try {
        const user = req.params.userId;
        const property = req.params.propertyId;
        const review = await reviews.findOne({
            where: { user_id: user, property_id: property }
        })

        if (!review) {
            res.status(404).json({
                message: "Review not available",
                success: false
            })
        } else {
            await reviews.destroy({
                where: { rating_id: review.rating_id }
            }).then(() => {
                res.status(200).json({
                    message: "Review Deleted",
                    success: true
                })
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        })
    }
};

module.exports = { addReview, getAllReviews, getReview, updateReview, deleteReview };