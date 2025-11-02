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
  TextField,
  Toolbar,
  Tooltip,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { getAllMedicines } from "../services/PharmacyService";
import { NewMedicineDialog } from "./dialog/NewMedicineDialog";

export const MedicineInventory = () => {
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [addNewMedicineDialogOpen, setAddNewMedicineDialogOpen] = useState(false);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const res = await getAllMedicines();
      setMedicines(res?.data || []);
      setFilteredMedicines(res?.data || []);
    } catch (err) {
      console.error("Failed to fetch medicines", err);
      setError("Unable to load medicine inventory");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewMedicineDialog = () => setAddNewMedicineDialogOpen(true);
  const handleCloseDialog = () => setAddNewMedicineDialogOpen(false);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredMedicines(
      medicines.filter(
        (m) =>
          m.medicineName.toLowerCase().includes(query) ||
          m.referenceNumber.toLowerCase().includes(query)
      )
    );
  };

  const handleMedicineAdded = (newMedicine) => {
    setMedicines((prev) => [newMedicine, ...prev]);
    setFilteredMedicines((prev) => [newMedicine, ...prev]);
  };

  useEffect(() => {
    fetchMedicines();
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
          mb: 2,
          flexWrap: "wrap",
        }}
      >

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            size="small"
            placeholder="Search by name or Ref N°"
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              width: { xs: "100%", sm: 250 },
            }}
          />
          <Tooltip title="Add new medicine">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddNewMedicineDialog}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Add
            </Button>
          </Tooltip>
        </Box>
      </Toolbar>

      {loading && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" align="center" sx={{ py: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              {[
                "Medicine Name",
                "Ref N°",
                "Available Quantity",
                "Manufacturing Date",
                "Expiration Date",
                "Status",
              ].map((header) => (
                <TableCell key={header} sx={{ color: "white", fontWeight: 600 }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMedicines.length > 0 ? (
              filteredMedicines.map((medicine) => (
                <TableRow
                  key={medicine.referenceNumber}
                  hover
                  sx={{
                    transition: "0.2s",
                    "&:hover": { backgroundColor: "#f0f4ff" },
                  }}
                >
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
                    sx={{
                      color:
                        medicine.status === "AVAILABLE"
                          ? "green"
                          : medicine.status === "EXPIRED"
                          ? "red"
                          : "orange",
                      fontWeight: 600,
                    }}
                  >
                    {medicine.status}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <Typography color="text.secondary">
                    No medicines found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <NewMedicineDialog
        open={addNewMedicineDialogOpen}
        onClose={handleCloseDialog}
        onMedicineAdded={handleMedicineAdded}
      />
    </Paper>
  );
};
