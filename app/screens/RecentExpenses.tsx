import { useContext } from "react";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";

export default function RecentExpensesScreen() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const sevenDaysAgo = getDateMinusDays(today, 7);
    return expense.date >= sevenDaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput expensesPeriod="Last 7 Days" expenses={recentExpenses} fallbackText="No recent expenses." />
  );
}

const styles = StyleSheet.create({});
