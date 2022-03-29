// Author: Purvilkumar Bharthania (B00901605)

import React, { useEffect, useState } from 'react'
import NavigationBar from "../../NavigationBar/Navbar";
import { Container, Box, CssBaseline, TextField, Grid } from '@mui/material';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import axios_api from '../../../common/axios';
import { useNavigate } from 'react-router';

const initialState = {
    filter: 'city',
    value1: '',
    value2: '',
};

const ViewProperty = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState(initialState);
    const [properties, setProperties] = useState(null)

    useEffect(async () => {
        await axios_api.get("/properties/getAllPropeties")
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
    }, [])

    const handleSearchChange = async (e) => {
        const value = e.target.value
        const post = { ...searchText, value1: value };
        //setNewPost(post);
        //let value = e.target.value
        setSearchText(post)
        axios_api.post("/properties/getFilterProperties", post)
            .then((response) => {
                if ((response.data.success = true)) {
                    setProperties(response.data.data);

                } else {
                    //console.log("Error")
                    //toast.error(response?.data?.message);
                }
            })
            .catch((err) => {
                setProperties([])
                //debugger;
                console.log(err?.response?.data?.message);
                //toast.error(err?.response?.data?.message || "Something went wrong");
            });
        // if (debounceVar) clearTimeout(debounceVar)
        // debounceVar = setTimeout(() => {
        //     handleSearch(value)
        // }, 1000);
    }

    const handleClick = (propertyId) => {
        //console.log(`/propertyDetails/${propertyId}`)
        navigate(`/propertyDetails/${propertyId}`);
    };

    const handleSearch = (searchText) => {
        // axios.post("/events", {
        //     category: activeFilter === "All" ? "" : activeFilter,
        //     searchText
        // }).then(response => {
        //     setEvents(response.data.success ? response.data.events : [])
        // }).catch((err) => {
        //     setEvents([])
        //     toast.error(err?.response?.data?.message || "Something went wrong")
        // })
    }

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
                    <TextField
                        name="search"
                        fullWidth
                        id="search"
                        label="Search City ..."
                        autoFocus
                        value={searchText.value1}
                        onChange={handleSearchChange}
                    />

                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {properties ? properties.length > 0 ? properties.map((property) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} >
                                    <Card sx={{ maxWidth: 345 }} onClick={() => handleClick(property.id)}>
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
                                        {/* <CardActions>
                                            <Button size="small">Share</Button>
                                            <Button size="small">Learn More</Button>
                                        </CardActions> */}
                                    </Card>
                                </Grid>
                            )

                            ) : "No results Found" : " Fetching properties"}

                        </Grid>
                    </Box>
                </Box>
            </Container>

        </>
    )
}

export default ViewProperty