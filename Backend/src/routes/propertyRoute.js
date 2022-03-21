const express = require('express');
const router = express.Router();

const { getAllPropeties, getProperty, createProperty, updateProperty, deleteProperty, getMyProperties } = require("../controllers/propertyController");
const { propertyValidationRules, validateRequest } = require("../utils/propertyValidation");

router.get("/", getAllPropeties);
router.get("/:id", getProperty);
router.get("/myproperty/:userid", getMyProperties);
router.post(
    "/",
    propertyValidationRules(),
    validateRequest,
    createProperty
);
router.put(
    "/:id",
    propertyValidationRules(),
    validateRequest,
    updateProperty
);
router.delete("/:id", deleteProperty);

module.exports = router;