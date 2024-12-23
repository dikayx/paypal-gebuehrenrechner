import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerContent = (
        <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
            <List>
                <ListItem button component={Link} to='/gebuehren'>
                    <ListItemText primary='Gebührenübersicht' />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <AppBar position='static'>
            <Toolbar>
                <Container
                    maxWidth='lg'
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {/* Title */}
                    <Typography
                        variant='h6'
                        component={Link}
                        to='/'
                        sx={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        PayPal Gebührenrechner
                    </Typography>

                    {/* Desktop View */}
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                        <Button
                            color='inherit'
                            component={Link}
                            to='/gebuehren'
                            sx={{ textTransform: "none" }}
                        >
                            Gebührenübersicht
                        </Button>
                    </Box>

                    {/* Mobile Hamburger Menu */}
                    <Box sx={{ display: { xs: "block", md: "none" } }}>
                        <IconButton
                            color='inherit'
                            edge='start'
                            onClick={handleDrawerToggle}
                        >
                            <FiMenu size={24} /> {/* Hamburger icon */}
                        </IconButton>
                    </Box>
                </Container>
            </Toolbar>

            {/* Drawer for Mobile View */}
            <Drawer
                anchor='right'
                open={mobileOpen}
                onClose={handleDrawerToggle}
            >
                {drawerContent}
            </Drawer>
        </AppBar>
    );
}

export default Navbar;
