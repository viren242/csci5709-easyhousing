import { useState, form, Fragment, useEffect } from "react";
import { AppBar, Button, IconButton, Toolbar, Typography, Tabs, Tab, CardContent, Grid } from "@material-ui/core";
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import Card from '@mui/material/Card';
import { CardActions, CardMedia, TextField, ImageListItem, ImageList, Alert } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';

import sampleImage from "../../assets/images/Sample.jpg"

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CardDisplay from "./CardDisplay";

export default function ListRoomates  () {
    return (
        <div style={{ display: 'flex', flexGrow: 1, marginLeft: '10%', marginRight: '10%', marginTop: '5%', marginBottom: '5%' }}>
            <Grid
                container
                spacing={3}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                display='flex'
                flexGrow='1'
            >
                <Grid item xs={12} sm={4}>
                    <CardDisplay />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CardDisplay />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CardDisplay />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CardDisplay />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CardDisplay />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CardDisplay />
                </Grid>
            </Grid>
        </div>
    );
}
