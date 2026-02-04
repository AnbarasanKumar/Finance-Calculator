import { useEffect, useState } from 'react';
import {
  getExpenses,
  saveExpense,
  deleteExpense,
  getDailyTotal,
  getWeeklyTotal,
  getMonthlyTotal,
  getCategoryTotals
} from './api/expenseService';

import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SummaryCard from './components/SummaryCard';
import CategoryBreakdown from './components/CategoryBreakdown';

import logo from './assets/Anbarasan icon.png';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [daily, setDaily] = useState(0);
  const [weekly, setWeekly] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState([]);

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    const [list, d, w, m, categories] = await Promise.all([
      getExpenses(),
      getDailyTotal(),
      getWeeklyTotal(),
      getMonthlyTotal(month, year),
      getCategoryTotals(month, year)
    ]);

    setExpenses(list.data);
    setDaily(d.data);
    setWeekly(w.data);
    setMonthly(m.data);
    setCategoryTotals(categories.data);
  };

  const addExpense = async (data) => {
    await saveExpense(data);
    refreshData();
  };

  const deleteHandler = async (id) => {
    if (confirm("Delete this expense?")) {
      await deleteExpense(id);
      refreshData();
    }
  };

  return (
    <div className="app-container">
      
      {/* Header with Logo */}
      <header className="app-header">
        <div className="title-with-logo">
          <img src={logo} alt="Finance Tracker Logo" className="app-logo" />
          <h1 className="app-title">Anbarasan Personal Finance Tracker</h1>
        </div>

        <p className="app-subtitle">
          {now.toLocaleString('default', { month: 'long' })} {year}
        </p>
      </header>

      <SummaryCard total={monthly} daily={daily} weekly={weekly} />

      <section className="section">
        <CategoryBreakdown
          totals={categoryTotals}
          monthLabel={now.toLocaleString('default', { month: 'long' })}
          monthlyTotal={monthly}
        />
      </section>

      <section className="section">
        <h2 className="section-title">🧾 Add a New Expense Transaction 🧾</h2>


        <ExpenseForm onAdd={addExpense} />
      </section>

      <section className="section">
        <ExpenseList expenses={expenses} onDelete={deleteHandler} />
      </section>

    </div>
  );
}

export default App;
