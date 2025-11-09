import React, { useState, useEffect } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Activity, Calendar, ClipboardList, Pill } from "lucide-react";

export const AllocationRequestDetails = ({ open, onClose, allocation }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomMatches, setRoomMatches] = useState([]);

  const PatientDetails = ({ details }) => {
    const patient = details || {
      name: "John Doe",
      age: 42,
      patientId: "P-1023",
      gender: "Male",
    };

    return (
      <div
        style={{
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          padding: "10px 15px",
          marginBottom: "10px",
        }}
      >
        <Typography variant="h6">{patient.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          ID: {patient.patientId}
        </Typography>
        <Typography variant="body2">Age: {patient.age} | {patient.gender}</Typography>
      </div>
    );
  };

  const RequestDetails = () => {
    return (
      <div className="request-details">
        <div className="request-details-header d-flex justify-content-between align-items-center mb-3">
          <PatientDetails details={allocation?.patient} />
          <Chip label="High Priority" color="error" />
        </div>

        <div className="request-details-content d-flex flex-column gap-3">
          <div>
            <Typography variant="subtitle1" fontWeight="bold">
              <Calendar size={16} /> Admission Date
            </Typography>
            <Typography>{allocation?.admissionDate || "2025-11-06"}</Typography>
          </div>
          <div>
            <Typography variant="subtitle1" fontWeight="bold">
              <Pill size={16} /> Issue
            </Typography>
            <Typography>{allocation?.issue || "Diabetes Monitoring"}</Typography>
          </div>
          <div>
            <Typography variant="subtitle1" fontWeight="bold">
              <Activity size={16} /> Symptoms
            </Typography>
            <Typography>{allocation?.symptoms || "Fatigue, headache"}</Typography>
          </div>
        </div>
      </div>
    );
  };

  const RoomMatches = () => {
    useEffect(() => {
      // Simulate fetching
      const fetchRoomMatches = async () => {
        setTimeout(() => {
          setRoomMatches([
            { room: "201A", type: "ICU", beds: 1 },
            { room: "305B", type: "General", beds: 2 },
          ]);
        }, 1500);
      };
      fetchRoomMatches();
    }, []);

    return (
      <div
        style={{
          borderRadius: "10px",
          backgroundColor: "#f5f5f5",
          padding: "15px",
          height: "100%",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Rooms & Bed Matches
        </Typography>
        {roomMatches.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            Generating best matches...
          </Typography>
        ) : (
          roomMatches.map((match, index) => (
            <div
              key={index}
              onClick={() => setSelectedRoom(match.room)}
              style={{
                cursor: "pointer",
                padding: "10px",
                margin: "8px 0",
                borderRadius: "8px",
                backgroundColor:
                  selectedRoom === match.room ? "#c8e6c9" : "#fff",
                border: "1px solid #ddd",
                transition: "0.2s",
              }}
            >
              <Typography variant="subtitle1">
                Room {match.room} ({match.type})
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Beds available: {match.beds}
              </Typography>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle>
        <Typography variant="h6">
          <ClipboardList size={18} /> Request Details
        </Typography>
      </DialogTitle>

      <DialogContent>
        <div className="row">
          <div className="col-xl-8">
            <RequestDetails />
          </div>
          <div className="col-xl-4">
            <RoomMatches />
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="error">
          Deny Request
        </Button>
        <Button variant="contained" color="primary">
          Confirm and Notify Staff
        </Button>
      </DialogActions>
    </Dialog>
  );
};
