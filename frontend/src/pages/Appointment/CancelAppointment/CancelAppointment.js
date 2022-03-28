import React, {useState} from "react";
import {Button, Dialog} from "@mui/material";

function CancelAppointment(props) {
    const [openDialog, setOpenDialog] = useState(false);

    const handleButton = (event) => {
        setOpenDialog(true);
    }

    const handleClose = (event) => {
        setOpenDialog(false);
    }

    return (
        <div>
            <Button variant={"contained"} onClick={handleButton}>Cancel Appointment</Button>
            <Dialog open={openDialog} fullWidth={true}>
                <p style={{textAlign: "center", margin: "20px"}}>Appointment Cancelled!!!</p>
                <div style={{textAlign: "center"}}>
                    <Button variant={"contained"} style={{marginBottom: "20px", width: "200px"}} onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default CancelAppointment;