import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

export default function FinanceAIPage() {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const budgetData = useSelector((state) => state.budget.formData);
  const transactions = useSelector((state) => state.transactions.list);

  const [insights, setInsights] = useState("");
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  const callGemini = async (promptText) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: promptText }],
            },
          ],
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Invalid response from Gemini API");
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Gemini API error:", error);
      return "Unable to retrieve response from AI at this time.";
    }
  };

  const getInsights = async () => {
    setLoadingInsights(true);
    const prompt = `
      You are a financial assistant AI. Based on the user's budget and transactions, generate data-driven insights and suggestions.
      Budget Data: ${JSON.stringify(budgetData, null, 2)}
      Transactions: ${JSON.stringify(transactions, null, 2)}
    `;
    const result = await callGemini(prompt);
    setInsights(result);
    setLoadingInsights(false);
  };

  const askQuestion = async () => {
    if (!question.trim()) return;
    setLoadingAnswer(true);

    const prompt = `
      You are a financial AI. Answer the following question briefly and accurately.
      User Question: ${question}
    `;

    const result = await callGemini(prompt);
    setAnswer(result);
    setLoadingAnswer(false);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Paper elevation={4} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Finance AI Insights
        </Typography>
        <Box textAlign="center" sx={{ my: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={getInsights}
            disabled={loadingInsights}
            sx={{
              backgroundColor: "black",
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            {loadingInsights ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Get Insights With Finance AI"
            )}
          </Button>
        </Box>
        {insights && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Insights</Typography>
            <Typography>{insights}</Typography>
          </Box>
        )}
      </Paper>

      <Paper elevation={4} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Ask Finance AI a Question
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <TextField
            fullWidth
            multiline
            minRows={2}
            label="Your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={askQuestion}
            disabled={loadingAnswer}
            sx={{
              backgroundColor: "black",
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            {loadingAnswer ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Ask AI"
            )}
          </Button>
        </Box>
        {answer && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Answer</Typography>
            <Typography>{answer}</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
