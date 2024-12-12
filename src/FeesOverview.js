import React from "react";
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

function FeesOverview() {
    const rows = [
        { transaction: "Private Zahlungen (Freunde & Familie)", cost: "" },
        { transaction: "Inländische Überweisungen (Euro)", cost: "Kostenfrei" },
        {
            transaction: "Geschäftliche Zahlungen (Waren & Dienstleistungen)",
            cost: "",
        },
        {
            transaction: "Inländische Zahlungen (Euro)",
            cost: "2,49 % + 0,35 €",
        },
        { transaction: "EU-Zahlungen (Euro)", cost: "2,99 % + 0,35 €" },
        {
            transaction: "Internationale Zahlungen außerhalb der EU",
            cost: "Bis zu 5,99 % + 0,35 €",
        },
        { transaction: "Micropayments", cost: "" },
        {
            transaction: "Inländische Transaktionen (unter 5 €)",
            cost: "10 % + 0,10 €",
        },
        {
            transaction: "Internationale Transaktionen (unter 5 €)",
            cost: "6 % + 0,10 €",
        },
        {
            transaction: "Währungsumrechnung",
            cost: "3 % bis 4 % über dem Marktkurs",
        },
        { transaction: "Geschäftskonten (Volumenrabatte)", cost: "" },
        { transaction: "< 2.000 € Umsatz pro Monat", cost: "2,49 % + 0,35 €" },
        {
            transaction: "2.000 € bis 5.000 € Umsatz pro Monat",
            cost: "2,19 % + 0,35 €",
        },
        {
            transaction: "5.000 € bis 25.000 € Umsatz pro Monat",
            cost: "1,99 % + 0,35 €",
        },
        { transaction: "> 25.000 € Umsatz pro Monat", cost: "1,49 % + 0,35 €" },
        { transaction: "Grenzüberschreitende Zahlungen", cost: "" },
        {
            transaction: "Innerhalb der EU (Euro)",
            cost: "0,5 % bis 2 % zusätzlich",
        },
        {
            transaction: "Außerhalb der EU oder in anderer Währung",
            cost: "Abhängig von Währung/Land",
        },
        { transaction: "Gebühren bei Rückbuchungen", cost: "20 €" },
        {
            transaction: "PayPal Ratenzahlung (Zinssatz für den Käufer)",
            cost: "9,99 % effektiver Jahreszins",
        },
    ];

    return (
        <div>
            <Typography
                variant='h4'
                gutterBottom
                sx={{ textAlign: "center", mb: 4 }}
            >
                PayPal Gebührenübersicht
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <strong>Transaktionstyp</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Gebühr</strong>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell
                                // If there is no cost, treat the entry as a header
                                sx={{
                                    fontWeight:
                                        row.cost === "" ? "bold" : "normal",
                                }}
                            >
                                {row.transaction}
                            </TableCell>
                            <TableCell>{row.cost}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default FeesOverview;
