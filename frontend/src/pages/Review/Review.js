import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/userContext";
import {useNavigate} from "react-router-dom";
import Navbar from "../NavigationBar/Navbar";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Divider,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import {ROUTES} from "../../common/constants";
import EditIcon from "@mui/icons-material/Edit";
import HouseIcon from "@mui/icons-material/House";
import ReviewsIcon from "@mui/icons-material/Reviews";
import axios_api from "../../common/axios";

function Review() {

    const {
        state: { authenticated, authToken, userId, currentUser}
    } = useContext(AppContext);
    let navigate = useNavigate();

    const [userReviews, setUserReviews] = useState([]);

    const userReview = async () => {
        axios_api.get("/reviews/getUserReviews/" + userId).then((res) => {
            setUserReviews(res.data.reviews);
        })
    }

    useEffect(() => {
        if (!authenticated) {
            navigate(ROUTES.HOMEPAGE);
        }
        userReview();
    }, []);

    const handleClick = (event) => {
        axios_api.post("/reviews/addReview", {
            property_id: event.property,
            user_id: event.user,
            review: review
        }).then((res) => {
            if (res.data.success) {
                userReview();
            }
        });
    }

    const handleEdit = (event) => {
        axios_api.delete('/reviews/deleteReview/' + event.user + '/' + event.property).then((res) => {
            userReview();
        });
    }

    const [review, setReview] = useState("");
    
    const handleText = (event) => {
        setReview(event.target.value);
    }

    return (
        <div>
            <Navbar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                    backgroundColor: "#F9FAFC",
                }}
            >
                <Container maxWidth="lg">
                    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3}}>
                        <Grid item xs={4}>
                            <Card>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: "center",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Avatar
                                            src={currentUser.imgURL}
                                            sx={{
                                                height: 100,
                                                mb: 2,
                                                width: 100,
                                            }}
                                        />
                                        <Typography color="textPrimary" gutterBottom variant="h5">
                                            {currentUser.firstName + " " + currentUser.lastName}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <Divider />

                                <CardActions>
                                    <Button
                                        onClick={() => navigate(ROUTES.EDIT_PROFILE)}
                                        color="primary"
                                        fullWidth
                                        variant="text"
                                        startIcon={<EditIcon />}
                                    >
                                        Edit Profile
                                    </Button>
                                </CardActions>
                            </Card>

                            <Card sx={{ mt: 2 }}>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: "left",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Button
                                            color="primary"
                                            fullWidth
                                            variant="text"
                                            startIcon={<HouseIcon />}
                                        >
                                            My Properties
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>

                            <Card sx={{ mt: 2 }}>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: "left",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Button
                                            color="primary"
                                            fullWidth
                                            variant="text"
                                            startIcon={<ReviewsIcon />}
                                            onClick={() => navigate(ROUTES.REVIEW)}
                                        >
                                            My Reviews
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>

                            <Card sx={{ mt: 2 }}>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: "left",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Button
                                            color="primary"
                                            fullWidth
                                            variant="text"
                                            startIcon={<ReviewsIcon />}
                                            onClick={() => navigate(ROUTES.APPOINTMENTS)}
                                        >
                                            My Appointments
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Button variant={"contained"} onClick={() => navigate(ROUTES.REVIEW)}>Add Reviews</Button>
                            <Button variant={"outlined"} onClick={() => navigate(ROUTES.RATING)}>Add Ratings</Button>
                            <Divider variant={"fullWidth"}/>
                            {userReviews.length < 1 ? (
                                <div style={{textAlign: "center", margin: "20%"}}>
                                    <p style={{color: "gray"}}>No Property is available for Review</p>
                                </div>
                            ) : (
                                <div>
                                    {userReviews.map(value => (
                                        <Card style={{marginTop: "5%"}} variant={"outlined"}>
                                            <Box sx={{alignItems: "left", display: "flex", flexDirection: "column"}}>
                                                <CardContent>
                                                    <table style={{borderCollapse: "collapse", tableLayout: "auto"}}>
                                                        <tbody>
                                                            <tr>
                                                                <td style={{paddingRight: "10px"}}>
                                                                    <img src={value.images} alt={"image"} style={{width: "300px", height: "200px"}}/>
                                                                </td>
                                                                <td>
                                                                    <table style={{borderCollapse: "collapse", tableLayout: "auto"}}>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>
                                                                                    {value.review.length > 0 ? (
                                                                                        <p style={{width: "400px", height: "150px"}}>{value.review}</p>
                                                                                    ) : (
                                                                                        <input type={"text"} style={{width: "400px", height: "150px"}} onChange={handleText}/>
                                                                                    )}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{textAlign: "end", paddingTop: "2%"}}>
                                                                                    {value.review.length > 0 ? (
                                                                                        <Button variant={"contained"} onClick={() => handleEdit({ user: value.user_id, property: value.property_id})}>Edit Review</Button>
                                                                                    ) : (
                                                                                        <Button variant={"contained"} onClick={() => handleClick({ user: value.user_id, property: value.property_id})}>Post Review</Button>
                                                                                    )}
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    )
}

export default Review;