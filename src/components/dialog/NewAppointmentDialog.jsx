import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Box,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";

export const NewAppointmentDialog = ({ open, onClose }) => {
  const [patient, setPatient] = useState(null);
  const [newAppointmentDto, setNewAppointmentDto] = useState({
    patientId: patient?.id || null,
    patientNationalId: "",
    doctorId: null,
    appointmentType: "",
    disease: "",
    startDate: "",
    prescription: null,
  });

  const diseaseList = [
    { id: 1, name: "Diabetes" },
    { id: 2, name: "Hypertension" },
    { id: 3, name: "Asthma" },
    { id: 4, name: "Heart Disease" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAppointmentDto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePatientSearch = () => {
    // Implement search logic here
  };

  const handleSubmit = () => {
    console.log(newAppointmentDto);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "600", color: "#1565c0" }}>
        🩺 New Appointment
      </DialogTitle>

      <DialogContent>
        <Divider sx={{ mb: 3 }} />

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <TextField
                label="Patient Full Name or National ID"
                fullWidth
                name="patientNationalId"
                value={newAppointmentDto.patientNationalId}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={handlePatientSearch}
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#1565c0",
                  textTransform: "none",
                  fontWeight: "600",
                  py: 1.2,
                  "&:hover": { backgroundColor: "#0d47a1" },
                }}
              >
                Search Patient
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={6}>
              <TextField
                select
                label="Select Disease"
                name="disease"
                value={newAppointmentDto.disease}
                onChange={handleChange}
                fullWidth
              >
                {diseaseList.map((d) => (
                  <MenuItem key={d.id} value={d.name}>
                    {d.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Start Date"
                type="date"
                name="startDate"
                value={newAppointmentDto.startDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <TextField
                label="Appointment Type"
                name="appointmentType"
                value={newAppointmentDto.appointmentType}
                onChange={handleChange}
                placeholder="e.g., Check-up, Consultation, Follow-up"
                fullWidth
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Prescription details can be added after confirming appointment.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#1565c0",
                color: "#1565c0",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#1565c0",
                  color: "white",
                },
              }}
            >
              Add Prescription
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                backgroundColor: "#1565c0",
                px: 4,
                py: 1.2,
                fontWeight: "600",
                textTransform: "none",
                "&:hover": { backgroundColor: "#0d47a1" },
              }}
            >
              Confirm Appointment
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
