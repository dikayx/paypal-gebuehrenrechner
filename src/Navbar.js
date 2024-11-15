import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Container maxWidth="lg">
                    <Typography variant="h6">
                        PayPal Fee Calculator
                    </Typography>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
