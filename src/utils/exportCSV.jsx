export function exportToCSV(payments) {
  const headers = ["ID", "Title", "Amount", "Type", "Category", "Status", "Date"];
  const rows = payments.map((p) => [
    p.id, p.title, p.amount, p.type, p.category, p.status, p.date
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "payments_report.csv";
  a.click();
  URL.revokeObjectURL(url);
}