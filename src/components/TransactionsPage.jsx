import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
} from "@mui/material";
import { addTransaction } from "../redux/transactionsSlice";

export default function TransactionsPage() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.list);

  const [tx, setTx] = useState({
    name: "",
    type: "",
    date: "",
    amount: "",
    comment: "",
  });

  const handleChange = (e) =>
    setTx((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTransaction(tx));
    setTx({ name: "", type: "", date: "", amount: "", comment: "" });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Paper elevation={8} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Log a Transaction
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {["name", "type", "date", "amount", "comment"].map((field) => (
              <Grid item xs={12} sm={field === "comment" ? 12 : 6} key={field}>
                <TextField
                  fullWidth
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  type={
                    field === "amount"
                      ? "number"
                      : field === "date"
                      ? "date"
                      : "text"
                  }
                  value={tx[field]}
                  onChange={handleChange}
                  InputLabelProps={field === "date" ? { shrink: true } : {}}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  "&:hover": { backgroundColor: "#333" },
                }}
              >
                Add Transaction
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Typography variant="h5">Recent Transactions</Typography>
      </Stack>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {["Date", "Name", "Type", "Amount", "Comment"].map((head) => (
                <TableCell key={head}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(({ id, date, name, type, amount, comment }) => (
              <TableRow key={id}>
                <TableCell>{date}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>₹{parseFloat(amount).toFixed(2)}</TableCell>
                <TableCell>{comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
