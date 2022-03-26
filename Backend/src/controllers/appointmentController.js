const { appointments } = require("../models");

const getAllAppointments = async (req, res) => {
    try {
        const listOfAppointments = await appointments.findAll({
            where: { user_id: req.params.userId }
        });

        if (!listOfAppointments || !listOfAppointments.length) {
            res.status(404).json({
                message: "No Appointment Available",
                success: false
            })
        } else {
            res.status(200).json({
                message: "Appointments Retrieved",
                success: true,
                appointments: listOfAppointments
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!",
            success: false,
            error: err.message
        })
    }
};

const getAppointment = async (req, res) => {
    try {
        const user = req.params.userId;
        const property = req.params.propertyId;
        const appointment = await appointments.findOne({
            where: { user_id: user, property_id: property }
        })

        if (!appointment || !appointment.length) {
            res.status(404).json({
                message: "No Appointment Available",
                success: false
            })
        } else {
            res.status(200).json({
                message: "Appointment Retrieved",
                success: true,
                ratings: appointment
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!",
            success: false,
            error: err.message
        })
    }
};

const addAppointment = async (req, res) => {
    try {
        await  appointments.create(req.body).then(() => {
            res.status(200).json({
                message: "Appointment Added",
                success: true
            })
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!",
            success: false,
            error: err.message
        })
    }
};

const updateAppointment = async (req, res) => {
    try {
        const user = req.params.userId;
        const property = req.params.propertyId;
        const appointment = await appointments.findOne({
            where: { user_id: user, property_id: property }
        })

        if (!appointment) {
            res.status(404).json({
                message: "Appointment not available",
                success: false
            })
        } else {
            await appointments.update(req.body, {
                where: { appointment_id: appointment.appointment_id }
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!",
            success: false,
            error: err.message
        })
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const user = req.params.userId;
        const property = req.params.propertyId;
        const appointment = await appointments.findOne({
            where: { user_id: user, property_id: property }
        })

        if (!appointment) {
            res.status(404).json({
                message: "Appointment not available",
                success: false
            })
        } else {
            await appointments.destroy({
                where: { appointment_id: appointment.appointment_id }
            }).then(() => {
                res.status(200).json({
                    message: "Appointment Deleted",
                    success: true
                })
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!",
            success: false,
            error: err.message
        })
    }
};

module.exports = { getAllAppointments, getAppointment, addAppointment, updateAppointment, deleteAppointment };