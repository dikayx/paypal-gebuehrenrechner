import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Button,
    Box,
} from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Container
                    maxWidth='lg'
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
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
                    <Box>
                        <Button
                            color='inherit'
                            component={Link}
                            to='/fees-overview'
                            sx={{ textTransform: "none" }}
                        >
                            Gebührenübersicht
                        </Button>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
