// Author: Purvilkumar Bharthania (B00901605)

const express = require('express');
const router = express.Router();

const { getAllReports, addReport, deleteReport } = require("../controllers/reportController");

router.post("/addReport", addReport);
router.get("/getAllReports", getAllReports);
router.delete("/deleteReport/:id", deleteReport);





module.exports = router;