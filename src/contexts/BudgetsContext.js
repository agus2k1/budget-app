import useLocalStorage from "../hooks/useLocalStorage";
import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const BudgetsContext = React.createContext(null);

export const UNCATEGORIZED_BUDGET_ID = "No category";

export const useBudgets = () => {
  return useContext(BudgetsContext);
};

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };

  const addExpense = ({ budgetId, amount, description }) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), budgetId, amount, description }];
    });
  };

  const addBudget = ({ name, max }) => {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  };

  const deleteBudget = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });

    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  };

  const deleteExpense = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  };

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
