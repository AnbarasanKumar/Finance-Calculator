import { useState } from 'react';

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: '',
    expenseDate: ''
  });

  const categories = [
    "Food", "Transport", "Rent", "Shopping",
    "Utilities", "Entertainment", "Other"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ description: '', amount: '', category: '', expenseDate: '' });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        className="expense-input"
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
        required
      />

      <input
        className="expense-input"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={e => setForm({ ...form, amount: e.target.value })}
        required
      />

      <select
        className="expense-select"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
        required
      >
        <option value="" disabled>Select Category</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <input
        className="expense-input"
        type="date"
        value={form.expenseDate}
        onChange={e => setForm({ ...form, expenseDate: e.target.value })}
        required
      />

      <button className="expense-button" type="submit">
        Add Expense
      </button>
    </form>
  );
}
