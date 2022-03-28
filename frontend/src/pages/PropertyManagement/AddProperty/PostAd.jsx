import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { TextField, Container, CssBaseline, autocompleteClasses, TextareaAutosize, Grid, Typography, Button } from '@mui/material';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,

} from 'react-places-autocomplete';
import { makeStyles } from "@mui/styles";
import FileBase from 'react-file-base64';
import { styled } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PropertySchema } from '../../../common/validationSchema';

const Input = styled('input')({
    display: 'none',
});

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100%",
        backgroundColor: "#fff",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        padding: "1rem",
        boxShadow: "rgb(100 116 139 / 12%) 0px 10px 15px",
        borderRadius: 8,
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
}));
const PostAd = () => {
    const [address, setAddress] = useState('');
    const classes = useStyles();
    const {
        register,
        formState: { errors },
        handleSubmit,
        trigger,
    } = useForm({
        resolver: yupResolver(PropertySchema),
    });


    const handleChange = (address) => {
        setAddress(address);
    };

    const handleSelect = (address) => {
        setAddress(address);
        geocodeByAddress(address)
            .then(results => console.log(results[0]["address_components"][3]["long_name"]))
            //.then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };
    return (
        <div><Box
            sx={{
                marginTop: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} textAlign="center">
                    <Typography component="h1" variant="h5" >
                        Post Ad
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={3} sx={{ marginTop: "12px" }}>
                    <Typography component="h1" variant="subtitle1">
                        Price:
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TextField
                        {...register("price")}
                        fullWidth
                        variant="outlined"
                        //value={newPost.price}
                        name="price"
                        //onChange={handleOnChange}
                        label="$"
                        id="price"
                        error={!!errors.price}
                        helperText={errors.price ? errors.price.message : ""}

                        onKeyUp={() => {
                            trigger("price");
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3} sx={{ marginTop: "12px" }}>
                    <Typography component="h1" variant="subtitle1">
                        Location:
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <PlacesAutocomplete
                        value={address}
                        onChange={handleChange}
                        onSelect={handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <TextField
                                    {...getInputProps({
                                        //placeholder: 'Search Places ...',
                                        className: 'location-search-input',
                                    })}
                                    fullWidth
                                    variant="outlined"
                                    value={address}
                                    name="location"
                                    //onChange={handleOnChange}
                                    label="Location"
                                    id="location"
                                />
                                {/* <input
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input',
                                    })}
                                /> */}
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                </Grid>
                <Grid item xs={12} sm={3} sx={{ marginTop: "12px" }}>
                    <Typography component="h1" variant="subtitle1">
                        Select Image:
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={9} sx={{ marginTop: 1 }}>
                    {/* <label htmlFor="contained-button-file">
                        {/* <FileBase type="file" multiple={false} onDone={({ base64 }) => { }} /> 
                    <Input accept="image/*" id="contained-button-file" multiple type="file" />
                    <Button variant="contained" component="span">
                        Upload
                    </Button>
                </label> */}
                    <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => { }} /></div>
                    {/* setPostData({...postData, selectedFile: base64 }) */}
                </Grid>
                <Grid item xs={12} sm={3} sx={{ marginTop: "12px" }}>
                    <Typography component="h1" variant="subtitle1">
                        Email:
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TextField
                        {...register("email")}
                        variant="outlined"
                        fullWidth
                        //value={newPost.price}
                        name="email"
                        //onChange={handleOnChange}
                        label="Email"
                        id="email"
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}

                        onKeyUp={() => {
                            trigger("email");
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3} sx={{ marginTop: "12px" }}>
                    <Typography component="h1" variant="subtitle1">
                        Phone:
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TextField
                        {...register("phone_no")}
                        variant="outlined"
                        fullWidth
                        //value={newPost.price}
                        name="phone_no"
                        //onChange={handleOnChange}
                        label="Number"
                        id="phone_no"
                        error={!!errors.phone_no}
                        helperText={errors.phone_no ? errors.phone_no.message : ""}

                        onKeyUp={() => {
                            trigger("phone_no");
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
        </div >
    )
}

export default PostAd