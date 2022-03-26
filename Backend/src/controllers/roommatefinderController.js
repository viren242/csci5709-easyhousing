const { roommateListings } = require("../models");
const { use } = require("../routes/roommateFinderRoute");

const RoomateFinderListingRoot = (req, res) => {
    try {
        res.setHeader("Content_type", "application/json");
        res
            .status(200)
            .json({ message: "Welcome to Roommate finder Module", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getAllListing = async (req, res) => {
    try {
        const listings = await roommateListings.findAll();
        res.setHeader("Content_type", "application/json");
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

const addListing = async (req, res) => {
    try {
        const listingBody = req.body;
        await roommateListings.create(listingBody).then(() => {
            res.status(200).json({ message: "Listing added", success: true });
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

const editListing = async (req, res) => {
    try {
        const id = req.params.id;
        const listingWithId = await roommateListings.findByPk(id);

      

        await properties.update(req.body, {
            where: {
                id: property_id
            }
        }).then(() => {
            return res.status(200).json({ message: "Property Details Updated", success: true });
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

const getListing = async (req, res) => {
    try {
        const id = req.params.id;
        const s = await roommateListings.findByPk(id);
        res.status(200).json(s);
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

const deleteListing = async (req, res) => {
    try {
        const id = req.params.id;
        const s = await roommateListings.findByPk(id);
        await roommateListings.destroy({
            where: {
                id:id
            }
        }).then(() => {
            res.status(200).json(s);
        })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

module.exports = { RoomateFinderListingRoot };
module.exports = { getAllListing, addListing, editListing, getListing, deleteListing };
