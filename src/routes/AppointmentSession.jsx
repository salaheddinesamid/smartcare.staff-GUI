import { useEffect, useState } from "react";
import { endAppointmentSession, startAppointment } from "../services/AppointmentService";
import { useLocation } from "react-router-dom";
import {
  Paper,
  Typography,
  Button,
  LinearProgress,
  Box,
  Stack,
} from "@mui/material";
import { NewPrescriptionDialog } from "../appointments/dialog/NewPrescriptionDialog";

export const AppointmentSession = () => {
  const location = useLocation();


  const appointment = location?.state?.appointmentDetails || MockAppointment;

  const [timeLeft, setTimeLeft] = useState(
    location?.state?.duration || appointment.duration
  );

  const handleEndSession = async()=>{
    try{
        const id = appointment?.appointmentId;
        const res = await endAppointmentSession(id);
    }catch(err){
        console.error(err);
    }
  }

  // start session API call
  useEffect(() => {
    const startSession = async () => {
      try {
        await startAppointment(appointment.id);
        console.log("Session started successfully");
      } catch (error) {
        console.error("Error starting session:", error);
      }
    };
    startSession();
  }, [appointment.id]);

  // timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    // if the time is over, end the session
    if (timeLeft === 0) handleEndSession();
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 60000); // decrease every minute
    return () => clearInterval(timer);
  }, [timeLeft]);

  const progress = (timeLeft / appointment.duration) * 100;

  return (
    <Paper
      elevation={5}
      sx={{
        p: 4,
        m: 3,
        borderRadius: 3,
        backgroundColor: "#f4f6f8",
        maxWidth: "700px",
        margin: "40px auto",
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center" }}>
          Appointment Session
        </Typography>

        <Box>
          <Typography variant="subtitle1">
            <strong>Doctor:</strong> {appointment.doctorName}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Patient:</strong> {appointment.patientName}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Start:</strong>{" "}
            {new Date(appointment.startDate).toLocaleString()}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Duration:</strong> {appointment.duration} minutes
          </Typography>
        </Box>

        <Box sx={{ width: "100%" }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Time Left: {timeLeft} minute(s)
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: progress > 50 ? "#4caf50" : "#f44336",
              },
            }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => alert("Session extended +10 minutes")}
          >
            Extend +10 min
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => alert("Session ended")}
          >
            End Session
          </Button>
        </Box>
      </Stack>
      <NewPrescriptionDialog open={false}/>
    </Paper>
  );
};
