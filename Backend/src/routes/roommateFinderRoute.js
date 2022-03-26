const express = require("express");
const router = express.Router();
const { getAllListing } = require("../controllers/roommatefinderController");
const { addListing } = require("../controllers/roommatefinderController");
const { editListing } = require("../controllers/roommatefinderController");
const { getListingById } = require("../controllers/roommatefinderController");
const { deleteListing } = require("../controllers/roommatefinderController");

router.get("/", getAllListing);
router.get("/:id",getListingById);
router.post("/",addListing);
router.put("/:id",editListing);
router.delete("/:id",deleteListing);


module.exports = router;
