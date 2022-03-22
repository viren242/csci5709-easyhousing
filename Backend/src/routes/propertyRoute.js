const express = require('express');
const router = express.Router();

const { getAllProperties, getProperty, createProperty, updateProperty, deleteProperty, getMyProperties, getFilterProperties } = require("../controllers/propertyController");
const { propertyValidationRules, validateRequest, filterValidationRules } = require("../utils/propertyValidation");

router.get("/getAllPropeties", getAllProperties);
router.get("/getProperty/:id", getProperty);
router.get("/getMyProperties/:userid", getMyProperties);
router.post(
    "/createProperty",
    propertyValidationRules(),
    validateRequest,
    createProperty
);
router.put(
    "/updateProperty/:id",
    propertyValidationRules(),
    validateRequest,
    updateProperty
);
router.delete("/deleteProperty/:id", deleteProperty);

router.post(
    "/getFilterProperties",
    filterValidationRules(),
    validateRequest,
    getFilterProperties);

module.exports = router;