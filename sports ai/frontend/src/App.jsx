import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import "./styles/dashboard.css";

function App() {
  const [activePage, setActivePage] = useState("running");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`dashboard-layout ${sidebarCollapsed ? "collapsed" : ""}`}>
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div className="logo">Sports AI Dashboard</div>
        </header>

        {/* Page Content */}
        <Dashboard sport={activePage} />
      </div>
    </div>
  );
}

export default App;