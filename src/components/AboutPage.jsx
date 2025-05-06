import React from "react";
import { Container, Typography, Box, Divider } from "@mui/material";

export default function AboutPage() {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        About WealthAxis
      </Typography>
      <Typography variant="body1" paragraph>
        WealthAxis is a comprehensive personal finance dashboard that empowers
        individuals to track transactions, manage budgets, access real-time
        market data, and leverage AI-driven insights for informed
        decision‑making.
      </Typography>

      <Typography variant="h5" gutterBottom>
        About Me
      </Typography>
      <Typography variant="h6">Naman Joshi</Typography>
      <Typography variant="body2" paragraph>
        Specialist Programmer at Infosys Limited since June 2022 | Full Stack
        Developer. Gaining expertise in digital technologies and building
        multi‑disciplinary skills to solve business problems across different
        domains, add value to organizational operations, and guide diverse tech
        teams in driving transformation programs.
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h5" gutterBottom>
        Education
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">SRM IST Chennai</Typography>
        <Typography variant="body2">
          Bachelor of Technology – Computer Science and Engineering (Jul 2018 –
          May 2022)
        </Typography>
        <Typography variant="body2">CGPA: 9.04</Typography>
      </Box>
      <Box>
        <Typography variant="h6">Hartmann College</Typography>
        <Typography variant="body2">
          Indian School Certificate Examination & Indian Certificate of
          Secondary Education Examination (2003 – 2017)
        </Typography>
      </Box>
    </Container>
  );
}
