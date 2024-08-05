import { FlatList, StyleSheet } from 'react-native';
import ExpenseItem from './ExpenseItem';

export default function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => {
        return <ExpenseItem {...item} />;
      }}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({});
