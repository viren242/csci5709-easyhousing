import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField, Container, CssBaseline, autocompleteClasses, TextareaAutosize, Grid } from '@mui/material';
import { PropertySchema } from '../../../common/validationSchema';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const AdDetails = () => {

    const {
        register,
        formState: { errors },
        handleSubmit,
        trigger,
    } = useForm({
        resolver: yupResolver(PropertySchema),
    });

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
                        Ad Details
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        {...register("title")}
                        variant="outlined"
                        fullWidth
                        name="title"
                        label="Title"
                        id="title"
                        error={!!errors.title}
                        helperText={errors.title ? errors.title.message : ""}

                        onKeyUp={() => {
                            trigger("title");
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        {...register("description")}
                        variant="outlined"
                        fullWidth
                        name="description"
                        label="Description"
                        id="description"
                        multiline
                        rows={3}
                        error={!!errors.description}
                        helperText={errors.description ? errors.description.message : ""}

                        onKeyUp={() => {
                            trigger("description");
                        }}
                    />
                </Grid>
            </Grid>
        </Box></div>
    )
}

export default AdDetails