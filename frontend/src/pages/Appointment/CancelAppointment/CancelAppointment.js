// Author: Arvinder Singh (B00878415)

import React, {useState} from "react";
import {Button, Dialog} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../common/constants";

function CancelAppointment(props) {

    let navigate = useNavigate();

    const [openDialog, setOpenDialog] = useState(true);

    const handleClose = (event) => {
        setOpenDialog(false);
        navigate(ROUTES.APPOINTMENTS);
    }

    return (
        <div>
            {/*<Button variant={"contained"} onClick={handleButton}>Cancel Appointment</Button>*/}
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