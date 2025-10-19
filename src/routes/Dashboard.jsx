import React, { useState } from "react";
import "../style/Dashboard.css";
import logo from "../assets/logo.jpg";
import { Overview } from "../components/Overview";
import { AppointmentManagement } from "../components/AppointmentManagement";
import { NotificationBell } from "../components/NotificationBell";
import { Profile } from "../components/Profile";
import { PatientManagement } from "../components/PatientManagement";

export const Dashboard = () => {
  const services = [
    { id: 1, name: "Overview", view: <Overview /> },
    { id: 2, name: "Appointments", view: <AppointmentManagement /> },
    { id: 3, name: "Patients" , view: <PatientManagement/>},
    { id: 4, name: "Medicine Inventory" },
    { id: 5, name: "Laboratory" },
    { id: 6, name: "Billing & Invoices" },
  ];

  const [active, setActive] = useState(1);

  return (
    <div className="row" style={{height : "100vh"}}>
      <div className="left-side">
        <div>
          <div className="left-side-header">
            <img src={logo} alt="Logo" className="logo" />
            <h4 style={{ marginTop: "10px", color: "#1565c0" }}>SmartCare</h4>
          </div>

          <div className="left-side-content">
            {services.map((service) => (
              <button
                key={service.id}
                className={`sidebar-btn ${active === service.id ? "active" : ""}`}
                onClick={() => setActive(service.id)}
              >
                {service.name}
              </button>
            ))}
          </div>
        </div>

        <div className="logout-section">
          <button className="logout-btn">Log Out</button>
        </div>
      </div>

      <div className="right-side">
        <div className="dashboard-header">
          <h2>{services.find((s) => s.id === active)?.name}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <NotificationBell />
            <Profile />
          </div>
        </div>

        <div className="dashboard-content">
          {services.find((s) => s.id === active)?.view}
        </div>
      </div>
    </div>
  );
};
