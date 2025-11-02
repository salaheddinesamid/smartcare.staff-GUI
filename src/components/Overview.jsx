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
  Chip,
  CircularProgress,
} from "@mui/material";
import { getAllDoctorAppointmentsByDate } from "../services/AppointmentService";
import { AppointmentStarter } from "./AppointmentStarter";

export const Overview = () => {
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  // For now using dummy user until authentication is wired
  const user = JSON.parse(localStorage.getItem("user")) || { doctorId: 1 };

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
      backgroundColor: "#1976d2",
      textColor: "white",
    },
    {
      id: 2,
      title: "Total Patients",
      data: stats.patients,
      backgroundColor: "#2e7d32",
      textColor: "white",
    },
    {
      id: 3,
      title: "Lab Tests",
      data: stats.labTests,
      backgroundColor: "#6a1b9a",
      textColor: "white",
    },
  ];

  const fetchTodaysAppointments = async () => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split("T")[0];
      const doctorId = user?.doctorId;

      const res = await getAllDoctorAppointmentsByDate(doctorId, today);
      setDoctorAppointments(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching today's appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodaysAppointments();
  }, []);

  const TodaysAppointments = () => (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 3,
        p: 3,
        background: "#fafafa",
        minHeight: "400px",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Upcoming Appointments
      </Typography>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <CircularProgress />
        </div>
      ) : doctorAppointments.length === 0 ? (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mt: 5 }}
        >
          No appointments scheduled for today
        </Typography>
      ) : (
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>
                Patient Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>
                Start Time
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: 600 }}>
                Start Session
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctorAppointments.map((appointment) => (
              <TableRow
                key={appointment.appointmentId}
                hover
                sx={{
                  "&:hover": { backgroundColor: "#f5f9ff" },
                  transition: "0.2s",
                }}
              >
                <TableCell>
                  {appointment.patientInformation?.firstName}{" "}
                  {appointment.patientInformation?.lastName}
                </TableCell>
                <TableCell>
                  {new Date(appointment.startDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  <Chip
                    label={appointment.status || "SCHEDULED"}
                    color={
                      appointment.status === "COMPLETED"
                        ? "success"
                        : appointment.status === "SCHEDULED"
                        ? "info"
                        : appointment.status === "CANCELLED"
                        ? "error"
                        : "default"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <AppointmentStarter appointmentId={appointment?.appointmentId} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );

  return (
    <div className="overview container-fluid" style={{ marginTop: 30 }}>
      <div className="row">
        <div className="col-xl-4 mb-4">
          <Paper
            elevation={3}
            sx={{
              borderRadius: 4,
              p: 3,
              background: "#f8fafc",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                mb: 3,
                fontWeight: 700,
                color: "#1e293b",
              }}
            >
              Activity Overview
            </Typography>
            <div
              style={{
                display: "grid",
                gap: "15px",
              }}
            >
              {activityCards.map((card) => (
                <Card key={card.id} details={card} />
              ))}
            </div>
          </Paper>
        </div>

        <div className="col-xl-8">
          <TodaysAppointments />
        </div>
      </div>
    </div>
  );
};

export const Card = ({ details }) => {
  return (
    <div
      className="stat-card"
      style={{
        backgroundColor: details.backgroundColor,
        color: details.textColor,
        borderRadius: "20px",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "0.3s",
      }}
    >
      <div className="stat-info">
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {details.title}
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mt: 1, letterSpacing: 0.5 }}
        >
          {details.data}
        </Typography>
      </div>
    </div>
  );
};
