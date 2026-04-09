export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">💳</span>
        <span className="brand-name">PayTrack</span>
      </div>
      <div className="navbar-user">
        <span className="user-avatar">A</span>
        <span className="user-name">Admin</span>
      </div>
    </nav>
  );
}