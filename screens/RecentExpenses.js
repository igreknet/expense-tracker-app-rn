import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expensesContext';
import { getDateminusDays } from '../utils/date';

export default function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const date7Days = getDateminusDays(today, 7);

    return expense.date > date7Days;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
}

const styles = StyleSheet.create({});
