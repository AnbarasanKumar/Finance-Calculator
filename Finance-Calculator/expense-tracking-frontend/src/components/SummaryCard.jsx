export default function SummaryCard({ total, daily, weekly }) {
    return (
        <div style={styles.container}>
            {/* Daily Card */}
            <div style={{ ...styles.card, backgroundColor: '#dcfce7', borderTop: '4px solid #22c55e' }}>
                <p style={styles.label}>Today</p>
                <h2 style={{ ...styles.amount, color: '#15803d' }}>₹{daily.toFixed(2)}</h2>
            </div>

            {/* Weekly Card */}
            <div style={{ ...styles.card, backgroundColor: '#fef9c3', borderTop: '4px solid #eab308' }}>
                <p style={styles.label}>This Week</p>
                <h2 style={{ ...styles.amount, color: '#a16207' }}>₹{weekly.toFixed(2)}</h2>
            </div>

            {/* Monthly Card */}
            <div style={{ ...styles.card, backgroundColor: '#dbeafe', borderTop: '4px solid #2563eb' }}>
                <p style={styles.label}>This Month</p>
                <h2 style={{ ...styles.amount, color: '#1d4ed8' }}>₹{total.toFixed(2)}</h2>
            </div>
        </div>
    );
}

const styles = {
    container: { 
        display: 'flex', 
        justifyContent: 'center', // Centers the cards horizontally
        alignItems: 'center',     // Aligns cards vertically if heights differ
        gap: '15px', 
        marginBottom: '20px',
        width: '100%'             // Ensures container takes full width to allow centering
    },
    card: { 
        flex: 1, 
        padding: '20px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center',      // Centers the text inside the card
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'      // Centers content if you add icons/images later
    },
    label: { 
        margin: 0, 
        fontSize: '0.8rem', 
        fontWeight: 'bold', 
        color: '#64748b', 
        textTransform: 'uppercase' 
    },
    amount: { 
        margin: '5px 0 0 0', 
        fontSize: '1.5rem' 
    }
};