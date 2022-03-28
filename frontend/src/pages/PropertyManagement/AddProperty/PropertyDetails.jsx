import React from 'react'
import Box from '@mui/material/Box';
import { FormControl, FormLabel, RadioGroup, Radio, FormGroup, FormControlLabel, Autocomplete, TextField, Grid, Checkbox, Typography } from '@mui/material';
import { PropertySchema } from '../../../common/validationSchema';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
const PropertyDetails = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        trigger,
    } = useForm({
        resolver: yupResolver(PropertySchema),
    });
    const bedrooms = [
        { label: 'Bachelor/Studio' },
        { label: '1' },
        { label: '1 + Den' },
        { label: '2' },
        { label: '2 + Den' },
        { label: '3' },
        { label: '3 + Den' },
        { label: '4' },
        { label: '4 + Den' },
        { label: '5+' },
    ];
    const bathrooms = [
        { label: '1' },
        { label: '1.5' },
        { label: '2' },
        { label: '2.5' },
        { label: '3' },
        { label: '3.5' },
        { label: '4' },
        { label: '4.5' },
        { label: '5+' },
    ];
    return (
        <div>
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
                            <FormLabel id="unit_type" name="unit_type">Unit Type</FormLabel>
                            <RadioGroup
                                aria-labelledby="unitType"
                                // defaultValue="female"
                                name="unittype"
                            //onChange={handleOnChange}
                            >
                                <FormControlLabel {...register('unit_type', { required: true })} value="apartment" control={<Radio />} label="Apartment" />
                                <FormControlLabel {...register('unit_type', { required: true })} value="condo" control={<Radio />} label="Condo" />
                                <FormControlLabel {...register('unit_type', { required: true })} value="basement" control={<Radio />} label="Basement" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} position="relative">
                        <Autocomplete
                            disablePortal
                            // onChange={(event, value) => {
                            //     //console.log(value);
                            //     setNewPost({ ...newPost, bedrooms: value.label });
                            // }}
                            id="bedrooms"
                            name="bedrooms"
                            options={bedrooms}
                            // sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Bedrooms" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} position="relative">
                        <Autocomplete
                            disablePortal
                            // onChange={(event, value) => {
                            //     //console.log(value);
                            //     setNewPost({ ...newPost, bathrooms: value.label });
                            // }}
                            id="bathrooms"
                            name="bathrooms"
                            //value={newPost.bathrooms}
                            options={bathrooms}
                            // sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Bathrooms" />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <FormLabel id="appliances">Appliances</FormLabel>
                            <FormControlLabel control={<Checkbox />} label="Laundry(In Unit)" />
                            <FormControlLabel control={<Checkbox />} label="Laundry(In Building)" />
                            <FormControlLabel control={<Checkbox />} label="Dishwasher" />
                            <FormControlLabel control={<Checkbox />} label="Fridge" />
                        </FormGroup>
                    </Grid>
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
                            //value={newPost.price}
                            name="sq_feet"
                            //onChange={handleOnChange}
                            label="sq_feet"
                            id="sq_feet"
                            error={!!errors.sq_feet}
                            helperText={errors.sq_feet ? errors.sq_feet.message : ""}

                            onKeyUp={() => {
                                trigger("sq_feet");
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel id="furnished">Furnished</FormLabel>
                            <RadioGroup
                                aria-labelledby="furnished"
                                // defaultValue="female"
                                name="furnished"
                            //onChange={handleOnChange}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                </Grid>
            </Box>
        </div>
    )
}

export default PropertyDetails