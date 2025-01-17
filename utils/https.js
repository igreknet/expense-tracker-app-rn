import axios from 'axios';

const BASE_URL = 'https://expense-tracker-app-rn-default-rtdb.europe-west1.firebasedatabase.app';

//send post request to firebase, second arg - what to send
export async function storeExpense(expenseData) {
  const response = await axios.post(`${BASE_URL}/expenses.json`, expenseData);
  //id generated by firebase
  const id = response.data.name;
  return id;
}

//get data from firebase
export async function fetchExpenses() {
  const response = await axios.get(`${BASE_URL}/expenses.json`);

  const expenses = [];

  console.log(response.data);

  //axios gives data property of response object that has all data send back by server
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

//update via PUT request, and pass expenseData, with info that should be updated
export function updateExpense(id, expenseData) {
  return axios.put(`${BASE_URL}/expenses/${id}.json`, expenseData);
}

//we dont need second param, because it's just deleting
export function deleteExpense(id) {
  return axios.delete(`${BASE_URL}/expenses/${id}.json`);
}
