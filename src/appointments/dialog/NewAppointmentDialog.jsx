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
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { searchPatientsByName } from "../../services/PatientService";

export const NewAppointmentDialog = ({ open, onClose }) => {
  const [patient, setPatient] = useState(null);

  const [patients,setPatients] = useState([]);
  const [patientNameSearch,setPatientNameSearch] = useState("");
  const [loadingPatients,setLoadingPatients] = useState(false);


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

  const appointmentTypes = [
    { id: 1, name: "Consulation", value: "CONSULTATION"}
  ]

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAppointmentDto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // This function will handle patient search
  const handlePatientSearch = () => {
    // Implement search logic here

    try{
      //const response = await get
    }catch(err){

    }
    finally{

    }
  };

  const handleSubmit = () => {
    console.log(newAppointmentDto);
    onClose();
  };

  // This function will render the results of searched patients
  const SearchedPatients = ()=>{
    return(
      <div className="row">

      </div>
    )
  }

  // Debounced search effect:
  useEffect(()=>{
    const delayDebounce = setTimeout(()=>{
      if(patientNameSearch.trim().length > 0){
      handlePatientSearch(patientNameSearch);
    }else{
      setPatients([]);
    }
    },500);

    return ()=> clearTimeout(delayDebounce);
  },[patientNameSearch])

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
          <div className="row" style={{margin : "4px"}}>
            <div className="col">
              <TextField
                label="Patient Full Name or National ID"
                fullWidth
                name="patientNationalId"
                value={newAppointmentDto.patientNationalId}
                onChange={handleChange}
                variant="outlined"
              />
            </div>
            <div className="col">
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
            </div>
          </div>
          <div className="row" style={{margin : "4px"}}>
            <div className="col">
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
            </div>
            <div className="col">
              <TextField
                label="Start Date"
                type="date"
                name="startDate"
                value={newAppointmentDto.startDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>

          <div className="row" style={{margin : "4px"}}>
            <div className="col">
              <TextField
                select
                label="Appointment Type"
                name="appointmentType"
                value={newAppointmentDto.appointmentType}
                onChange={handleChange}
                fullWidth
              >
                {appointmentTypes.map((t) => (
                  <MenuItem key={t.id} value={t.value}>
                    {t.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="col"></div>
          </div>

          { /**
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
          </Grid> */}
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
