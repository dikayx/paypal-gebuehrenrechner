import React, { useState, useEffect } from "react";
import {
    Grid,
    TextField,
    Typography,
    Button,
    Card,
    MenuItem,
    ToggleButton,
    ToggleButtonGroup,
    Box,
} from "@mui/material";
import { useDrag } from "@use-gesture/react";

function PayPalFeeCalculator() {
    const [calculationMode, setCalculationMode] = useState("fees"); // "fees" or "endSum"
    const [amount, setAmount] = useState(0.0);
    const [paymentType, setPaymentType] = useState(1);
    const [calculatedFee, setCalculatedFee] = useState("");
    const [finalAmount, setFinalAmount] = useState("");
    const [sliderPosition, setSliderPosition] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [error, setError] = useState("");

    const feeRates = {
        1: { rate: 0.0249, fixed: 0.35 }, // Waren oder Dienstleistungen bezahlen
        2: { rate: 0, fixed: 0 }, // Zahlung an Freunde und Familie (Kostenfrei für Inlandsüberweisungen)
        3: { rate: 0.015, fixed: 0.35 }, // Spenden sammeln
        4: { rate: 0.1, fixed: 0.1 }, // Mikrozahlung (Inländisch unter 5 €)
        5: { rate: 0.0249, fixed: 0.35 }, // Händlerkonditionen < 2.000 €
        6: { rate: 0.0219, fixed: 0.35 }, // Händlerkonditionen 2.000 - 5.000 €
        7: { rate: 0.0199, fixed: 0.35 }, // Händlerkonditionen 5.000 - 25.000 €
        8: { rate: 0.0149, fixed: 0.35 }, // Händlerkonditionen > 25.000 €
        9: { rate: 0.012, fixed: 0.35 }, // Zahlung mit QR-Code
    };

    useEffect(() => {
        // Sync position with state changes for clicks
        setSliderPosition(calculationMode === "fees" ? 0 : 50);
    }, [calculationMode]);

    const handleModeChange = (event, newMode) => {
        if (newMode !== null) {
            setCalculationMode(newMode);
        }
    };

    const calculateFees = () => {
        const { rate, fixed } = feeRates[paymentType] || {
            rate: 0.029,
            fixed: 0.35,
        };
        const fee = amount * rate + fixed;
        setCalculatedFee(fee.toFixed(2));
        setFinalAmount((amount - fee).toFixed(2));
    };

    const calculateEndSum = () => {
        const { rate, fixed } = feeRates[paymentType] || {
            rate: 0.029,
            fixed: 0.35,
        };
        const total = (parseFloat(amount) + fixed) / (1 - rate);
        setCalculatedFee((total - amount).toFixed(2));
        setFinalAmount(total.toFixed(2));
    };

    useEffect(() => {
        if (amount > 0) {
            if (calculationMode === "fees") {
                calculateFees();
            } else {
                calculateEndSum();
            }
        }
    }, [calculationMode, paymentType]);

    const handleCalculation = () => {
        if (!amount || parseFloat(amount) <= 0) {
            setError("Bitte geben Sie einen gültigen Betrag größer als 0 ein.");
            setCalculatedFee("");
            setFinalAmount("");
            return;
        }
        setError(""); // Clear any previous error

        if (calculationMode === "fees") {
            calculateFees();
        } else {
            calculateEndSum();
        }
    };

    // Gesture for sliding
    const bind = useDrag(({ down, movement: [mx], direction: [dx], event }) => {
        event.preventDefault();
        if (down) {
            setDragging(true);
            // Clamp slider movement between 0% and 50%
            const newPos = Math.max(0, Math.min(50, mx / 2));
            setSliderPosition(newPos);
        } else {
            setDragging(false);
            // Snap to the nearest option when dragging stops
            if (sliderPosition > 25) {
                setCalculationMode("endSum");
                setSliderPosition(50);
            } else {
                setCalculationMode("fees");
                setSliderPosition(0);
            }
        }
    });

    return (
        <div>
            <Typography
                variant='h4'
                gutterBottom
                sx={{ textAlign: "center", mb: 4 }}
            >
                PayPal Gebühren berechnen
            </Typography>
            <Grid container spacing={4} sx={{ mt: 4, px: 2 }}>
                {/* Left Column: Form */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Typography variant='h5' gutterBottom>
                            Berechnungsmodus
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                mt: 2,
                                mb: 2,
                                width: "100%",
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    maxWidth: "500px",
                                    height: "48px",
                                    borderRadius: "25px",
                                    backgroundColor: "#e0e0e0",
                                    overflow: "hidden",
                                    userSelect: "none",
                                    touchAction: "none",
                                }}
                                {...bind()}
                            >
                                {/* Sliding Background */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        bottom: 0,
                                        left:
                                            calculationMode === "fees"
                                                ? "0%"
                                                : "50%",
                                        width: "50%",
                                        backgroundColor: "#1976d2",
                                        borderRadius: "inherit",
                                        transition: "left 0.3s ease",
                                    }}
                                />
                                {/* Toggle Buttons */}
                                <ToggleButtonGroup
                                    value={calculationMode}
                                    exclusive
                                    onChange={handleModeChange}
                                    sx={{
                                        position: "relative",
                                        zIndex: 1,
                                        width: "100%",
                                        height: "100%",
                                        "& .MuiToggleButtonGroup-grouped": {
                                            border: "none",
                                            color: "#000",
                                            backgroundColor: "transparent",
                                            fontSize: "0.875rem",
                                            transition: "none",
                                            "&.Mui-selected": {
                                                color: "#fff",
                                                backgroundColor: "transparent",
                                            },
                                            "&:hover": {
                                                backgroundColor:
                                                    "transparent !important",
                                            },
                                            "&.Mui-focusVisible": {
                                                outline: "none",
                                            },
                                        },
                                    }}
                                >
                                    <ToggleButton
                                        value='fees'
                                        disableRipple
                                        sx={{
                                            flex: 1,
                                            textTransform: "none",
                                            borderRadius: "inherit",
                                        }}
                                    >
                                        Gebühren berechnen
                                    </ToggleButton>
                                    <ToggleButton
                                        value='endSum'
                                        disableRipple
                                        sx={{
                                            flex: 1,
                                            textTransform: "none",
                                            borderRadius: "inherit",
                                        }}
                                    >
                                        Endsumme berechnen
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                        </Box>

                        <TextField
                            label='Betrag'
                            placeholder='0'
                            fullWidth
                            type='text'
                            value={amount === 0 ? "" : amount}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                const normalizedValue = inputValue.replace(
                                    ",",
                                    "."
                                );
                                if (
                                    normalizedValue === "" ||
                                    /^\d*\.?\d*$/.test(normalizedValue)
                                ) {
                                    setAmount(normalizedValue);
                                }
                            }}
                            onBlur={() => {
                                setAmount((prev) => {
                                    if (prev === "" || isNaN(parseFloat(prev)))
                                        return 0;

                                    const numericValue = parseFloat(prev);
                                    return Number.isInteger(numericValue)
                                        ? numericValue.toString()
                                        : numericValue.toFixed(2);
                                });
                            }}
                            InputProps={{
                                endAdornment: <Typography>€</Typography>,
                            }}
                            sx={{ mb: 3, mt: 3 }}
                            error={!!error}
                            helperText={error}
                        />

                        <TextField
                            select
                            label='Art der Zahlung'
                            fullWidth
                            value={paymentType}
                            onChange={(e) => setPaymentType(e.target.value)}
                            sx={{ mb: 3 }}
                        >
                            <MenuItem value={1}>
                                Waren oder Dienstleistungen bezahlen
                            </MenuItem>
                            <MenuItem value={2}>
                                Zahlung an Freunde und Familie
                            </MenuItem>
                            <MenuItem value={3}>Spenden sammeln</MenuItem>
                            <MenuItem value={4}>Mikrozahlung</MenuItem>
                            <MenuItem value={5}>
                                Händlerkonditionen &lt; 2.000 €
                            </MenuItem>
                            <MenuItem value={6}>
                                Händlerkonditionen 2.000 - 5.000 €
                            </MenuItem>
                            <MenuItem value={7}>
                                Händlerkonditionen 5.000 - 25.000 €
                            </MenuItem>
                            <MenuItem value={8}>
                                Händlerkonditionen &gt; 25.000 €
                            </MenuItem>
                            <MenuItem value={9}>Zahlung mit QR-Code</MenuItem>
                        </TextField>

                        <Button
                            variant='contained'
                            color='primary'
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
                        <Typography variant='h5' gutterBottom>
                            Ergebnis
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                            PayPal Gebühren:
                        </Typography>
                        <Typography variant='h6' color='error' gutterBottom>
                            {calculatedFee ? `${calculatedFee} €` : "-"}
                        </Typography>

                        <Typography variant='body1' gutterBottom>
                            Betrag (nach Gebühren):
                        </Typography>
                        <Typography variant='h6' color='success' gutterBottom>
                            {finalAmount ? `${finalAmount} €` : "-"}
                        </Typography>

                        <Typography variant='body2' color='textSecondary'>
                            Gebührensatz:{" "}
                            {(feeRates[paymentType]?.rate * 100).toFixed(2)}% +{" "}
                            {feeRates[paymentType]?.fixed} €
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default PayPalFeeCalculator;
