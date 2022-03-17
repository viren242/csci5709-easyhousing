const express = require("express");
const router = express.Router();
const { getAllServices } = require("../controllers/serviceController");
const { addService } = require("../controllers/serviceController");
const { editService } = require("../controllers/serviceController");
const { getService } = require("../controllers/serviceController");

router.get("/", getAllServices);
router.get("/:id",getService);
router.post("/",addService);
router.put("/:id",editService);


module.exports = router;
