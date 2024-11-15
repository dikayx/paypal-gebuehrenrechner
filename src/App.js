import React from 'react';
import './App.css';
import PayPalFeeCalculator from "./PayPalFeeCalculator";
import Navbar from "./Navbar";
import { Container } from '@mui/material';

function App() {
    return (
        <>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                {/*TODO: Add a background element with hover effect*/}
                <PayPalFeeCalculator />
            </Container>
        </>
    );
}

export default App;
