import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Avatar,
  Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { getPatients } from "../services/PatientService";

export const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await getPatients();
      setPatients(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <Paper
      elevation={6}
      sx={{
        p: 3,
        mt: 4,
        borderRadius: 4,
        background: "#ffffff",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={700}>
          Patient Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage and view registered patients
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      ) : patients.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", py: 5 }}
        >
          No patients found
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f7fa" }}>
              <TableCell>Patient</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>National ID</TableCell>
              <TableCell>Disease</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {patients.map((patient, index) => (
              <TableRow
                key={patient.id}
                hover
                sx={{
                  backgroundColor:
                    index % 2 === 0 ? "#fafafa" : "transparent",
                }}
              >
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
                      {patient?.firstName?.[0]}
                    </Avatar>
                    <Typography fontWeight={600}>
                      {patient?.firstName} {patient?.lastName}
                    </Typography>
                  </Stack>
                </TableCell>

                <TableCell>{patient?.age ?? "-"}</TableCell>
                <TableCell>{patient?.nationalId ?? "-"}</TableCell>
                <TableCell>{patient?.disease ?? "N/A"}</TableCell>
                <TableCell>{patient?.phoneNumber ?? "N/A"}</TableCell>
                <TableCell>{patient?.email}</TableCell>

                <TableCell align="center">
                  <IconButton color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton color="secondary">
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};
