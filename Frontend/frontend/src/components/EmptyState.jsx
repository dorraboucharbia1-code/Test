import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

export default function EmptyState() {
  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack spacing={1} alignItems="center">
        <InsertDriveFileOutlinedIcon color="disabled" sx={{ fontSize: 46 }} />
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Aucun fichier
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Le serveur n'a retourné aucun fichier.
        </Typography>
      </Stack>
    </Paper>
  );
}