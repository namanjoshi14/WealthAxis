import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  useTheme,
} from "@mui/material";

export default function ContactPage() {
  const theme = useTheme();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    linkedin: "",
    comments: "",
  });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => e.preventDefault();

  return (
    <Container sx={{ mt: 4, mb: 4, maxWidth: "sm" }}>
      <Typography variant="h4" gutterBottom>
        Contact
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Phone No"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="E‑mail"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="LinkedIn Profile Address"
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Comments"
          name="comments"
          value={form.comments}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: theme.palette.mode === "light" ? "#000" : "#fff",
            color: theme.palette.mode === "light" ? "#fff" : "#000",
            "&:hover": {
              bgcolor: theme.palette.mode === "light" ? "#333" : "#ccc",
            },
          }}
        >
          Submit
        </Button>
      </Box>
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Link
          href="https://www.linkedin.com/in/maniac2356/"
          target="_blank"
          underline="hover"
        >
          LinkedIn
        </Link>
        {" | "}
        <Link href="mailto:naman.joshi@example.com" underline="hover">
          Email
        </Link>
        {" | "}
        <Link
          href="https://portfolio.example.com"
          target="_blank"
          underline="hover"
        >
          My Portfolio Website
        </Link>
      </Box>
    </Container>
  );
}
