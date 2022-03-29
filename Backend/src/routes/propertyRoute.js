const express = require('express');
const router = express.Router();
const multer = require('multer')
const { getAllProperties, getProperty, createProperty, updateProperty, deleteProperty, getMyProperties, getFilterProperties } = require("../controllers/propertyController");
const { propertyValidationRules, validateRequest, filterValidationRules } = require("../utils/propertyValidation");
const path = require('path');
const { IMAGE_URL } = require('../config/constants');
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(path.dirname(__dirname), "images"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
});

const upload = multer({ storage: fileStorage })

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

router.post(
    "/uploadImage",
    upload.single('image'), (req, res) => {
        console.log(req.file.path)
        res.send(IMAGE_URL + `${req.file.filename}`)
    },
)


module.exports = router;