import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/ui/Button';
import { ExpensesContext } from '../store/expensesContext';

export default function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;

  //convert a value to boolean to check is editing or not
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit expense' : 'Add expense',
    });
  }, [navigation, isEditing]);

  //use goBack method to return to screen which we came from
  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    isEditing
      ? expensesCtx.updateExpense(editedExpenseId, {
          description: 'test#1',
          amount: 1,
          date: new Date('2024-08-02'),
        })
      : expensesCtx.addExpense({ description: 'test#2', amount: 2, date: new Date('2024-08-02') });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button
          mode="flat"
          onPress={cancelHandler}
          style={styles.button}
        >
          Cancel
        </Button>
        <Button
          style={styles.button}
          onPress={confirmHandler}
        >
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
