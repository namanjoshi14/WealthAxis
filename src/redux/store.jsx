// src/store.js  (or wherever you combine your slices)
import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "../redux/budgetSlice";
import transactionReducer from "../redux/transactionsSlice";

export const store = configureStore({
  reducer: {
    budget: budgetReducer,
    transactions: transactionReducer,
    // …other slices
  },
});
