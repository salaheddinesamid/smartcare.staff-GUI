import React, { use, useEffect, useState } from "react";
import "../style/Overview.css";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material"
import { Card } from "./Card";
import { getAllDoctorAppointmentsByDate } from "../services/AppointmentService";
import { AppointmentStarter } from "./AppointmentStarter";

export const Overview = () => {
  // Dummy data – replace with API calls later

  const user = null;
  const stats = {
    appointments: 128,
    patients: 540,
    labTests: 320,
  };

  const activityCards = [
    {id : 1, title : "Total Appointments", data : stats.appointments, backgroundColor : "#90caf9"},
    {id : 2, title : "Total Patients", data : stats.patients, backgroundColor : "#b2dfdb"},
    {id : 3, title : "Lab tests", data : stats.labTests, backgroundColor : "#d1c4e9"}
  ];

  const [doctorAppointments,setDoctorAppointments] = useState([{}]);

  const fetchTodaysAppointments = async()=>{
    try{
      const today = new Date();
      const localDate = today.toISOString().split('T')[0];
      const doctorId = user && user.doctorId;
      const appointments = getAllDoctorAppointmentsByDate(doctorId,localDate);
      setDoctorAppointments(appointments);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    //fetchTodaysAppointments();
  },[])

  const TodaysAppointments = ({data})=>{
    return(
      <div className="todays-appointments">
        <div className="row">
          <h3>Upcoming Appointments</h3>
        </div>
        <div className="row">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Start Session</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctorAppointments.length !== 0 ? 
              <>
                {doctorAppointments.map((appointment)=>(
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell><AppointmentStarter appointmentId={appointment?.appointmentId}/></TableCell>
                  </TableRow>
                ))}
              </>
              : ""}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  useEffect(()=>{

  },[])

  return (
    <div className="overview">
      <div className="row" style={{width : "100%"}}>
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
        <div className="col-xl-7">
          <TodaysAppointments/>
        </div>
      </div>
    </div>
  );
};
