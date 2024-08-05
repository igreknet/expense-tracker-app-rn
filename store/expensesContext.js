import { createContext, useReducer } from 'react';
import { nanoid } from 'nanoid';

const DATA = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2024-08-01'),
  },
  {
    id: 'e2',
    description: 'A pair of pants',
    amount: 79.99,
    date: new Date('2024-08-02'),
  },
  {
    id: 'e3',
    description: 'Fruits',
    amount: 9.99,
    date: new Date('2024-08-03'),
  },
  {
    id: 'e4',
    description: 'Book',
    amount: 19.99,
    date: new Date('2024-08-04'),
  },
  {
    id: 'e5',
    description: 'Toy',
    amount: 29.99,
    date: new Date('2024-08-05'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: id => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = nanoid();
      return [{ ...action.payload, id: id }, ...state];

    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(expense => expense.id === action.payload.id);
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatableExpense;

    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload);
    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(reducer, DATA);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}
