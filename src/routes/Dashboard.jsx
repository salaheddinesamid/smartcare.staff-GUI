import React, { useState } from "react";
import "../style/Dashboard.css";
import logo from "../assets/logo.jpg";
import { Overview } from "../components/Overview";
import { AppointmentManagement } from "../components/AppointmentManagement";
import { NotificationBell } from "../components/NotificationBell";
import { Profile } from "../components/Profile";
import { PatientManagement } from "../components/PatientManagement";
import { MedicineInventory } from "../components/MedicineInventory";
import { Ambulance, ClipboardClock, FlaskConical, Landmark, LayoutDashboard, MessageSquareMore, Pill, Stethoscope } from "lucide-react";

export const Dashboard = () => {
  const services = [
    { id: 1, name: "Overview", view: <Overview />, icon:<LayoutDashboard /> },
    { id: 2, name: "Appointments", view: <AppointmentManagement />, icon:<ClipboardClock /> },
    { id: 3, name: "Patients" , view: <PatientManagement/>, icon:<Stethoscope />},
    { id: 4, name: "Medicine Inventory", view: <MedicineInventory/> , icon:<Pill />},
    { id: 5, name: "Laboratory" , view: <></>, icon: <FlaskConical />},
    { id: 6, name: "Billing & Invoices" ,view: <></>, icon : <Landmark />},
    { id: 7, name: "Chats" ,view: <></>, icon : <MessageSquareMore />},
    { id: 8, name: "Emergency" ,view: <></>, icon : <Ambulance />},
  ];

  const [active, setActive] = useState(1);

  return (
    <div className="d-flex" style={{height : "100vh"}}>
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
                className={`sidebar-btn ${active === service.id ? "active" : ""} pe-2`}
                onClick={() => setActive(service.id)}
              >
                {service.icon} 
                {service.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="right-side">
        <div className="dashboard-header">
          <h2>{services.find((s) => s.id === active)?.name}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <NotificationBell />
            <Profile />
            <button className="logout-btn">Log Out</button>
          </div>
        </div>

        <div className="dashboard-content">
          {services.find((s) => s.id === active)?.view}
        </div>
      </div>
    </div>
  );
};
