import { useState, form, Fragment, useEffect } from "react";
import { AppBar, Button, IconButton, Toolbar, Typography, Tabs, Tab, CardContent, Grid } from "@material-ui/core";
import Card from '@mui/material/Card';
import { CardActions, CardMedia, TextField, ImageListItem, ImageList, Alert } from "@mui/material";

import sampleImage from "../../assets/images/Sample.jpg"

export default function CardDisplay ()  {
    //Sample Json Data
const roomDetails = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rhoncus lorem nec dapibus egestas. Morbi faucibus ut odio vel gravida. Mauris vel eleifend ipsum"
    return (
        <Fragment>
        <Card sx={{ minWidth: '20%' }}>
            <CardMedia
                component="img"
                height="140"
                width="100%"
                src={sampleImage}
                
            />
            <CardContent>

                <Typography variant="h6" component="div">
                    Room available in Halifax
                </Typography>

                <Typography variant="subtitle2" component="div">
                    Posted By: user | Halifax , NS
                </Typography>
                <Typography variant="subtitle2" component="div">
                    Available: Immediate
                </Typography>
                <Typography variant="body2">
                    {roomDetails}
                    <br />
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">See More</Button>
            </CardActions>
        </Card>
        </Fragment>
    );
}
