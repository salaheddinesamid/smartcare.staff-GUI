import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { EquipmentMapper } from "../utils/EquipmentUtils";
import { fetchEquipments } from "../../services/RoomService";

export const NewRoomDialog = ({ open, onClose, onSuccess }) => {
  const [requestDto, setRequestDto] = useState({
    roomNumber: "",
    floorNumber: "",
    capacity: "",
    roomType: "",
    equipments: [],
    availablePlaces: "",
    status: "",
    availableIn: "",
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestDto((prev) => ({ ...prev, [name]: value }));
  };

  const clearDto = ()=>{
    setRequestDto({
      roomNumber: "",
      floorNumber: "",
      capacity: "",
      roomType: "",
      equipments: [],
      availablePlaces: "",
      status: "",
      availableIn: ""
    })
  }

  const [equipmentList, setEquipmentList] = useState([]);
  const [equipmentLoading, setEquipmentLoading] = useState(false);
  const [equipmentError, setEquipmentError] = useState("");

  useEffect(() => {
    if (open) loadEquipments();
  }, [open]);

  const loadEquipments = async () => {
    try {
      setEquipmentLoading(true);
      const data = await fetchEquipments();
      setEquipmentList(data);
      console.log(data);
    } catch (err) {
      setEquipmentError(err.message);
    } finally {
      setEquipmentLoading(false);
    }
  };

  /**
   * 
   * @param {*} e 
   */
  const handleEquipmentSelect = (e) => {
    const { value } = e.target;
    setRequestDto((prev) => ({
      ...prev,
      equipments: value, // value is already an array of IDs
    }))
  };

  /**
   * 
   */
  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log("SUBMITTING NEW ROOM:", requestDto);

      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{ fontWeight: 700, textAlign: "center", pb: 1, fontSize: "1.3rem" }}
      >
        Add New Room
      </DialogTitle>

      {loading ? (
        <Box sx={{ py: 5, textAlign: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Room Number"
              name="roomNumber"
              type="number"
              value={requestDto.roomNumber}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Floor Number"
              name="floorNumber"
              type="number"
              value={requestDto.floorNumber}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Capacity"
              name="capacity"
              type="number"
              value={requestDto.capacity}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Available Places"
              name="availablePlaces"
              type="number"
              value={requestDto.availablePlaces}
              onChange={handleChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Room Type</InputLabel>
              <Select
                name="roomType"
                value={requestDto.roomType}
                onChange={handleChange}
                label="Room Type"
              >
                <MenuItem value="SINGLE">Single</MenuItem>
                <MenuItem value="DOUBLE">Double</MenuItem>
                <MenuItem value="VIP">VIP</MenuItem>
                <MenuItem value="SUITE">Suite</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={requestDto.status}
                onChange={handleChange}
                label="Status"
              >
                <MenuItem value="AVAILABLE">Available</MenuItem>
                <MenuItem value="UNAVAILABLE">Unavailable</MenuItem>
                <MenuItem value="SUSPENDED">Suspended</MenuItem>
                <MenuItem value="OUT_OF_STOCK">Out of Stock</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Equipments</InputLabel>

              {equipmentLoading ? (
                <CircularProgress size={20} sx={{ ml: 2, mt: 1 }} />
              ) : (
                <Select
                  multiple
                  value={requestDto?.equipments || []}
                  name="equipments"
                  onChange={handleEquipmentSelect}
                  input={<OutlinedInput label="Equipments" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {selected.map((id) => {
                        const eq = equipmentList.find((e) => e.equipmentId === id);
                        return (
                          <Chip key={id} label={eq ? EquipmentMapper(eq) : id} size="small"/>
                        );
                      })}
                    </Box>
                  )}
                >
                  {equipmentList.map((e) => (
                    <MenuItem key={e.equipmentId} value={e.equipmentId}>
                      {EquipmentMapper(e)}
                    </MenuItem>
                  ))}
                </Select>
              )}

              {equipmentError && (
                <p style={{ color: "red", marginTop: 5 }}>{equipmentError}</p>
              )}
            </FormControl>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={()=>{
                clearDto();
                onClose();
              }}
              variant="outlined"
              sx={{ textTransform: "none", borderRadius: 2 }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", borderRadius: 2, fontWeight: 600 }}
            >
              Confirm
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
