// src/BudgetsPage.jsx

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Paper,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { saveBudgetForm } from "../redux/budgetSlice";

export default function BudgetsPage() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    salary: 0,
    pension: 0,
    rental: 0,
    interest: 0,
    dividends: 0,
    othersIncome: 0,
    homeLoan: 0,
    carLoan: 0,
    personalLoan: 0,
    creditCard: 0,
    othersDebt: 0,
    incomeTax: 0,
    rentalTax: 0,
    investmentTax: 0,
    life: 0,
    medical: 0,
    car: 0,
    household: 0,
    othersInsurance: 0,
    epf: 0,
    ppf: 0,
    mutual: 0,
    nsc: 0,
    deposits: 0,
    othersInvestment: 0,
    food: 0,
    clothing: 0,
    electricity: 0,
    petrol: 0,
    transport: 0,
    cable: 0,
    newspapers: 0,
    help: 0,
    society: 0,
    milk: 0,
    telephone: 0,
    water: 0,
    schoolFees: 0,
    tuition: 0,
    personalCare: 0,
    medicalBills: 0,
    entertainment: 0,
    othersExpenses: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const income = [
    "salary",
    "pension",
    "rental",
    "interest",
    "dividends",
    "othersIncome",
  ].reduce((sum, key) => sum + formData[key], 0);

  const needsKeys = [
    "homeLoan",
    "carLoan",
    "personalLoan",
    "creditCard",
    "othersDebt",
    "incomeTax",
    "rentalTax",
    "investmentTax",
    "life",
    "medical",
    "car",
    "household",
    "othersInsurance",
    "food",
    "clothing",
    "electricity",
    "petrol",
    "transport",
    "cable",
    "newspapers",
    "help",
    "society",
    "milk",
    "telephone",
    "water",
    "schoolFees",
    "tuition",
    "personalCare",
    "medicalBills",
    "othersExpenses",
  ];

  const needs = needsKeys.reduce((sum, key) => sum + formData[key], 0);
  const wants = formData.entertainment;
  const savings = [
    "epf",
    "ppf",
    "mutual",
    "nsc",
    "deposits",
    "othersInvestment",
  ].reduce((sum, key) => sum + formData[key], 0);

  const actual = { needs, wants, savings };
  const ideal = {
    needs: income * 0.5,
    wants: income * 0.3,
    savings: income * 0.2,
  };

  const pieData = {
    labels: ["Needs", "Wants", "Savings"],
    datasets: [
      {
        data: [needs, wants, savings],
        backgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0"],
      },
    ],
  };

  const sections = [
    {
      title: "Income",
      fields: [
        "salary",
        "pension",
        "rental",
        "interest",
        "dividends",
        "othersIncome",
      ],
    },
    {
      title: "Housing & Debt (≤30%)",
      fields: [
        "homeLoan",
        "carLoan",
        "personalLoan",
        "creditCard",
        "othersDebt",
      ],
    },
    {
      title: "Taxes (≤30%)",
      fields: ["incomeTax", "rentalTax", "investmentTax"],
    },
    {
      title: "Insurance (≥4%)",
      fields: ["life", "medical", "car", "household", "othersInsurance"],
    },
    {
      title: "Savings & Investments (≥15%)",
      fields: ["epf", "ppf", "mutual", "nsc", "deposits", "othersInvestment"],
    },
    {
      title: "Living Expenses (≤21%)",
      fields: needsKeys.filter(
        (k) =>
          ![
            "homeLoan",
            "carLoan",
            "personalLoan",
            "creditCard",
            "othersDebt",
            "incomeTax",
            "rentalTax",
            "investmentTax",
            "life",
            "medical",
            "car",
            "household",
            "othersInsurance",
          ].includes(k)
      ),
    },
  ];

  const handleSubmit = () => {
    dispatch(saveBudgetForm(formData));
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 2 }}>
      <Paper elevation={24} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Budget Calculator
        </Typography>
        <Typography paragraph>
          Apply the 50/30/20 guideline to your after-tax income: allocate 50%
          for essentials, 30% for discretionary spending, and 20% toward
          savings. Adjust these targets to suit your lifestyle and financial
          ambitions.
        </Typography>
      </Paper>

      {sections.map(({ title, fields }) => (
        <Accordion key={title}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper elevation={24} sx={{ p: 2 }}>
              <Grid container spacing={2}>
                {fields.map((key) => (
                  <Grid item xs={12} sm={6} md={4} key={key}>
                    <TextField
                      fullWidth
                      label={key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                      name={key}
                      type="number"
                      value={formData[key]}
                      onChange={handleChange}
                      InputProps={{ inputProps: { min: 0 } }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </AccordionDetails>
        </Accordion>
      ))}

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h5" gutterBottom>
          Allocation Summary
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Paper elevation={24} sx={{ p: 2 }}>
              <Typography>
                <strong>Monthly Income:</strong> ₹{income.toFixed(2)}
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {["Needs", "Wants", "Savings"].map((cat) => {
                  const actualVal = actual[cat.toLowerCase()];
                  const idealVal = ideal[cat.toLowerCase()];
                  return (
                    <Grid item xs={12} sm={4} key={cat}>
                      <Typography variant="subtitle1">{cat}</Typography>
                      <Typography>Actual: ₹{actualVal.toFixed(2)}</Typography>
                      <Typography>Target: ₹{idealVal.toFixed(2)}</Typography>
                    </Grid>
                  );
                })}
              </Grid>
              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: "black",
                    "&:hover": { backgroundColor: "#333" },
                  }}
                >
                  Get Insights With Finance AI
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={24} sx={{ p: 2, textAlign: "center" }}>
              <Pie data={pieData} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
