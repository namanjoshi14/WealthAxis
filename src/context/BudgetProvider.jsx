import React, { useState } from "react";
import BudgetContext from "./BudgetContext";

const defaultFormData = {
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
};

export default function BudgetProvider({ children }) {
  const [formData, setFormData] = useState(defaultFormData);

  const updateField = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  return (
    <BudgetContext.Provider value={{ formData, setFormData, updateField }}>
      {children}
    </BudgetContext.Provider>
  );
}
