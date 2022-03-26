import { useState, form, Fragment, useEffect } from "react";
import { AppBar, Button, IconButton, Toolbar, Typography, Tabs, Tab, CardContent, Grid } from "@material-ui/core";
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PostRoomatesAd from "./PostRoomatesAd";
import ListRoomates from "./ListRoomates";


export default function RoomateHomePage() {

    const [value, setValue] = useState("list");
    const onHandleChange = (event, newValue) => {
        //console.log(newValue);
        setValue(newValue);
        console.log("value", value);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Box display='flex' flexGrow={1} alignItems='center'>
                        {/* whatever is on the left side */}

                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 8 }}
                        // disabled
                        >
                            <MenuIcon />

                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, justifyContent: 'center', backgroundColor: 'yellow' }}>
                            Easy Housing
                        </Typography>

                    </Box>
                    <Box display='flex' flex={0.2} alignItems='center' justifyContent='flex-end' >
                        <AccountCircleIcon fontSize="large" />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, justifyContent: 'center', backgroundColor: 'yellow' }}>
                            user
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <div>
                <Tabs
                    onChange={onHandleChange}
                    value={value}
                    centered
                    textColor="black"
                    indicatorColor="primary"
                    aria-label="basic tabs example"
                // variant="fullWidth"
                >
                    <Tab value="list" label="Show Roomate listings" />
                    <Tab value="post" label="Post Roomate Listing" />

                </Tabs>
            </div>
            {value == "list" ? (
                <ListRoomates />
            ) : <PostRoomatesAd />}

        </div>
    );
}