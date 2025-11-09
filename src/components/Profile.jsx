import { Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <div
      className="profile-container d-flex align-items-center px-2 py-1 rounded-3 shadow-sm"
      style={{
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onClick={handleOpenMenu}
    >
      <Avatar
        sx={{
          bgcolor: "#1565c0",
          fontWeight: "bold",
          marginRight: "10px",
        }}
      >
        S
      </Avatar>
      <div className="d-flex flex-column">
        <span style={{ fontWeight: 600, color: "#333", fontSize: "0.9rem" }}>
          Salaheddine Samid
        </span>
        <span style={{ color: "#1565c0", fontSize: "0.8rem" }}>Doctor</span>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 4,
          sx: { borderRadius: 3, mt: 1 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>View Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Settings</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
