const express = require("express");
const router = express.Router();
const { getAllServices } = require("../controllers/serviceController");
const { addService } = require("../controllers/serviceController");

router.get("/", getAllServices);
router.post("/",addService);


module.exports = router;
