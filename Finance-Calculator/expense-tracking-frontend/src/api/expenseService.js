import axios from 'axios';

const API_URL = "http://localhost:8080/api/expenses";

export const getExpenses = () => axios.get(API_URL);
export const saveExpense = (expense) => axios.post(API_URL, expense);
export const deleteExpense = (id) => axios.delete(`${API_URL}/${id}`);
export const getMonthlyTotal = (month, year) => axios.get(`${API_URL}/total?month=${month}&year=${year}`);
export const getDailyTotal = () => axios.get(`${API_URL}/daily-total`);
export const getWeeklyTotal = () => axios.get(`${API_URL}/weekly-total`);