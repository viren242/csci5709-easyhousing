const { ratings } = require("../models");

const getAllRatings = async (req, res) => {
    try {
        const listOfRatings = await ratings.findAll({
            where: {
                user_id: req.params.userId
            }
        });
        if (!listOfRatings || !listOfRatings.length) {
            res.status(404).json({
                message: "No Rating Available",
                success: false
            })
        } else {
            res.status(200).json({
                message: "Ratings Retrieved",
                success: true,
                ratings: listOfRatings
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

const getRating = async (req, res) => {
    try {
        const user = req.params.userId;
        const property = req.params.propertyId;
        const rating = await ratings.findOne({
            where: { user_id: user, property_id: property }
        })

        if (!rating) {
            res.status(404).json({
                message: "No Rating Available",
                success: false
            })
        } else {
            res.status(200).json({
                message: "Rating Retrieved",
                success: true,
                rating: rating
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

const addRating = async (req, res) => {
    try {
        await ratings.create(req.body).then(() => {
            res.status(201).json({
                message: "Rating Added",
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

const updateRating = async (req, res) => {
    try {
        const user = req.params.userId;
        const property = req.params.propertyId;
        const rating = await ratings.findOne({
            where: { user_id: user, property_id: property }
        })

        if (!rating) {
            res.status(404).json({
                message: "Rating not available",
                success: false
            })
        } else {
            await ratings.update(req.body, {
                where: { rating_id: rating.dataValues.rating_id }
            }).then( () => {
                res.status(200).json({
                    message: "Rating Updated",
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

const deleteRating = async (req, res) => {
    try {
        const user = req.params.userId;
        const property = req.params.propertyId;
        const rating = await ratings.findOne({
            where: { user_id: user, property_id: property }
        })

        if (!rating) {
            res.status(404).json({
                message: "Rating not available",
                success: false
            })
        } else {
            await ratings.destroy({
                where: { rating_id: rating.rating_id }
            }).then(() => {
                res.status(200).json({
                    message: "Rating Deleted",
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

module.exports = { addRating, getAllRatings, getRating, updateRating, deleteRating };