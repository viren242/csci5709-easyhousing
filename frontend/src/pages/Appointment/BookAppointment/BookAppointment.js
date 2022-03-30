// Author: Arvinder Singh (B00878415)

import React, {useState} from "react";
import {Button, Dialog, DialogTitle, TextField} from "@mui/material";
import axios_api from "../../../common/axios";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../common/constants";

function BookAppointment(props) {

    const navigate = useNavigate();
    const [openBookingDialog, setOpenBookingDialog] = useState(false);
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

    const handleBook = () => {
        if (props.userId) {
            setOpenBookingDialog(true);
        } else {
            navigate(ROUTES.LOGIN);
        }
    }

    const handleAppointmentButton = (event) => {
        if (date && time) {
            axios_api.post("/appointments/addAppointment", {
                property_id: props.propertyId,
                user_id: props.userId,
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
        props.userAppointment();
    }

    const handleFailClose = () => {
        setTime("");
        setDate("");
        setAppointmentConfirmation(false);
        setOpenBookingDialog(true);
    }

    return (
        <div className={"book-appointment"}>
            <Button className={"book-appointment-button"} variant="contained" sx={{ mt: 3, mb: 2, mr: 2 }} onClick={handleBook}>
                Book Appointment
            </Button>
            <Dialog open={openBookingDialog} fullWidth={true}>
                <DialogTitle className={"book-dialog-title"} style={{textAlign: "center"}}>Appointment Date and Time</DialogTitle>
                <table className={"date-time-table"} style={{textAlign: "center", margin: "40px"}}>
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
                <div className={"book-appointment-button"} style={{textAlign: "center"}}>
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
                <p className={"confirmation-message"} style={{textAlign: "center", marginTop: "20px"}}>Appointment Confirmed!!!</p>
                <div className={"appointment-dialog-close"} style={{textAlign: "center", margin: "20px"}}>
                    <Button
                        className={"appointment-dialog-close-button"}
                        variant={"contained"} style={{width: "200px"}}
                        onClick={handleSuccessClose}>
                            Close
                    </Button>
                </div>
            </Dialog>
            <Dialog open={failedBooking} fullWidth={true}>
                <p className={"fail-message"} style={{textAlign: "center", marginTop: "20px"}}>Appointment Booking Failed!!!</p>
                <div className={"appointment-fail-close"} style={{textAlign: "center", margin: "20px"}}>
                    <Button
                        className={"appointment-fail-close-button"}
                        variant={"contained"} style={{width: "200px"}}
                        onClick={handleFailClose}>
                            Close
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default BookAppointment;