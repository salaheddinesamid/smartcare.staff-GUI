import React from "react";
import "../style/Overview.css";
import { FaUserInjured, FaVials, FaCalendarCheck } from "react-icons/fa";
import { data } from "react-router-dom";
import { Card } from "./Card";

export const Overview = () => {
  // Dummy data – replace with API calls later
  const stats = {
    appointments: 128,
    patients: 540,
    labTests: 320,
  };

  const activityCards = [
    {id : 1, title : "Total Appointments", data : stats.appointments, backgroundColor : "#90caf9"},
    {id : 2, title : "Total Patients", data : stats.patients, backgroundColor : "#b2dfdb"},
    {id : 3, title : "Lab tests", data : stats.labTests, backgroundColor : "#d1c4e9"}
  ]

  return (
    <div className="overview">
      <div className="row">
        <div className="col-xl-5">
            <div className="activity-overview">
                <div className="activity-overview-header">
                    <h4 className="text-center">Activity Overview</h4>
                </div>
                {activityCards.map((card)=>(
                    <Card details={card}/>
                ))}
            </div>
        </div>
        <div className="col-xl-7"></div>
      </div>
    </div>
  );
};
