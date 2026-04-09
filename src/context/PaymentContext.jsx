import { createContext, useContext, useState } from "react";
import { mockPayments } from "../data/mockData";

const PaymentContext = createContext();

export function PaymentProvider({ children }) {
  const [payments, setPayments] = useState(mockPayments);

  const addPayment = (payment) => {
    const newPayment = { ...payment, id: Date.now() };
    setPayments((prev) => [newPayment, ...prev]);
  };

  const updateStatus = (id, status) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  const deletePayment = (id) => {
    setPayments((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PaymentContext.Provider value={{ payments, addPayment, updateStatus, deletePayment }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayments() {
  return useContext(PaymentContext);
}