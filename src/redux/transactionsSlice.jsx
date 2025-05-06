// src/redux/transactionSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    list: [],
  },
  reducers: {
    addTransaction: {
      reducer(state, action) {
        state.list.push(action.payload);
      },
      prepare({ name, type, date, amount, comment }) {
        return {
          payload: {
            id: nanoid(),
            name,
            type,
            date,
            amount: parseFloat(amount),
            comment,
          },
        };
      },
    },
  },
});

export const { addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
