export default function CategoryBreakdown({ totals, monthLabel, monthlyTotal }) {
  const sortedTotals = [...totals].sort((a, b) => b.total - a.total);

  if (!sortedTotals.length) {
    return (
      <div className="category-breakdown empty">
        <h3 className="table-title">📌 Category Breakdown</h3>
        <p className="no-data">No category totals available yet.</p>
      </div>
    );
  }

  return (
    <div className="category-breakdown">
      <h3 className="table-title">📌 {monthLabel} Category Breakdown</h3>
      <ul className="category-list">
        {sortedTotals.map((item) => {
          const percentage = monthlyTotal ? (item.total / monthlyTotal) * 100 : 0;
          return (
            <li key={item.category} className="category-item">
              <div className="category-row">
                <span className="category-name">{item.category}</span>
                <span className="category-amount">₹{item.total.toFixed(2)}</span>
              </div>
              <div className="category-bar">
                <span className="category-bar-fill" style={{ width: `${percentage}%` }} />
              </div>
              <span className="category-percentage">{percentage.toFixed(0)}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
