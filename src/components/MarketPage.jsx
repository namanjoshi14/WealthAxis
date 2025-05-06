import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Divider,
  TextField,
  Button,
  List,
  ListItemButton,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
} from "@mui/material";

// Material UI Icons
import SearchIcon from "@mui/icons-material/Search";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ArticleIcon from "@mui/icons-material/Article";

const API_KEY = "cvvumvpr01qud9qkp210cvvumvpr01qud9qkp21g";
const BASE_URL = "https://finnhub.io/api/v1";

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function MarketPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [symbolQuery, setSymbolQuery] = useState("");
  const [lookupResults, setLookupResults] = useState([]);
  const [symbolList, setSymbolList] = useState([]);
  const [visibleSymbols, setVisibleSymbols] = useState(10);
  const [marketNews, setMarketNews] = useState([]);
  const [exchangeSelection, setExchangeSelection] = useState({
    exchange: "US",
    mic: null,
  });

  const defaultSymbols = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "MSFT", name: "Microsoft Corporation" },
    { symbol: "NVDA", name: "NVIDIA Corporation" },
    { symbol: "GOOG", name: "Alphabet Inc. Class C" },
    { symbol: "GOOGL", name: "Alphabet Inc. Class A" },
    { symbol: "AMZN", name: "Amazon.com, Inc." },
    { symbol: "META", name: "Meta Platforms, Inc. Class A" },
    { symbol: "BRK/B", name: "Berkshire Hathaway Inc." },
    { symbol: "BRK/A", name: "Berkshire Hathaway Inc." },
    { symbol: "TSLA", name: "Tesla, Inc." },
  ];

  useEffect(() => {
    axios
      .get(`${BASE_URL}/news`, {
        params: { category: "general", token: API_KEY },
      })
      .then((res) => setMarketNews(res.data.slice(0, 10)))
      .catch((err) => console.error("Failed To Fetch Market News", err));
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/stock/symbol`, {
        params: {
          exchange: exchangeSelection.exchange,
          ...(exchangeSelection.mic && { mic: exchangeSelection.mic }),
          token: API_KEY,
        },
      })
      .then((res) => {
        setSymbolList(res.data);
        setVisibleSymbols(10);
      })
      .catch((err) => console.error("Failed To Fetch Stock Symbols", err));
  }, [exchangeSelection]);

  const handleLookup = () => {
    if (!symbolQuery.trim()) return;
    axios
      .get(`${BASE_URL}/search`, { params: { q: symbolQuery, token: API_KEY } })
      .then((res) => setLookupResults(res.data.result || []))
      .catch((err) => {
        console.error("Lookup Failed", err);
        setLookupResults([]);
      });
  };

  const openGoogleSearch = (symbol) => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(
      symbol + " STOCK"
    )}`;
    window.open(url, "_blank", "noopener");
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={24} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Market Dashboard
        </Typography>
        <Typography paragraph>
          Your Gateway To Global Equity Markets — Explore Symbols, Track Stocks,
          And Stay Informed With The Latest Market News.
        </Typography>

        <Tabs
          value={tabIndex}
          onChange={(e, idx) => setTabIndex(idx)}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab
            icon={<SearchIcon />}
            iconPosition="start"
            label="Symbol Lookup"
          />
          <Tab
            icon={<ListAltIcon />}
            iconPosition="start"
            label="Stock Symbols"
          />
          <Tab
            icon={<ArticleIcon />}
            iconPosition="start"
            label="Market News"
          />
        </Tabs>
        <Divider sx={{ my: 2 }} />

        <TabPanel value={tabIndex} index={0}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Popular Symbols:</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {defaultSymbols.map(({ symbol, name }) => (
                <Chip
                  key={symbol}
                  label={`${symbol} ${name}`}
                  onClick={() => openGoogleSearch(symbol)}
                  clickable
                />
              ))}
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              label="Search Symbol"
              value={symbolQuery}
              onChange={(e) => setSymbolQuery(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleLookup}
              sx={{
                backgroundColor: "black",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              Search
            </Button>
          </Box>
          {lookupResults.length > 0 && (
            <List>
              {lookupResults.map((item, i) => (
                <ListItemButton
                  key={i}
                  onClick={() => openGoogleSearch(item.symbol)}
                >
                  <ListItemText
                    primary={`${item.symbol} — ${item.description}`}
                  />
                </ListItemButton>
              ))}
            </List>
          )}
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <Box sx={{ mb: 2, maxWidth: 240 }}>
            <FormControl fullWidth>
              <InputLabel>Exchange</InputLabel>
              <Select
                value={exchangeSelection.mic || "US"}
                label="Exchange"
                onChange={(e) => {
                  const mic = e.target.value;
                  setExchangeSelection({
                    exchange: "US",
                    mic: mic === "US" ? null : mic,
                  });
                }}
              >
                <MenuItem value="US">All US Stocks</MenuItem>
                <MenuItem value="XNAS">NASDAQ</MenuItem>
                <MenuItem value="XNYS">NYSE</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <List>
            {symbolList.slice(0, visibleSymbols).map((symbol, i) => (
              <ListItemButton
                key={i}
                onClick={() => openGoogleSearch(symbol.displaySymbol)}
              >
                <ListItemText
                  primary={`${symbol.displaySymbol} — ${symbol.description}`}
                  secondary={`Type: ${symbol.type}`}
                />
              </ListItemButton>
            ))}
          </List>
          {visibleSymbols < symbolList.length && (
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setVisibleSymbols((v) => v + 10)}
              >
                Load More Symbols
              </Button>
            </Box>
          )}
        </TabPanel>

        <TabPanel value={tabIndex} index={2}>
          <Grid container spacing={2}>
            {marketNews.map((n) => (
              <Grid item xs={12} sm={6} key={n.id}>
                <Paper elevation={24} sx={{ p: 2, height: "100%" }}>
                  <Typography variant="subtitle1" gutterBottom>
                    <a href={n.url} target="_blank" rel="noopener noreferrer">
                      {n.headline}
                    </a>
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {n.summary}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Source: {n.source}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Paper>
    </Container>
  );
}
