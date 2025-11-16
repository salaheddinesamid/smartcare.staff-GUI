import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { addNewMedicine } from "../../services/PharmacyService";

export const NewMedicineDialog = ({ open, onClose }) => {
  const [requestDto, setRequestDto] = useState({
    referenceNumber: "",
    medicineName: "",
    brandName: "",
    category: "",
    dosageForm: "",
    strength: "",
    quantity: "",
    unitPrice: "",
    batchNumber: "",
    manufacturingDate: "",
    expirationDate: "",
    supplierName: "",
    storageTemperature: "",
    prescriptionRequired: false,
    description: "",
  });

  const categories = [
    { id: 1, name: "Antibiotic", value: "ANTIBIOTIC" },
    { id: 2, name: "Analgesic" , value: "ANALGESIC"},
    { id: 3, name: "Antipyretic" ,value: "ANTIPYRETIC"},
    { id: 4, name: "Antiseptic" ,value: "ANTISEPTIC"},
    { id: 5, name: "Vaccine" ,value: "VACCINE"},
    { id: 6, name: "Supplement" ,value: "SUPPLEMENT"}
  ];

  const dosageForms = [
    { id: 1, name: "Tablet", value: "TABLET" },
    { id: 2, name: "Capsule" , value: "CAPSULE"},
    { id: 3, name: "Injection" ,value: "INJECTION"},
    { id: 4, name: "Syrup" ,value: "SYRUP"},
    { id: 5, name: "Cream" ,value: "CREAME"},
    { id: 6, name: "Ointment" ,value: "OINTMENT"}
  ];

  const dateFormatter = (date)=>{
    return new Date(date).toISOString().split('T')[0];
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRequestDto((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked
        : name === "manufacturingDate" || name === "expirationDate"
        ? dateFormatter(value)
        : value,
    }));};



  const handleSubmit = async () => {
    try {
      await addNewMedicine(requestDto);
      alert("Medicine added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding medicine:", error);
      alert("Failed to add medicine");
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md" onClose={onClose}>
      <DialogTitle>Add New Medicine</DialogTitle>
      <DialogContent>
        <div className="container mt-2">
          <div className="row mb-2">
            <div className="col">
              <input
                name="referenceNumber"
                value={requestDto.referenceNumber}
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="Reference N°"
              />
            </div>
            <div className="col">
              <input
                name="medicineName"
                value={requestDto.medicineName}
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="Medicine Name"
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col">
              <input
                name="brandName"
                value={requestDto.brandName}
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="Brand Name"
              />
            </div>
            <div className="col">
              <select
                name="category"
                value={requestDto.category}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.value}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col">
              <select
                name="dosageForm"
                value={requestDto.dosageForm}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Dosage Form</option>
                {dosageForms.map((form) => (
                  <option key={form.id} value={form.value}>
                    {form.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <input
                name="strength"
                value={requestDto.strength}
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="Strength (e.g., 500mg)"
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <input
                name="unitPrice"
                value={requestDto.unitPrice}
                onChange={handleChange}
                type="number"
                className="form-control"
                placeholder="Unit Price"
              />
            </div>
            <div className="col">
              <input
                name="quantity"
                value={requestDto.quantity}
                onChange={handleChange}
                type="number"
                className="form-control"
                placeholder="Quantity"
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col">
              <input
                name="manufacturingDate"
                value={requestDto.manufacturingDate}
                onChange={handleChange}
                type="date"
                className="form-control"
              />
            </div>
            <div className="col">
              <input
                name="expirationDate"
                value={requestDto.expirationDate}
                onChange={handleChange}
                type="date"
                className="form-control"
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <input
                name="supplierName"
                value={requestDto.supplierName}
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="Supplier Name"
              />
            </div>
            <div className="col">
              <input
                name="storageTemperature"
                value={requestDto.storageTemperature}
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="Storage Temperature"
              />
            </div>
          </div>

          <div className="row mb-2 align-items-center">
            <div className="col">
              <label>
                <input
                  type="checkbox"
                  name="prescriptionRequired"
                  checked={requestDto.prescriptionRequired}
                  onChange={handleChange}
                />{" "}
                Prescription Required
              </label>
            </div>
            <div className="col">
              <input
                name="batchNumber"
                value={requestDto.batchNumber}
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="Batch Number"
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col">
              <textarea
                name="description"
                value={requestDto.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Description"
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
