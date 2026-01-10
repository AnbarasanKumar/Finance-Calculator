export default function ExpenseList({ expenses, onDelete }) {
  // Sort expenses by date ascending (oldest first)
  const sortedExpenses = [...expenses].sort((a, b) => {
    return new Date(a.expenseDate) - new Date(b.expenseDate);
  });

  // Function to format date as DD-MM-YYYY
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="table-wrapper">
      <h3 className="table-title">
        ⏳ Recent Transactions – Your Expense List ⏳
      </h3>

      <table className="expense-table expense-table-center">
        <thead>
          <tr>
            <th>DATE</th>
            <th>DESCRIPTION</th>
            <th>CATEGORY</th>
            <th>AMOUNT</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>
          {sortedExpenses.length > 0 ? (
            sortedExpenses.map(exp => (
              <tr key={exp.id}>
                <td>{formatDate(exp.expenseDate)}</td>
                <td>{exp.description}</td>
                <td>
                  <span className="category-badge">{exp.category}</span>
                </td>
                <td>₹{exp.amount.toFixed(2)}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(exp.id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">
                No expenses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
