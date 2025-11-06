import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { searchMedicine } from "../../services/PharmacyService";

export const NewPrescriptionDialog = ({ open, onClose }) => {
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [prescriptionRequestDto, setPrescriptionRequestDto] = useState({
    prescriptionItems: [],
    validUntil: "",
  });

  const [prescriptionItem, setPrescriptionItem] = useState({
    medicineId: "",
    dosage: "",
    frequency: "",
    route: "",
    duration: "",
    instructions: "",
  });

  const routes = [
    { id: 1, name: "Oral", value: "ORAL" },
    { id: 2, name: "IV", value: "IV" },
    { id: 3, name: "IM", value: "IM" },
  ];

  const handleAddItem = () => {
    if (!prescriptionItem.medicineId || !prescriptionItem.dosage || !prescriptionItem.frequency) return;

    setPrescriptionRequestDto((prev) => ({
      ...prev,
      prescriptionItems: [...prev.prescriptionItems, prescriptionItem],
    }));

    setPrescriptionItem({
      medicineId: "",
      dosage: "",
      frequency: "",
      route: "",
      duration: "",
      instructions: "",
    });
    setSearchQuery("");
    setMedicines([]);
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionItem((prev) => ({ ...prev, [name]: value }));
  };
  const handleSearchMedicine = async () => { 
    try { 
        setLoading(true); 
        const response = await searchMedicine(searchQuery); 
        setMedicines(response || []); 
    } 
    catch (err) {
        console.error(err); 
    } finally { setLoading(false); } };

  const handleSelectMedicine = (medicine) => {
    setPrescriptionItem((prev) => ({
      ...prev,
      medicineId: medicine.medicineId,
    }));
    setSearchQuery(medicine.medicineName);
    setMedicines([]);
  };

  const handleDeleteItem = (index) => {
    setPrescriptionRequestDto((prev) => ({
      ...prev,
      prescriptionItems: prev.prescriptionItems.filter((_, i) => i !== index),
    }));
  };

  // ✅ Debounced search
  useEffect(() => {
  if (!searchQuery.trim()) {
    setMedicines([]);
    return;
  }

  const delayDebounce = setTimeout(() => {
    handleSearchMedicine(); // no need to pass searchQuery — it's already in scope
  }, 500); // shorter delay for better UX

  return () => clearTimeout(delayDebounce); // cleanup to avoid overlapping
}, [searchQuery]);

  const PrescriptionItemForm = () => (
    <div className="card p-3 shadow-sm border-0 mb-3 position-relative">
      <h6 className="fw-bold mb-3 text-primary">
        <i className="bi bi-prescription2 me-2"></i>New Medicine
      </h6>

      <div className="row g-2">
        <div className="col-md-8 position-relative">
          <input
            type="text"
            className="form-control"
            placeholder="Search medicine by name or reference"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {medicines.length > 0 && (
            <ul className="list-group position-absolute w-100 mt-1 shadow-sm" style={{ zIndex: 10, maxHeight: "200px", overflowY: "auto" }}>
              {medicines.map((medicine) => (
                <li
                  key={medicine.medicineId}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelectMedicine(medicine)}
                >
                  <span>{medicine.medicineName}</span>
                  <small className="text-muted">Ref: {medicine.medicineId}</small>
                </li>
              ))}
            </ul>
          )}
          {loading && (
            <div className="spinner-border text-primary spinner-border-sm position-absolute end-0 top-50 me-3"></div>
          )}
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            name="route"
            value={prescriptionItem.route}
            onChange={handleItemChange}
          >
            <option value="">Select Route</option>
            {routes.map((r) => (
              <option key={r.id} value={r.value}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="text"
            name="dosage"
            className="form-control"
            placeholder="Dosage (e.g., 500mg)"
            value={prescriptionItem.dosage}
            onChange={handleItemChange}
          />
        </div>

        <div className="col-md-4">
          <input
            type="text"
            name="frequency"
            className="form-control"
            placeholder="Frequency (e.g., 3/day)"
            value={prescriptionItem.frequency}
            onChange={handleItemChange}
          />
        </div>

        <div className="col-md-4">
          <input
            type="text"
            name="duration"
            className="form-control"
            placeholder="Duration (e.g., 7 days)"
            value={prescriptionItem.duration}
            onChange={handleItemChange}
          />
        </div>

        <div className="col-12 text-end mt-3">
          <button className="btn btn-success px-4" onClick={handleAddItem}>
            <i className="bi bi-plus-circle me-2"></i>Add Medicine
          </button>
        </div>
      </div>
    </div>
  );

  const PrescriptionSummary = () => (
    <div className="card border-0 shadow-sm p-3">
      <h6 className="fw-bold text-primary mb-3">
        <i className="bi bi-list-ul me-2"></i>Prescription Summary
      </h6>
      <div className="table-responsive">
        <Table bordered hover size="sm">
          <TableHead>
            <TableRow>
              <TableCell>Medicine</TableCell>
              <TableCell>Dosage</TableCell>
              <TableCell>Frequency</TableCell>
              <TableCell>Route</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prescriptionRequestDto.prescriptionItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted">
                  No medicines added yet
                </TableCell>
              </TableRow>
            ) : (
              prescriptionRequestDto.prescriptionItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.medicineId || "Unknown"}</TableCell>
                  <TableCell>{item.dosage}</TableCell>
                  <TableCell>{item.frequency}</TableCell>
                  <TableCell>{item.route}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteItem(index)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5" className="fw-bold text-primary">
          <i className="bi bi-clipboard-plus me-2"></i>New Prescription
        </Typography>
      </DialogTitle>
      <DialogContent>
        <PrescriptionItemForm />
        <PrescriptionSummary />
      </DialogContent>
      <DialogActions>
        <button className="btn btn-success px-4">
          <i className="bi bi-check-circle me-2"></i>Confirm
        </button>
        <button className="btn btn-outline-secondary px-4" onClick={onClose}>
          <i className="bi bi-x-circle me-2"></i>Cancel
        </button>
      </DialogActions>
    </Dialog>
  );
};
