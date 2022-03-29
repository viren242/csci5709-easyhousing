// Author: Purvilkumar Bharthania (B00901605)

const { reports } = require("../models");

//Report Root
const reportRoot = (req, res) => {
    try {
        res.setHeader("Content_type", "application/json");
        return res.status(200).json({ message: "Welcome to Report Module", success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};


const getAllReports = async (req, res) => {
    try {
        res.setHeader("Content_type", "application/json");
        const listOfReports = await reports.findAll();
        if (!listOfReports || !listOfReports.length) {
            return res.status(404).json({ message: "No Reports available!!", success: false });
        }
        return res.status(200).json({ message: "Reports retrieved", success: true, data: listOfReports });
    } catch (error) {
        return res.status(500).json({ message: error.message, message: "Unable to get all Reports!!", success: false });
    }
};


const addReport = async (req, res) => {
    try {
        res.setHeader("Content_type", "application/json");
        await reports.create(req.body).then(() => {
            return res.status(201).json({ message: "Reported Successfully", success: true });
        });
    } catch (error) {
        return res.status(500).json({ error: error.message, message: "Unable to Report Property!!", success: false });
    }
};



const deleteReport = async (req, res) => {
    try {
        res.setHeader("Content_type", "application/json");
        const report_id = req.params.id;
        const reportById = await reports.findByPk(report_id);

        if (!reportById) {
            return res.status(404).json({ message: "Report not found!!", success: false });
        }

        await reports.destroy({
            where: {
                id: report_id
            }
        }).then(() => {
            return res.status(200).json({ message: "Report Deleted Successfully", success: true });
        })
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Unable to delete Property details!!", success: false });
    }
};





module.exports = { reportRoot, getAllReports, addReport, deleteReport };
