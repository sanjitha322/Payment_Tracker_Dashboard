import { usePayments } from "../context/PaymentContext";

export default function SummaryCards() {
  const { payments } = usePayments();

  const totalIncoming = payments
    .filter((p) => p.type === "incoming")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalOutgoing = payments
    .filter((p) => p.type === "outgoing")
    .reduce((sum, p) => sum + p.amount, 0);

  const pending = payments.filter((p) => p.status === "pending").length;
  const completed = payments.filter((p) => p.status === "completed").length;

  const cards = [
    { label: "Total Incoming", value: `₹${totalIncoming.toLocaleString()}`, color: "card-green", icon: "⬆️" },
    { label: "Total Outgoing", value: `₹${totalOutgoing.toLocaleString()}`, color: "card-red", icon: "⬇️" },
    { label: "Pending", value: pending, color: "card-yellow", icon: "⏳" },
    { label: "Completed", value: completed, color: "card-blue", icon: "✅" },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card) => (
        <div key={card.label} className={`card ${card.color}`}>
          <div className="card-icon">{card.icon}</div>
          <div className="card-info">
            <p className="card-label">{card.label}</p>
            <h2 className="card-value">{card.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}