import { useState } from 'react';

export default function ExpenseForm({ onAdd }) {
    const [form, setForm] = useState({ 
        description: '', 
        amount: '', 
        category: '', 
        expenseDate: '' 
    });

    // Define your categories here
    const categories = ["Food", "Transport", "Rent", "Shopping", "Utilities", "Entertainment", "Other"];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the data to the parent (App.jsx)
        onAdd(form);
        // Reset form
        setForm({ description: '', amount: '', category: '', expenseDate: '' });
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            {/* Description Input */}
            <input 
                type="text" 
                placeholder="Description" 
                value={form.description} 
                onChange={e => setForm({...form, description: e.target.value})} 
                required 
                style={styles.input}
            />

            {/* Amount Input */}
            <input 
                type="number" 
                placeholder="Amount" 
                value={form.amount} 
                onChange={e => setForm({...form, amount: e.target.value})} 
                required 
                style={styles.input}
            />

            {/* Category Dropdown */}
            <select 
                value={form.category} 
                onChange={e => setForm({...form, category: e.target.value})} 
                required
                style={styles.input}
            >
                <option value="" disabled>Select Category</option>
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            {/* Date Input */}
            <input 
                type="date" 
                value={form.expenseDate} 
                onChange={e => setForm({...form, expenseDate: e.target.value})} 
                required 
                style={styles.input}
            />

            <button type="submit" style={styles.button}>Add Expense</button>
        </form>
    );
}

const styles = {
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px'
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #cbd5e1',
        flex: '1 1 150px' // Makes inputs responsive
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold'
    }
};