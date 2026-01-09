import { useState, useEffect } from 'react';
import { 
    getExpenses, 
    saveExpense, 
    getMonthlyTotal, 
    deleteExpense, 
    getDailyTotal,
    getWeeklyTotal // Ensure this is imported
} from './api/expenseService';
import SummaryCard from './components/SummaryCard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
    const [expenses, setExpenses] = useState([]);
    const [total, setTotal] = useState(0);       // Monthly
    const [dailyTotal, setDailyTotal] = useState(0); 
    const [weeklyTotal, setWeeklyTotal] = useState(0); // New state for weekly

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    useEffect(() => {
        refreshData();
    }, []);

    // The core function to keep all data in sync with MySQL
    const refreshData = async () => {
        try {
            // Fetching all 4 data points simultaneously
            const [listRes, totalRes, dailyRes, weeklyRes] = await Promise.all([
                getExpenses(),
                getMonthlyTotal(currentMonth, currentYear),
                getDailyTotal(),
                getWeeklyTotal()
            ]);
            
            setExpenses(listRes.data);
            setTotal(totalRes.data);
            setDailyTotal(dailyRes.data);
            setWeeklyTotal(weeklyRes.data); // Update weekly state
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleAddExpense = async (data) => {
        try {
            await saveExpense(data);
            refreshData(); 
        } catch (error) {
            alert("Failed to add expense");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this expense?")) {
            try {
                await deleteExpense(id);
                refreshData(); 
            } catch (error) {
                alert("Error deleting record");
            }
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Finance Tracker</h1>
                <p style={styles.subtitle}>
                    Tracking for {now.toLocaleString('default', { month: 'long' })} {currentYear}
                </p>
            </header>

            <main>
                {/* 1. Updated Summary Card showing Daily, Weekly, and Monthly */}
                <SummaryCard 
                    total={total} 
                    daily={dailyTotal} 
                    weekly={weeklyTotal} 
                />

                {/* 2. Form Section */}
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Add New Transaction</h2>
                    <ExpenseForm onAdd={handleAddExpense} />
                </section>
                
                {/* 3. Table Section */}
                <section style={styles.section}>
                    <ExpenseList 
                        expenses={expenses} 
                        onDelete={handleDelete} 
                    />
                </section>
            </main>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '1000px', // Slightly wider to accommodate 3 cards
        margin: '0 auto',
        padding: '40px 20px',
        fontFamily: 'system-ui, sans-serif',
        color: '#333'
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px'
    },
    title: {
        fontSize: '2.5rem',
        margin: '0',
        color: '#1a202c'
    },
    subtitle: {
        color: '#718096',
        marginTop: '8px'
    },
    section: {
        backgroundColor: '#fff',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        marginBottom: '30px',
        border: '1px solid #f1f5f9'
    },
    sectionTitle: {
        fontSize: '1.25rem',
        marginBottom: '20px',
        borderBottom: '1px solid #edf2f7',
        paddingBottom: '10px'
    }
};

export default App;
