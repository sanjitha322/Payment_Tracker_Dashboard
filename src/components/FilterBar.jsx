import { categories } from "../data/mockData";

export default function FilterBar({ filters, setFilters, onExport, onAdd }) {
  return (
    <div className="filter-bar">
      <div className="filters-left">
        <input
          type="text"
          placeholder="Search payments..."
          className="filter-input"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <select
          className="filter-select"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <select
          className="filter-select"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="all">All Types</option>
          <option value="incoming">Incoming</option>
          <option value="outgoing">Outgoing</option>
        </select>

        <select
          className="filter-select"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat === "All" ? "all" : cat}>{cat}</option>
          ))}
        </select>

        <input
          type="date"
          className="filter-input"
          value={filters.dateFrom}
          onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
        />
        <input
          type="date"
          className="filter-input"
          value={filters.dateTo}
          onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
        />
      </div>

      <div className="filters-right">
        <button className="btn btn-outline" onClick={onExport}>⬇ Export CSV</button>
        <button className="btn btn-primary" onClick={onAdd}>+ Add Payment</button>
      </div>
    </div>
  );
}