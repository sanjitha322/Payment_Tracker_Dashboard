import { useState } from "react";
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import FilterBar from "./components/FilterBar";
import PaymentTable from "./components/PaymentTable";
import AddPaymentModal from "./components/AddPaymentModal";
import { PaymentProvider, usePayments } from "./context/PaymentContext";
import { exportToCSV } from "./utils/exportCSV";
import "./App.css";

function Dashboard() {
  const { payments } = usePayments();
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    type: "all",
    category: "all",
    dateFrom: "",
    dateTo: "",
  });

  const filtered = payments.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchStatus = filters.status === "all" || p.status === filters.status;
    const matchType = filters.type === "all" || p.type === filters.type;
    const matchCategory = filters.category === "all" || p.category === filters.category;
    const matchDateFrom = !filters.dateFrom || p.date >= filters.dateFrom;
    const matchDateTo = !filters.dateTo || p.date <= filters.dateTo;
    return matchSearch && matchStatus && matchType && matchCategory && matchDateFrom && matchDateTo;
  });

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <div className="page-header">
          <h1>Payment Dashboard</h1>
          <p>Track your incoming and outgoing payments</p>
        </div>

        <SummaryCards />

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          onExport={() => exportToCSV(filtered)}
          onAdd={() => setShowModal(true)}
        />

        <div className="results-info">
          Showing <strong>{filtered.length}</strong> of <strong>{payments.length}</strong> payments
        </div>

        <PaymentTable payments={filtered} />
      </main>

      {showModal && <AddPaymentModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <PaymentProvider>
      <Dashboard />
    </PaymentProvider>
  );
}