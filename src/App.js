import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import PayPalFeeCalculator from "./PayPalFeeCalculator";
import FeesOverview from "./FeesOverview";
import { Container, Box, Typography } from "@mui/material";

function App() {
    return (
        <Router>
            <Navbar />
            <Container maxWidth='lg' sx={{ mt: 4 }}>
                <Box
                    sx={{
                        p: 3,
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: "white",
                    }}
                >
                    {/* Added heading */}
                    <Typography
                        variant='h4'
                        gutterBottom
                        sx={{ textAlign: "center", mb: 4 }}
                    >
                        PayPal Gebühren berechnen
                    </Typography>

                    <Routes>
                        <Route path='/' element={<PayPalFeeCalculator />} />
                        <Route
                            path='/fees-overview'
                            element={<FeesOverview />}
                        />
                    </Routes>
                </Box>
            </Container>
        </Router>
    );
}

export default App;
