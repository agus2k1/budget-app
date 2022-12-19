// @ts-nocheck
import React from "react";
import { Modal, Button, Stack } from "react-bootstrap";
import { currencyFormatter } from "utils";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const expenses = getBudgetExpenses(budgetId);

  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "No Category", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((budget) => budget.id === budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => {
            const { id, description, amount } = expense;
            return (
              <Stack key={id} direction="horizontal" gap="2">
                <div className="me-auto fs-4">{description}</div>
                <div className="fs-5">{currencyFormatter.format(amount)}</div>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => deleteExpense(expense)}
                >
                  &times;
                </Button>
              </Stack>
            );
          })}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
