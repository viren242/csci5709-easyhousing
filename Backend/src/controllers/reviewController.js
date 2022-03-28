const { reviews, appointments, properties } = require("../models");

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
                reviews: listOfReviews
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

        if (!review) {
            res.status(404).json({
                message: "No Review Available",
                success: false
            })
        } else {
            res.status(200).json({
                message: "Review Retrieved",
                success: true,
                review: review
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
                where: { rating_id: review.dataValues.rating_id }
            }).then( () => {
                res.status(200).json({
                    message: "Review Updated",
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
                where: { review_id: review.review_id }
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

const getUserReviews = async (req, res) => {
    try {
        const listMyAppointments = await appointments.findAll({
            where: { user_id: req.params.userId, isDeleted: false }
        })
        if (!listMyAppointments || !listMyAppointments.length) {
            res.status(404).json({
                message: "No Appointment Available",
                success: false
            })
        } else {
            const numOfReviews = listMyAppointments.length;
            let listOfReviews = [];
            for (let i = 0; i < numOfReviews; i++) {
                const user = listMyAppointments[i].user_id;
                const property = listMyAppointments[i].property_id;
                const review = await reviews.findOne({
                    where: { user_id: user, property_id: property }
                })
                if (!review) {
                    const propertyImg = await properties.findOne({
                        where: { id: property }
                    })
                    let image = "";
                    if (!propertyImg || !propertyImg.dataValues.image || propertyImg.dataValues.image === "") {
                        image = 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                    } else {
                        image = propertyImg.dataValues.image;
                    }
                    listOfReviews.push({
                        user_id: user,
                        property_id: property,
                        images: image,
                        review_id: "",
                        review: ""
                    })
                } else {
                    const propertyImg = await properties.findOne({
                        where: { id: property }
                    })
                    let image = "";
                    if (!propertyImg || !propertyImg.dataValues.image || propertyImg.dataValues.image === "") {
                        image = 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                    } else {
                        image = propertyImg.dataValues.image;
                    }
                    listOfReviews.push({
                        user_id: user,
                        property_id: property,
                        images: image,
                        review_id: review.dataValues.review_id,
                        review: review.dataValues.review
                    })
                }
            }
            res.status(200).json({
                message: "Reviews Retrieved",
                success: true,
                reviews: listOfReviews
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!",
            success: false,
            error: err.message
        })
    }
}

module.exports = { addReview, getAllReviews, getUserReviews, getReview, updateReview, deleteReview };