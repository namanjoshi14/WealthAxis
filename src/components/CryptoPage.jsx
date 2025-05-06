import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Tabs,
  Tab,
  Box,
  Divider,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import SearchIcon from "@mui/icons-material/Search";
import NumbersIcon from "@mui/icons-material/Numbers";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PaidIcon from "@mui/icons-material/Paid";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const API_KEY = "CG-NHb7QnW9ExGk7D8iHgZGatnx";
const cg = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: { "x-cg-demo-api-key": API_KEY },
});

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function CryptoPage() {
  const [tabIndex, setTabIndex] = useState(0);

  const [globalData, setGlobalData] = useState(null);
  const [loadingGlobal, setLoadingGlobal] = useState(true);
  const [errorGlobal, setErrorGlobal] = useState("");

  const [coins, setCoins] = useState([]);
  const [loadingCoins, setLoadingCoins] = useState(false);
  const [errorCoins, setErrorCoins] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchGlobal = async () => {
      setErrorGlobal("");
      try {
        const res = await cg.get("/global");
        setGlobalData(res.data.data);
      } catch {
        setErrorGlobal("Failed To Load Global Market Data.");
      } finally {
        setLoadingGlobal(false);
      }
    };
    fetchGlobal();
  }, []);

  const handleSearchSubmit = () => {
    const query = searchInput.trim();
    setErrorCoins("");
    setCoins([]);
    if (query) {
      setSearchQuery(query);
    }
  };

  useEffect(() => {
    if (!searchQuery) return;
    const runSearch = async () => {
      setLoadingCoins(true);
      try {
        const { data } = await cg.get("/search", {
          params: { query: searchQuery },
        });
        const ids = data.coins.map((c) => c.id);
        if (ids.length === 0) {
          setCoins([]);
        } else {
          const res = await cg.get("/coins/markets", {
            params: { vs_currency: "usd", ids: ids.join(",") },
          });
          setCoins(res.data);
        }
      } catch {
        setErrorCoins("Search Failed.");
      } finally {
        setLoadingCoins(false);
      }
    };
    runSearch();
  }, [searchQuery]);

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={24} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Crypto Dashboard
        </Typography>
        <Typography paragraph>
          Your Personal Crypto Dashboard — View Global Metrics And Search For
          Specific Coins.
        </Typography>

        <Tabs
          value={tabIndex}
          onChange={(e, val) => setTabIndex(val)}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab icon={<PublicIcon />} label="Global Data" />
          <Tab icon={<SearchIcon />} label="Search Coins" />
        </Tabs>

        <Divider sx={{ my: 2 }} />

        <TabPanel value={tabIndex} index={0}>
          {loadingGlobal ? (
            <Box sx={{ textAlign: "center", my: 2 }}>
              <CircularProgress />
            </Box>
          ) : errorGlobal ? (
            <Alert severity="error">{errorGlobal}</Alert>
          ) : (
            <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
              <Typography variant="h5" gutterBottom>
                <PublicIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Global Market Data
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <NumbersIcon color="primary" sx={{ mr: 1 }} />
                <Typography>
                  Active Cryptocurrencies: {globalData.active_cryptocurrencies}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <StorefrontIcon color="secondary" sx={{ mr: 1 }} />
                <Typography>Markets: {globalData.markets}</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PaidIcon color="success" sx={{ mr: 1 }} />
                <Typography>
                  Total Market Cap (USD): $
                  {globalData.total_market_cap.usd.toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <ShowChartIcon color="info" sx={{ mr: 1 }} />
                <Typography>
                  Total Volume (USD): $
                  {globalData.total_volume.usd.toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <CurrencyBitcoinIcon sx={{ mr: 1, color: "#f2a900" }} />
                <Typography>
                  BTC Dominance:{" "}
                  {globalData.market_cap_percentage.btc.toFixed(2)}%
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TrendingDownIcon color="error" sx={{ mr: 1 }} />
                <Typography>
                  24h Change:{" "}
                  {globalData.market_cap_change_percentage_24h_usd.toFixed(2)}%
                </Typography>
              </Box>
            </Box>
          )}
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              label="Search coins..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleSearchSubmit}>
              Search
            </Button>
          </Box>

          {searchQuery === "" ? null : loadingCoins ? (
            <Box sx={{ textAlign: "center", my: 2 }}>
              <CircularProgress />
            </Box>
          ) : errorCoins ? (
            <Alert severity="error">{errorCoins}</Alert>
          ) : coins.length === 0 ? (
            <Typography>No coins found.</Typography>
          ) : (
            <Grid container spacing={3}>
              {coins.map((coin) => (
                <Grid item xs={12} sm={6} md={4} key={coin.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="100"
                      image={coin.image}
                      alt={coin.name}
                    />
                    <CardContent>
                      <Typography variant="h6">
                        {coin.name} ({coin.symbol.toUpperCase()})
                      </Typography>
                      <Typography>
                        Price: ${coin.current_price.toLocaleString()}
                      </Typography>
                      <Typography>
                        Market Cap: ${coin.market_cap.toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>
      </Paper>
    </Container>
  );
}
