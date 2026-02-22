// Sidebar.jsx
import { useState } from "react";

function Sidebar({ activePage, setActivePage }) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Running", icon: "🏃" },
    { name: "Cricket", icon: "🏏" },
    { name: "Swimming", icon: "🏊" },
  ];

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2>{!collapsed && "Sports AI"}</h2>
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={activePage === item.name.toLowerCase() ? "active" : ""}
              onClick={() => setActivePage(item.name.toLowerCase())}
            >
              <span className="icon">{item.icon}</span>
              <span className="text">{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;