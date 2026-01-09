import React from 'react';

export default function ExpenseList({ expenses, onDelete }) {
    return (
        <div style={{ marginTop: '20px' }}>
            <h3>Recent Transactions</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Category</th>
                        <th style={styles.th}>Amount</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.length > 0 ? (
                        expenses.map((exp) => (
                            <tr key={exp.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={styles.td}>{exp.expenseDate}</td>
                                <td style={styles.td}>{exp.description}</td>
                                <td style={styles.td}>
                                    <span style={styles.badge}>{exp.category}</span>
                                </td>
                                <td style={styles.td}>₹{exp.amount.toFixed(2)}</td>
                                <td style={styles.td}>
                                    <button 
                                        onClick={() => onDelete(exp.id)} 
                                        style={styles.deleteBtn}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No expenses found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    th: { padding: '12px', color: '#64748b', fontWeight: '600' },
    td: { padding: '12px', color: '#1e293b' },
    badge: {
        backgroundColor: '#dbeafe',
        color: '#1e40af',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '0.8rem'
    },
    deleteBtn: {
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};