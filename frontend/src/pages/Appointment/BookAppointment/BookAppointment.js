// Author: Arvinder Singh (B00878415)

import React, {useState} from "react";
import {Button, Dialog, DialogTitle, TextField} from "@mui/material";
import { useParams } from "react-router-dom";
import axios_api from "../../../common/axios";
import {useNavigate} from "react-router-dom";

const BookAppointment = () => {
    const urlParams = useParams();
    const { userId, propertyId } = urlParams;
    const navigate = useNavigate();
    const [openBookingDialog, setOpenBookingDialog] = useState(true);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [appointmentConfirmation, setAppointmentConfirmation] = useState(false);
    const [ failedBooking, setFailedBooking ] = useState(false);

    const handleDate = (event) => {
        setDate(event.target.value);
    }

    const handleTime = (event) => {
        setTime(event.target.value);
    }

    const handleAppointmentButton = (event) => {
        if (date && time) {
            axios_api.post("/appointments/addAppointment", {
                property_id: propertyId,
                user_id: userId,
                appointment_date: date,
                appointment_time: time
            }).then((res) => {
                if (res.data.success) {
                    setOpenBookingDialog(false);
                    setAppointmentConfirmation(true);
                } else {
                    setOpenBookingDialog(false);
                    setFailedBooking(true);
                }
            })
        } else {
            setOpenBookingDialog(false);
            setFailedBooking(true);
        }
    }

    const handleSuccessClose = (event) => {
        setAppointmentConfirmation(false);
        navigate(`/propertyDetails/${propertyId}`);
    }

    const handleFailClose = () => {
        setTime("");
        setDate("");
        setAppointmentConfirmation(false);
        setOpenBookingDialog(true);
    }

    return (
        <div>
            <Dialog open={openBookingDialog} fullWidth={true}>
                <DialogTitle style={{textAlign: "center"}}>Appointment Date and Time</DialogTitle>
                <table style={{textAlign: "center", margin: "40px"}}>
                    <tbody>
                        <tr>
                            <td>
                                <TextField
                                    id={"date"}
                                    label={"Select Date"}
                                    type={"date"}
                                    sx={{width: 180}}
                                    InputLabelProps={{shrink: true}}
                                    onChange={handleDate}
                                />
                                <TextField
                                    id={"time"}
                                    label={"Select Time"}
                                    type={"time"}
                                    sx={{width: 180}}
                                    InputLabelProps={{shrink: true}}
                                    onChange={handleTime}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={{textAlign: "center"}}>
                    <Button
                        variant={"contained"}
                        style={{width: "200px", marginBottom: "20px"}}
                        onClick={handleAppointmentButton}
                    >
                        Book Appointment
                    </Button>
                </div>
            </Dialog>
            <Dialog open={appointmentConfirmation} fullWidth={true}>
                <p style={{textAlign: "center", marginTop: "20px"}}>Appointment Confirmed!!!</p>
                <div style={{textAlign: "center", margin: "20px"}}>
                    <Button variant={"contained"} style={{width: "200px"}} onClick={handleSuccessClose}>Close</Button>
                </div>
            </Dialog>
            <Dialog open={failedBooking} fullWidth={true}>
                <p style={{textAlign: "center", marginTop: "20px"}}>Appointment Booking Failed!!!</p>
                <div style={{textAlign: "center", margin: "20px"}}>
                    <Button variant={"contained"} style={{width: "200px"}} onClick={handleFailClose}>Close</Button>
                </div>
            </Dialog>
        </div>
    )
}

export default BookAppointment;