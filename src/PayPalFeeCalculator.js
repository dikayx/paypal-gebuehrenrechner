import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, FormControl, FormControlLabel, RadioGroup, Radio, Button, Card, MenuItem, Select } from '@mui/material';

function PayPalFeeCalculator() {
    const [calculationMode, setCalculationMode] = useState('fees'); // "fees" or "endSum"
    const [amount, setAmount] = useState(0.0);
    const [paymentType, setPaymentType] = useState(1);
    const [calculatedFee, setCalculatedFee] = useState('');
    const [finalAmount, setFinalAmount] = useState('');

    const feeRates = {
        1: { rate: 0.0249, fixed: 0.35 }, // Example rates for "Waren oder Dienstleistungen"
        // Add more rates for other payment types here
    };

    const calculateFees = () => {
        const { rate, fixed } = feeRates[paymentType] || { rate: 0.029, fixed: 0.35 };
        const fee = amount * rate + fixed;
        setCalculatedFee(fee.toFixed(2));
        setFinalAmount((amount - fee).toFixed(2));
    };

    const calculateEndSum = () => {
        const { rate, fixed } = feeRates[paymentType] || { rate: 0.029, fixed: 0.35 };
        const total = (parseFloat(amount) + fixed) / (1 - rate);
        setCalculatedFee((total - amount).toFixed(2));
        setFinalAmount(total.toFixed(2));
    };

    // Trigger recalculation when the mode changes
    useEffect(() => {
        if (amount > 0) {
            if (calculationMode === 'fees') {
                calculateFees();
            } else {
                calculateEndSum();
            }
        }
    }, [calculationMode]);

    const handleCalculation = () => {
        if (calculationMode === 'fees') {
            calculateFees();
        } else {
            calculateEndSum();
        }
    };

    return (
        <Grid container spacing={4} sx={{ mt: 4, px: 2 }}>
            {/* Left Column: Form */}
            <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Berechnungsmodus
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup
                            row
                            value={calculationMode}
                            onChange={(e) => setCalculationMode(e.target.value)}
                        >
                            <FormControlLabel value="fees" control={<Radio />} label="Gebühren berechnen" />
                            <FormControlLabel value="endSum" control={<Radio />} label="Endsumme berechnen" />
                        </RadioGroup>
                    </FormControl>

                    <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
                        Betrag
                    </Typography>
                    <TextField
                        fullWidth
                        type="number"
                        inputProps={{ min: 0, step: 'any' }}
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        InputProps={{
                            endAdornment: <Typography>€</Typography>,
                        }}
                        sx={{ mb: 3 }}
                    />

                    <Typography variant="h5" gutterBottom>
                        Art der Zahlung
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            value={paymentType}
                            onChange={(e) => setPaymentType(e.target.value)}
                        >
                            <MenuItem value={1}>Waren oder Dienstleistungen bezahlen</MenuItem>
                            <MenuItem value={2}>Zahlung an Freunde und Familie</MenuItem>
                            <MenuItem value={3}>Spenden sammeln</MenuItem>
                            {/* Add more options as needed */}
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                        onClick={handleCalculation}
                    >
                        Berechnen
                    </Button>
                </Card>
            </Grid>

            {/* Right Column: Results */}
            <Grid item xs={12} md={4}>
                <Card sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Ergebnis
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        PayPal Gebühren:
                    </Typography>
                    <Typography variant="h6" color="error" gutterBottom>
                        {calculatedFee ? `${calculatedFee} €` : '-'}
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                        Betrag (nach Gebühren):
                    </Typography>
                    <Typography variant="h6" color="success" gutterBottom>
                        {finalAmount ? `${finalAmount} €` : '-'}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                        Gebührensatz: {feeRates[paymentType]?.rate * 100}% + {feeRates[paymentType]?.fixed} €
                    </Typography>
                </Card>
            </Grid>
        </Grid>
    );
}

export default PayPalFeeCalculator;
