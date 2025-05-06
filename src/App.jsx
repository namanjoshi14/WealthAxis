import React, { useState, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Box,
  CssBaseline,
  createTheme,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BarChartIcon from "@mui/icons-material/BarChart";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import CryptoPage from "./components/CryptoPage";
import MarketPage from "./components/MarketPage";
import BudgetsPage from "./components/BudgetsPage";
import TransactionsPage from "./components/TransactionsPage";
import FinanceAIPage from "./components/FinanceAIPage";

function NavBar({ mode, toggleMode }) {
  const location = useLocation();
  const navItems = [
    { label: "Dashboard", Icon: DashboardIcon, path: "/" },
    { label: "Market", Icon: TrendingUpIcon, path: "/Market" },
    { label: "Crypto", Icon: CurrencyBitcoinIcon, path: "/Crypto" },
    { label: "Budgets", Icon: AccountBalanceWalletIcon, path: "/Budgets" },
    { label: "Transactions", Icon: BarChartIcon, path: "/Transactions" },
    { label: "Finance AI", Icon: SmartToyIcon, path: "/FinanceAI" },
    { label: "About", Icon: SmartToyIcon, path: "/About" },
    { label: "Contact", Icon: SmartToyIcon, path: "/Contact" },
  ];
  return (
    <AppBar position="static" sx={{ bgcolor: "#4f7942" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          WealthAxis
        </Typography>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.label}
              component={Link}
              to={item.path}
              color="inherit"
              startIcon={<item.Icon />}
              sx={{
                textTransform: "none",
                ml: 1,
                borderBottom: isActive
                  ? `2px solid ${mode === "light" ? "#000" : "#fff"}`
                  : "none",
              }}
            >
              {item.label}
            </Button>
          );
        })}
        <IconButton color="inherit" onClick={toggleMode} sx={{ ml: 2 }}>
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

function LandingPage() {
  return (
    <Container
      sx={{
        mt: 4,
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        <Typewriter
          words={[
            "Welcome To WealthAxis. Your Personal Finance Dashboard, Integrating Market Insights, Budgeting Tools, And AI-Powered Financial Analytics.",
          ]}
          loop={1}
          cursor
          cursorStyle="_"
          typeSpeed={80}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </Typography>
    </Container>
  );
}

function Footer() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderTop: isLight ? "1px solid rgba(0,0,0,0.12)" : "none",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="body2">
        Designed And Developed By Naman Joshi, All Rights Reserved.
      </Typography>
    </Box>
  );
}

function Page({ title }) {
  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4">{title}</Typography>
    </Container>
  );
}

export default function App() {
  const [mode, setMode] = useState("light");
  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
      }),
    [mode]
  );
  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Dashboard" element={<LandingPage />} />
          <Route path="/Market" element={<MarketPage />} />
          <Route path="/Budgets" element={<BudgetsPage />} />
          <Route path="/Transactions" element={<TransactionsPage />} />
          <Route path="/FinanceAI" element={<FinanceAIPage />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Contact" element={<ContactPage />} />
          <Route path="/Crypto" element={<CryptoPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
