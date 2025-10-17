import React, { useState } from "react";
import "../style/Dashboard.css";
import logo from "../assets/logo.jpg";
import { Overview } from "../components/Overview";
import "../style/Overview.css";
import { AppointmentManagement } from "../components/AppointmentManagement";

export const Dashboard = () => {
  const services = [
    { id: 1, name: "Overview", view : <Overview/>},
    { id: 2, name: "Appointments" , view : <AppointmentManagement/>},
    { id: 3, name: "Patients" },
    { id: 4, name: "Medicine Inventory" },
    { id: 7, name : "Billing & Invoices"},
    { id: 5, name: "Laboratory" },
  ];

  const [active, setActive] = useState(1);

  const Notification = ()=>{
    return(
        <div className="row">
            <p>Notification</p>
        </div>
    )
  }

  const Profile = ()=>{
    return(
        <div className="row">
            <p>Profile</p>
        </div>
    )
  }

  return (
    <div className="row">
      <div className="col-xl-2 left-side">
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
      
      <div className="col-xl-8 right-side">
        <div className="dashboard-header d-flex">
          <div className="col-xl-10">
            {services.find((s) => s.id === active)?.name}
          </div>
          <div className="col-xl-2 d-flex">
            <div className="notification">
                <Notification/>
            </div>
            <div className="profile">
                <Profile/>
            </div>
          </div>
        </div>
        <div className="dashboard-content">
          {services.find((s) => s.id === active)?.view}
        </div>
      </div>
    </div>
  );
};
