import { useState } from "react";
import { usePayments } from "../context/PaymentContext";
import { categories } from "../data/mockData";

const defaultForm = {
  title: "",
  amount: "",
  type: "incoming",
  category: "Freelance",
  status: "pending",
  date: new Date().toISOString().split("T")[0],
};

export default function AddPaymentModal({ onClose }) {
  const { addPayment } = usePayments();
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.amount) {
      setError("Title and Amount are required.");
      return;
    }
    if (isNaN(form.amount) || Number(form.amount) <= 0) {
      setError("Amount must be a positive number.");
      return;
    }
    addPayment({ ...form, amount: Number(form.amount) });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Payment</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {error && <p className="modal-error">{error}</p>}

        <div className="modal-body">
          <label>Title</label>
          <input name="title" className="modal-input" placeholder="e.g. Client Invoice #104" value={form.title} onChange={handleChange} />

          <label>Amount (₹)</label>
          <input name="amount" type="number" className="modal-input" placeholder="e.g. 5000" value={form.amount} onChange={handleChange} />

          <div className="modal-row">
            <div>
              <label>Type</label>
              <select name="type" className="modal-input" value={form.type} onChange={handleChange}>
                <option value="incoming">Incoming</option>
                <option value="outgoing">Outgoing</option>
              </select>
            </div>

            <div>
              <label>Status</label>
              <select name="status" className="modal-input" value={form.status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <label>Category</label>
          <select name="category" className="modal-input" value={form.category} onChange={handleChange}>
            {categories.filter(c => c !== "All").map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <label>Date</label>
          <input name="date" type="date" className="modal-input" value={form.date} onChange={handleChange} />
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Add Payment</button>
        </div>
      </div>
    </div>
  );
}