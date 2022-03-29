// Author: Purvilkumar Bharthania (B00901605)

import React, { useState, useEffect } from 'react'
import axios_api from '../../../common/axios';
import { useNavigate, useParams } from "react-router-dom";
import { Container, Box, CssBaseline, TextField, Grid } from '@mui/material';
import NavigationBar from "../../NavigationBar/Navbar";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Divider } from '@material-ui/core';
import { toast } from "react-toastify";

const UserProperty = () => {
    const { userId } = useParams();
    const [properties, setProperties] = useState(null)

    const navigate = useNavigate();

    const handleDelete = async (propertyId) => {
        await axios_api.delete(`/properties/deleteProperty/${propertyId}`)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.message);
                    toast.success(response?.data?.message);
                    //setProperties(response.data.data);
                    // window.location.reload(false);
                    getPropertyData();
                }
                //console.log("success");

            }).catch((err) => {
                console.log(err.response.data.error);
                //setProperties([])
                toast.error(err?.response?.data?.message || "Something went wrong")
            })
        //navigate(`/propertyDetails/${propertyId}`);
    };
    const handleUpdate = (propertyId) => {
        // console.log("Hello");
        navigate(`/update_property/${propertyId}`);
    };

    const getPropertyData = () => {
        axios_api.get(`/properties/getMyProperties/${userId}`)
            .then(response => {
                if (response.data.success) {
                    //console.log(response.data.data);
                    setProperties(response.data.data);
                }
                //console.log("success");

            }).catch((err) => {
                setProperties([])
                //toast.error(err?.response?.data?.message || "Something went wrong")
            })
        //handleSearch(searchText)
    }
    useEffect(() => {
        getPropertyData();
    }, [])

    return (
        <>
            <NavigationBar />

            <Container component="main" maxWidth='xl' >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography sx={{ mb: 3 }} variant="h4">
                        My Properties Posted
                    </Typography>
                    <Grid container spacing={2}>

                        {properties ? properties.length > 0 ? properties.map((property) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} >
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={property.image}
                                        alt="property image"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                                            {property.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                                            {property.location}
                                        </Typography>
                                        <br />
                                        <Typography variant="body1" color="text.secondary">
                                            ${property.price}
                                        </Typography>
                                    </CardContent>
                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button
                                            //fullWidth
                                            variant="contained"
                                            onClick={(event) => handleUpdate(property.id)}
                                            sx={{ mt: 3, mb: 2, mr: 2 }}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            //fullWidth
                                            variant="contained"
                                            onClick={() => handleDelete(property.id)}
                                            sx={{ mt: 3, mb: 2, mr: 2 }}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>
                        )
                        ) : "No results Found" : " Fetching properties"}
                    </Grid>
                </Box>
            </Container>


        </>
    )
}

export default UserProperty