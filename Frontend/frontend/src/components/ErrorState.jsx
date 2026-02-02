import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export default function ErrorState({ message, onRetry }) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Alert severity="error" variant="filled">
          Erreur
        </Alert>
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
        <Button variant="contained" onClick={onRetry}>
          Réessayer
        </Button>
      </Stack>
    </Paper>
  );
}