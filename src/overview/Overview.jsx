import React, { useEffect, useState } from "react";
import "../style/Overview.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Card } from "./Card";
import { getAllDoctorAppointmentsByDate } from "../services/AppointmentService";
import { AppointmentStarter } from "../appointments/components/AppointmentStarter";

export const Overview = () => {
  const user = { doctorId: 1 }; // Replace with actual logged-in user later
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const stats = {
    appointments: 128,
    patients: 540,
    labTests: 320,
  };

  const activityCards = [
    {
      id: 1,
      title: "Total Appointments",
      data: stats.appointments,
      backgroundColor: "#e3f2fd",
      borderLeft: "5px solid #42a5f5",
    },
    {
      id: 2,
      title: "Total Patients",
      data: stats.patients,
      backgroundColor: "#e0f2f1",
      borderLeft: "5px solid #26a69a",
    },
    {
      id: 3,
      title: "Lab Tests",
      data: stats.labTests,
      backgroundColor: "#ede7f6",
      borderLeft: "5px solid #7e57c2",
    },
  ];

  const fetchTodaysAppointments = async () => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split("T")[0];
      const appointments = await getAllDoctorAppointmentsByDate(user.doctorId, today);
      setDoctorAppointments(appointments || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodaysAppointments();
  }, []);

  const TodaysAppointments = () => (
    <Paper
      elevation={3}
      className="p-4 rounded-4 shadow-sm"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#1565c0" }}>
          Upcoming Appointments
        </Typography>
      </div>

      {loading ? (
        <div className="text-center p-4">
          <CircularProgress size={30} />
          <Typography variant="body2" color="textSecondary" className="mt-2">
            Loading appointments...
          </Typography>
        </div>
      ) : doctorAppointments.length === 0 ? (
        <Typography variant="body2" color="textSecondary" className="text-center p-3">
          No appointments scheduled for today.
        </Typography>
      ) : (
        <div className="table-responsive">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Patient Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Start Time</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctorAppointments.map((appointment, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{
                    transition: "0.2s",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell>{appointment.patientName || "Unknown"}</TableCell>
                  <TableCell>{appointment.startTime || "—"}</TableCell>
                  <TableCell>
                    <AppointmentStarter appointmentId={appointment?.appointmentId} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Paper>
  );

  return (
    <div className="overview-container p-3">
      <div className="row g-4">
        <div className="col-xl-5 col-lg-12">
          <Paper elevation={3} className="p-4 rounded-4 shadow-sm">
            <Typography
              variant="h6"
              className="text-center fw-bold mb-3"
              sx={{ color: "#1565c0" }}
            >
              Activity Overview
            </Typography>
            <div className="d-flex flex-column gap-3">
              {activityCards.map((card) => (
                <div
                  key={card.id}
                  className="p-3 rounded-3"
                  style={{
                    backgroundColor: card.backgroundColor,
                    borderLeft: card.borderLeft,
                    transition: "all 0.3s ease",
                  }}
                >
                  <h6 className="fw-bold mb-1">{card.title}</h6>
                  <h4 className="fw-bolder">{card.data}</h4>
                </div>
              ))}
            </div>
          </Paper>
        </div>
        <div className="col-xl-7 col-lg-12">
          <TodaysAppointments />
        </div>
      </div>
    </div>
  );
};
