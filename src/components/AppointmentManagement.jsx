import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  Toolbar,
  Tooltip,
  TextField,
  Chip,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { NewAppointmentDialog } from "./dialog/NewAppointmentDialog";
import { AppointmentStarter } from "./AppointmentStarter";

export const AppointmentManagement = () => {
  const APPOINTMENT_SERVICE_URI = process.env.REACT_APP_APPOINTMENT_SERVICE;

  const filters = [
    { id: 1, name: "All", value: "ALL" },
    { id: 2, name: "Scheduled", value: "SCHEDULED" },
    { id: 3, name: "Completed", value: "COMPLETED" },
    { id: 4, name: "Cancelled", value: "CANCELLED" },
  ];

  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [newAppointmentDialogOpen, setNewAppointmentDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAppointments = async () => {
    let uri = `${APPOINTMENT_SERVICE_URI}/api/appointment/get_all`;
    try {
      setLoading(true);
      let res = await axios.get(uri);
      const data = res.data.data || [];
      setAppointments(data);
      setFilteredAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
    if (filter === "ALL") setFilteredAppointments(appointments);
    else setFilteredAppointments(appointments.filter((a) => a.status === filter));
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = appointments.filter(
      (a) =>
        a.doctorInformation?.firstName?.toLowerCase().includes(query) ||
        a.patientInformation?.firstName?.toLowerCase().includes(query) ||
        a.disease?.toLowerCase().includes(query)
    );
    setFilteredAppointments(filtered);
  };

  const handleAppointmentAdded = (newAppointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
    setFilteredAppointments((prev) => [newAppointment, ...prev]);
  };

  const handleOpenDialog = () => setNewAppointmentDialogOpen(true);
  const handleCloseDialog = () => setNewAppointmentDialogOpen(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        mt: 4,
        borderRadius: 4,
        background: "#fafafa",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#2d3436" }}>
          
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
          <TextField
            size="small"
            placeholder="Search doctor, patient, or disease"
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              width: { xs: "100%", sm: 280 },
            }}
          />

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {filters.map((f) => (
              <Button
                key={f.id}
                variant={currentFilter === f.value ? "contained" : "outlined"}
                size="small"
                onClick={() => handleFilterChange(f.value)}
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                {f.name}
              </Button>
            ))}
          </Box>

          <Tooltip title="Add new appointment">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
              sx={{ borderRadius: 3, textTransform: "none", fontWeight: 500 }}
            >
              New Appointment
            </Button>
          </Tooltip>
        </Box>
      </Toolbar>

      {loading ? (
        <Box sx={{ textAlign: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      ) : filteredAppointments.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Start Date</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Doctor</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Patient</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Disease</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow
                  key={appointment.id}
                  hover
                  sx={{
                    "&:hover": { backgroundColor: "#f0f4ff" },
                    transition: "2s",
                  }}
                >
                  <TableCell>
                    {new Date(appointment.startDate).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {appointment.doctorInformation?.firstName}{" "}
                    {appointment.doctorInformation?.lastName}
                  </TableCell>
                  <TableCell>
                    {appointment.patientInformation?.firstName}{" "}
                    {appointment.patientInformation?.lastName}
                  </TableCell>
                  <TableCell>{appointment.disease || "-"}</TableCell>
                  <TableCell>
                    <Chip
                      label={appointment.status}
                      color={
                        appointment.status === "COMPLETED"
                          ? "success"
                          : appointment.status === "SCHEDULED"
                          ? "info"
                          : appointment.status === "CANCELLED"
                          ? "error"
                          : "default"
                      }
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>
                    <AppointmentStarter appointmentId={appointment?.id}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ py: 5 }}
        >
          No appointments found
        </Typography>
      )}

      <NewAppointmentDialog
        open={newAppointmentDialogOpen}
        onClose={handleCloseDialog}
        onAppointmentAdded={handleAppointmentAdded}
      />
    </Paper>
  );
};
