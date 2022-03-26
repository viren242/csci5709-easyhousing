import React, { useEffect, useState } from 'react'
import NavigationBar from "../../NavigationBar/Navbar";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Container, CssBaseline, autocompleteClasses, TextareaAutosize } from '@mui/material';
import { FormControl, FormLabel, RadioGroup, Radio, FormGroup, FormControlLabel, Autocomplete, TextField, Grid, Checkbox, Typography, Select, MenuItem } from '@mui/material';
import propertyImage from "../../../assets/images/property.jpg";
import { makeStyles } from "@mui/styles";
import AdDetails from './AdDetails';
import PropertyDetails from './PropertyDetails';
import PostAd from './PostAd';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PropertySchema } from '../../../common/validationSchema';
import FileBase from 'react-file-base64';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,

} from 'react-places-autocomplete';
import { ROUTES } from '../../../common/constants';
import axios_api from '../../../common/axios';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";



const initialState = {
    title: '',
    description: '',
    unit_type: '',
    bedrooms: '',
    bathrooms: '',
    appliances: '',
    sq_feet: '',
    furnished: '',
    price: '',
    location: '',
    city: '',
    image: 'https://easy-housing-website.s3.amazonaws.com/Main_Image.webp',
    email: '',
    phone_no: '',
    user_id: '1213'
};
const steps = ['Ad Details', 'Property Details', 'Post Ad'];
//let navigate = useNavigate();
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

