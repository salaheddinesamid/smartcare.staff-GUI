import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { getAllMedicines } from "../services/PharmacyService";
import { NewMedicineDialog } from "./dialog/NewMedicineDialog";

export const MedicineInventory = () => {
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState(null);
  const [addNewMedicineDialogOpen,setAddNewMedicineDialogOpen] = useState(false);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const res = await getAllMedicines();
      setMedicines(res?.data || []);
    } catch (err) {
      console.error("Failed to fetch medicines", err);
      setError("Unable to load medicine inventory");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewMedicineDialog = ()=>{
    setAddNewMedicineDialogOpen(true);
  }

  const handleCloseDialog = ()=>{
    setAddNewMedicineDialogOpen(false);
  }

  useEffect(() => {
    fetchMedicines();
  }, []);

  return (
    <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Button onClick={handleAddNewMedicineDialog}>
            <AddIcon/>
        </Button>
      {loading && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <CircularProgress />
        </div>
      )}

      {error && (
        <Typography color="error" variant="body1" style={{ textAlign: "center" }}>
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Medicine Name</TableCell>
              <TableCell>Ref N°</TableCell>
              <TableCell>Available Quantity</TableCell>
              <TableCell>Manufacturing Date</TableCell>
              <TableCell>Expiration Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines.map((medicine) => (
              <TableRow key={medicine.referenceNumber}>
                <TableCell>{medicine.medicineName}</TableCell>
                <TableCell>{medicine.referenceNumber}</TableCell>
                <TableCell>{medicine.quantity}</TableCell>
                <TableCell>
                  {medicine.manufacturingDate
                    ? new Date(medicine.manufacturingDate).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell>
                  {medicine.expirationDate
                    ? new Date(medicine.expirationDate).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell
                  style={{
                    color:
                      medicine.status === "AVAILABLE"
                        ? "green"
                        : medicine.status === "EXPIRED"
                        ? "red"
                        : "orange",
                    fontWeight: 500,
                  }}
                >
                  {medicine.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <NewMedicineDialog open={addNewMedicineDialogOpen} onClose={handleCloseDialog}/>
    </Paper>
  );
};
