import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { getAllRooms } from "../../services/RoomService";
import { RoomStatusMapper } from "../utils/RoomStatusMapper";
import { SearchIcon } from "lucide-react";

export const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  // Fetch all rooms
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await getAllRooms();
      setRooms(res);
      setFilteredRooms(res); // initialize the filtered rooms
    } catch (err) {
      console.log(err);
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Filtering logic (search + status combined)
  useEffect(() => {
    let filtered = [...rooms]; // keep all the rooms

    if (statusFilter !== "ALL") {
      filtered = filtered.filter((room) => room.status === statusFilter); // if the status is not ALL then return the filtered rooms
    }

    // handles empyt + NaN search query
    if (searchQuery !== "" && !isNaN(searchQuery)) {
      filtered = filtered.filter(
        (room) =>
          room.roomNumber === Number(searchQuery) ||
          room.floorNumber === Number(searchQuery)
      );
    }

    setFilteredRooms(filtered);
  }, [rooms, statusFilter, searchQuery]);

  // Handle filter buttons
  const handleRoomsFilter = (filter) => {
    setStatusFilter(filter);
  };

  // Handle search input change
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value); // Keep as string for empty handling
  };

  const filters = [
    { id: 1, name: "All", value: "ALL" },
    { id: 2, name: "Available", value: "AVAILABLE" },
    { id: 3, name: "Suspended", value: "SUSPENDED" },
    { id: 4, name: "Unavailable", value: "UNAVAILABLE" },
    { id: 5, name: "Out of Stock", value: "OUT_OF_STOCK" },
  ];

  return (
    <Paper
      elevation={4}
      sx={{ p: 3, mt: 4, borderRadius: 4, background: "#fafafa" }}
    >
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", mb: 2, flexWrap: "wrap" }}
      >
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
          <TextField
            size="small"
            placeholder="Search by Room N° or Floor N°"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            InputProps={{
              startAdornment: <SearchIcon style={{ marginRight: "8px" }} />,
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
                size="small"
                variant={statusFilter === f.value ? "contained" : "outlined"}
                sx={{ borderRadius: 3, textTransform: "none", fontWeight: 500 }}
                onClick={() => handleRoomsFilter(f.value)}
              >
                {f.name}
              </Button>
            ))}
          </Box>

          <Tooltip title="Add new room">
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 3, textTransform: "none", fontWeight: 500 }}
            >
              Add
            </Button>
          </Tooltip>
        </Box>
      </Toolbar>

      {loading && <CircularProgress />}
      {!loading && error && <p className="text-center text-danger">{error}</p>}
      {!loading && rooms.length === 0 && <p className="text-center">No Rooms found</p>}
      {!loading && rooms.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room N°</TableCell>
              <TableCell>Floor N°</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Available Places</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRooms.map((r) => (
              <TableRow key={r.roomId}>
                <TableCell>{r.roomNumber}</TableCell>
                <TableCell>{r.floorNumber}</TableCell>
                <TableCell>{r.capacity}</TableCell>
                <TableCell>{r.availablePlaces}</TableCell>
                <TableCell>
                  {(() => {
                    const { label, bgColor } = RoomStatusMapper(r.status);
                    return <Chip label={label} color={bgColor} />;
                  })()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};
