import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function AppHeader({ mode, onToggleMode }) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (t) => t.zIndex.drawer + 1,
        backgroundImage: (t) =>
          t.palette.mode === "dark"
            ? "linear-gradient(90deg, rgba(139,92,246,0.45), rgba(59,130,246,0.35))"
            : "linear-gradient(90deg, rgba(124,58,237,0.95), rgba(37,99,235,0.95))",
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar sx={{ minHeight: 72 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Téléchargeur de fichiers
        </Typography>

        <Box sx={{ flex: 1 }} />

        <Tooltip title={mode === "dark" ? "Passer en clair" : "Passer en sombre"}>
          <IconButton color="inherit" onClick={onToggleMode}>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
