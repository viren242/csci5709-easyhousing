//Author: Lins George (B00895654)
const express = require("express");
const router = express.Router();

var multer  = require('multer')
const path = require('path');
const { IMAGE_URL } = require('../config/constants');
const { getAllListing } = require("../controllers/roommatefinderController");
const { addListing } = require("../controllers/roommatefinderController");
const { editListing } = require("../controllers/roommatefinderController");
const { getListing } = require("../controllers/roommatefinderController");
const { deleteListing } = require("../controllers/roommatefinderController");
const { getListingById } = require("../controllers/roommatefinderController");

router.get("/", getAllListing);
router.get("/:id",getListing);
router.post("/",addListing);
router.put("/:id",editListing);
router.delete("/:id",deleteListing);
router.get("/ListingById/:id", getListingById);

var imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "images"));

    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: imageStorage })

router.post(
    "/imageUpload",
    upload.single('image'), (req, res) => {
        console.log(req.file.path)
        res.send( IMAGE_URL + `${req.file.path}`)
    },
)

module.exports = router;
