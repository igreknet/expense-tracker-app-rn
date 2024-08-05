import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expensesContext';

export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No registered fexpenses found"
    />
  );
}

const styles = StyleSheet.create({});
