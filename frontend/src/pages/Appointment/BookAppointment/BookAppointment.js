import React, {useState} from "react";
import {Button, Dialog, DialogTitle, TextField} from "@mui/material";

function BookAppointment(props) {
    const [openBookingDialog, setOpenBookingDialog] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [appointmentConfirmation, setAppointmentConfirmation] = useState(false);

    const handleClickAppointment = (event) => {
        setOpenBookingDialog(true);
    }

    const handleDate = (event) => {
        setDate(event.target.value);
    }

    const handleTime = (event) => {
        setTime(event.target.value);
    }

    const handleAppointmentButton = (event) => {
        setOpenBookingDialog(false);
        setAppointmentConfirmation(true);
    }

    const handleClose = (event) => {
        setAppointmentConfirmation(false);
    }

    return (
        <div>
            <Button variant={"contained"} onClick={handleClickAppointment}>
                Book Appointment
            </Button>
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
                    <Button variant={"contained"} style={{width: "200px"}} onClick={handleClose}>Close</Button>
                </div>
            </Dialog>
        </div>
    )
}

export default BookAppointment;