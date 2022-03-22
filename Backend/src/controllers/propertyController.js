const bcrypt = require("bcryptjs");
const { SALT_VALUE } = require("../config/index");
const { properties } = require("../models");

//Property Root
const propertyRoot = (req, res) => {
    try {
        res.setHeader("Content_type", "application/json");
        res
            .status(200)
            .json({ message: "Welcome to Property Management Module", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};


const getAllPropeties = async (req, res) => {
    try {
        res.setHeader("Content_type", "application/json");
        const listOfProperties = await properties.findAll();
        if (!listOfProperties || !listOfProperties.length) {
            return res.status(404).json({ message: "Properties details not found!!", success: false });
        }
        return res.status(200).json({ message: "Properties retrieved", success: true, data: listOfProperties });
    } catch (error) {
        return res.status(500).json({ message: error.message, message: "Unable to get all Properties details!!", success: false });
    }
};

const getProperty = async (req, res) => {

    try {
        const property_id = req.params.id;

        const propertyById = await properties.findByPk(property_id);

        if (propertyById) {
            return res.status(200).json({ message: "Property retrieved from Id", success: true, data: propertyById });
        } else {
            return res.status(404).json({ message: "Property details not found!!", success: false });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, message: "Unable to get Property details from Id!!", success: false });
    }

};

const getMyProperties = async (req, res) => {

};

const createProperty = async (req, res) => {
    try {
        res.setHeader("Content_type", "application/json");
        await properties.create(req.body).then(() => {
            return res.status(201).json({ message: "Property added", success: true });
        });
    } catch (error) {
        return res.status(500).json({ error: error.message, message: "Unable to add Property details!!", success: false });
    }
};

const updateProperty = async (req, res) => {

};

const deleteProperty = async (req, res) => {

};



module.exports = { propertyRoot, getAllPropeties, getProperty, getMyProperties, createProperty, updateProperty, deleteProperty };
