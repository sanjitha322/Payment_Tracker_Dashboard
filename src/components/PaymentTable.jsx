import { usePayments } from "../context/PaymentContext";

export default function PaymentTable({ payments }) {
  const { updateStatus, deletePayment } = usePayments();

  if (payments.length === 0) {
    return <div className="empty-state">No payments found.</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="payment-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>
              <td>{p.title}</td>
              <td className={p.type === "incoming" ? "amount-in" : "amount-out"}>
                {p.type === "incoming" ? "+" : "-"}₹{p.amount.toLocaleString()}
              </td>
              <td>
                <span className={`badge badge-${p.type}`}>{p.type}</span>
              </td>
              <td>{p.category}</td>
              <td>{p.date}</td>
              <td>
                <span className={`badge badge-${p.status}`}>{p.status}</span>
              </td>
              <td className="actions">
                {p.status === "pending" && (
                  <button
                    className="btn-action btn-complete"
                    onClick={() => updateStatus(p.id, "completed")}
                    title="Mark Complete"
                  >
                    ✓
                  </button>
                )}
                <button
                  className="btn-action btn-delete"
                  onClick={() => deletePayment(p.id)}
                  title="Delete"
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}