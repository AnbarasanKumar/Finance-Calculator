export default function SummaryCard({ total, daily, weekly }) {
  return (
    <div className="summary-container">
      
      <div className="summary-card green">
        <span className="summary-icon">📅</span>
        <p className="summary-label">Today</p>
        <h2 className="summary-amount">₹{daily.toFixed(2)}</h2>
      </div>

      <div className="summary-card yellow">
        <span className="summary-icon">📊</span>
        <p className="summary-label">This Week</p>
        <h2 className="summary-amount">₹{weekly.toFixed(2)}</h2>
      </div>

      <div className="summary-card blue">
        <span className="summary-icon">💰</span>
        <p className="summary-label">This Month</p>
        <h2 className="summary-amount">₹{total.toFixed(2)}</h2>
      </div>

    </div>
  );
}