const AddProperty = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [address, setAddress] = useState('');
    const [newPost, setNewPost] = useState(initialState);
    let navigate = useNavigate();
    const { propertyId } = useParams();

    useEffect(() => {
        if (propertyId) {
            // toast.info("You are already Authenticated");
            axios_api.get(`/properties/getProperty/${propertyId}`)
                .then((response) => {
                    if ((response.data.success = true)) {
                        setNewPost(response.data.data);
                        //trigger("title");
                        //trigger("description");
                        //trigger("bedrooms");
                        //trigger("bathrooms");
                        //toast.success(response?.data?.message);
                        //reset();
                        //navigate(ROUTES.PROFILE);
                    } else {
                        console.log("Error")
                        //toast.error(response?.data?.message);
                    }
                })
                .catch((err) => {
                    debugger;
                    console.log(err?.response?.data?.message);
                    //toast.error(err?.response?.data?.message || "Something went wrong");
                });
        }
    }, []);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        trigger,
    } = useForm({
        resolver: yupResolver(PropertySchema),
    });

    const classes = useStyles();

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = async () => {
        let isValid = false;
        switch (activeStep) {
            case 0:
                isValid = await trigger(["title", "description"]);
                break;
            case 1:
                isValid = await trigger(["unit_type", "bedrooms", "bathrooms", "sq_feet", "furnished"]);
                break;
            case 2:
                isValid = await trigger(["price", "email", "phone_no"]);
                break;
        }

        if (isValid) {
            if (activeStep === 2) {
                //console.log("h");
                onSubmit();
            }
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        //console.log(e.target.name);
        //console.log(e.target.checked);
        //trigger(name);
        //console.log(name);

        const post = { ...newPost, [name]: value };
        setNewPost(post);
        //console.log(post);
    }

    const handleOnCheck = (e) => {
        //const { name, value } = e.target;
        //console.log(e.target.name);
        if (e.target.checked) {
            console.log(e.target.name);
            //cbox.concat(e.target.name)
        } else {
            //cbox.delete(e.target.name)
        }
        //console.log(e.target.checked);
        //trigger(name);
        //console.log(name);
        //console.log(cbox)
        //const post = { ...newPost, appliances: cbox };
        //setNewPost(post);
        //console.log(post);
    }
    const handleChange = (address) => {
        //console.log("ad")
        //console.log(address);

        setAddress(address);
    };

    const handleSelect = (address) => {
        const post1 = { ...newPost, location: address };
        setNewPost(post1);
        //console.log(post1);
        //console.log(address)
        setAddress(address);
        geocodeByAddress(address)
            .then(results => {
                const post2 = { ...post1, city: results[0]["address_components"][3]["long_name"] };
                setNewPost(post2);
                //console.log(post2);
            })
            .catch(error => console.error('Error', error));


    };

    const onSubmit = (data) => {

        if (propertyId) {
            axios_api
                .put(`/properties/updateProperty/${propertyId}`, newPost)
                .then((response) => {
                    if ((response.data.success = true)) {
                        toast.success(response?.data?.message);
                        reset();
                        console.log(response?.data?.message);
                        navigate(ROUTES.HOMEPAGE);
                    } else {
                        console.log(response?.data?.message);
                        toast.error(response?.data?.message);
                    }
                })
                .catch((err) => {
                    debugger;
                    console.log(err?.response?.data?.message);
                    toast.error(err?.response?.data?.message || "Something went wrong");
                });
        } else {
            axios_api
                .post("/properties/createProperty", newPost)
                .then((response) => {
                    if ((response.data.success = true)) {
                        toast.success(response?.data?.message);
                        reset();
                        console.log(response?.data?.message);
                        navigate(ROUTES.HOMEPAGE);
                    } else {
                        console.log(response?.data?.message);
                        toast.error(response?.data?.message);
                    }
                })
                .catch((err) => {
                    debugger;
                    console.log(err?.response?.data?.message);
                    toast.error(err?.response?.data?.message || "Something went wrong");
                });
        }

    };
    //console.log(newPost);

    const bedrooms = [
        'Bachelor/Studio',
        '1',
        '1 + Den',
        '2',
        '2 + Den',
        '3',
        '3 + Den',
        '4',
        '4 + Den',
        '5+',
    ];
    const bathrooms = [
        '1',
        '1.5',
        '2',
        '2.5',
        '3',
        '3.5',
        '4',
        '4.5',
        '5+',
    ];

    return (
        <>
            <NavigationBar />

            <Grid container>
                <img src={propertyImage} width="100%" height="410px" />
                <Box component="form" sx={{ width: '100%', mt: 5 }} >
                    <Stepper sx={{ maxWidth: '80%', marginLeft: 'auto', marginRight: 'auto' }} activeStep={activeStep} >
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === 0 ? (
                        <React.Fragment>
                            <Container component="main" maxWidth="sm" sx={{ mt: 5 }}>
                                <CssBaseline />
                                <div className={classes.paper} >
                                    <Box
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
                                                    Ad Details
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    {...register("title")}
                                                    variant="outlined"
                                                    fullWidth
                                                    name="title"
                                                    //defaultValue="Best hosue in halifax"
                                                    label="Title"
                                                    id="title"
                                                    value={newPost.title}
                                                    error={!!errors.title}
                                                    helperText={errors.title ? errors.title.message : ""}

                                                    // onKeyUp={() => {
                                                    //     trigger("title");
                                                    // }}
                                                    onChange={handleOnChange}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    {...register("description")}
                                                    variant="outlined"
                                                    fullWidth
                                                    name="description"
                                                    label="Description"
                                                    value={newPost.description}
                                                    //defaultValue="Best hosue in halifax"
                                                    id="description"
                                                    multiline
                                                    rows={3}
                                                    error={!!errors.description}
                                                    helperText={errors.description ? errors.description.message : ""}

                                                    // onKeyUp={() => {
                                                    //     trigger("description");
                                                    // }}
                                                    onChange={handleOnChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    {/* <AdDetails /> */}
                                </div>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleNext}>
                                        {/* onClick={handleNext} */}
                                        {activeStep === steps.length - 1 ? 'Post Ad' : 'Next'}
                                    </Button>
                                </Box>
                            </Container>

                        </React.Fragment>
                    ) : (
                        activeStep === 1 ? (
                            <React.Fragment>

                                <Container component="main" maxWidth="sm" sx={{ mt: 5 }}>
                                    <CssBaseline />
                                    <div className={classes.paper} >
                                        <Box
                                            sx={{
                                                marginTop: 0,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                //alignItems: 'center',
                                            }}
                                        >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} textAlign="center">
                                                    <Typography component="h1" variant="h5" >
                                                        Property Details
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl>
                                                        <FormLabel id="unit_type" name="unittype" error={!!errors.unit_type}>Unit Type</FormLabel>
                                                        <RadioGroup
                                                            aria-labelledby="unitType"
                                                            //defaultValue="apartment"
                                                            name="unit_type"
                                                            onChange={handleOnChange}
                                                            value={newPost.unit_type}
                                                        >
                                                            <FormControlLabel {...register("unit_type")} value="Apartment" control={<Radio />} label="Apartment" />
                                                            <FormControlLabel {...register("unit_type")} value="Condo" control={<Radio />} label="Condo" />
                                                            <FormControlLabel {...register("unit_type")} value="Basement" control={<Radio />} label="Basement" />

                                                        </RadioGroup>


                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6} position="relative">
                                                    <Autocomplete
                                                        disablePortal
                                                        onChange={(event, value) => {
                                                            //console.log(value);
                                                            setNewPost({ ...newPost, bedrooms: value });
                                                        }}
                                                        //value="1"
                                                        id="bedrooms"
                                                        name="bedrooms"
                                                        value={newPost.bedrooms}
                                                        options={bedrooms}
                                                        //onChange={handleOnChange}
                                                        // sx={{ width: 300 }}
                                                        renderInput={(params) => <TextField {...params} {...register("bedrooms")} error={!!errors.bedrooms} label="Bedrooms" />}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} position="relative">
                                                    <Autocomplete
                                                        disablePortal
                                                        onChange={(event, value) => {
                                                            //console.log(value);
                                                            setNewPost({ ...newPost, bathrooms: value });
                                                        }}
                                                        id="bathrooms"
                                                        name="bathrooms"
                                                        value={newPost.bathrooms}
                                                        options={bathrooms}
                                                        // sx={{ width: 300 }}
                                                        renderInput={(params) => <TextField {...params} {...register("bathrooms")} error={!!errors.bathrooms} label="Bathrooms" />}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        name="appliances"
                                                        label="Appliances"
                                                        value={newPost.appliances}
                                                        id="appliances"
                                                        // onKeyUp={() => {
                                                        //     trigger("title");
                                                        // }}
                                                        onChange={handleOnChange}
                                                    />
                                                </Grid>
                                                {/* <Grid item xs={12}>
                                                    <FormGroup>
                                                        <FormLabel id="appliances">Appliances</FormLabel>
                                                        <FormControlLabel control={<Checkbox />} onChange={handleOnCheck} name="Laundry(In Unit) " label="Laundry(In Unit)" />
                                                        <FormControlLabel control={<Checkbox />} onChange={handleOnCheck} label="Laundry(In Building)" name="Laundry(In Building)" />
                                                        <FormControlLabel control={<Checkbox />} onChange={handleOnCheck} name="Dishwasher" label="Dishwasher" />
                                                        <FormControlLabel control={<Checkbox />} onChange={handleOnCheck} name="Fridge" label="Fridge" />
                                                    </FormGroup>
                                                </Grid> */}
                                                <Grid item xs={12} sm={2} sx={{ marginTop: "12px" }}>
                                                    <Typography component="h1" variant="subtitle1">
                                                        Size:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={10}>
                                                    <TextField
                                                        {...register("sq_feet")}
                                                        variant="outlined"
                                                        fullWidth
                                                        value={newPost.sq_feet}
                                                        name="sq_feet"
                                                        //onChange={handleOnChange}
                                                        label="sq_feet"
                                                        id="sq_feet"
                                                        error={!!errors.sq_feet}
                                                        helperText={errors.sq_feet ? errors.sq_feet.message : ""}
                                                        onChange={handleOnChange}
                                                    // onKeyUp={() => {
                                                    //     trigger("sq_feet");
                                                    // }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl>
                                                        <FormLabel id="furnished" error={!!errors.furnished}>Furnished</FormLabel>
                                                        <RadioGroup
                                                            aria-labelledby="furnished"
                                                            defaultValue="Yes"
                                                            name="furnished"
                                                            onChange={handleOnChange}
                                                            value={newPost.furnished}
                                                        >
                                                            <FormControlLabel {...register("furnished")} value="true" control={<Radio />} label="Yes" />
                                                            <FormControlLabel {...register("furnished")} value="false" control={<Radio />} label="No" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>

                                            </Grid>
                                        </Box>
                                        {/* <PropertyDetails /> */}
                                    </div>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleNext}>
                                            {activeStep === steps.length - 1 ? 'Post Ad' : 'Next'}
                                        </Button>
                                    </Box>
                                </Container>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Container component="main" maxWidth="sm" sx={{ mt: 5 }}>
                                    <CssBaseline />
                                    <div className={classes.paper} >
                                        <Box
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
                                                        value={newPost.price}
                                                        name="price"
                                                        onChange={handleOnChange}
                                                        label="$"
                                                        id="price"
                                                        error={!!errors.price}
                                                        helperText={errors.price ? errors.price.message : ""}

                                                    // onKeyUp={() => {
                                                    //     trigger("price");
                                                    // }}
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
                                                    <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => { setNewPost({ ...newPost, image: base64 }) }} /></div>
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
                                                        value={newPost.email}
                                                        name="email"
                                                        onChange={handleOnChange}
                                                        label="Email"
                                                        id="email"
                                                        error={!!errors.email}
                                                        helperText={errors.email ? errors.email.message : ""}

                                                    // onKeyUp={() => {
                                                    //     trigger("email");
                                                    // }}
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
                                                        value={newPost.phone_no}
                                                        name="phone_no"
                                                        onChange={handleOnChange}
                                                        label="Number"
                                                        id="phone_no"
                                                        error={!!errors.phone_no}
                                                        helperText={errors.phone_no ? errors.phone_no.message : ""}

                                                    // onKeyUp={() => {
                                                    //     trigger("phone_no");
                                                    // }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        {/* <PostAd /> */}
                                    </div>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleNext}>
                                            {activeStep === steps.length - 1 ? 'Post Ad' : 'Next'}
                                        </Button>
                                    </Box>
                                </Container>
                            </React.Fragment>
                        ))}
                </Box>
            </Grid>
        </>
    )
}

export default AddProperty