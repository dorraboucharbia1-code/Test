import React from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";

export default function LoadingState() {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={1.2}>
        <Skeleton variant="text" width="45%" height={26} />
        <Skeleton variant="rectangular" height={54} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rectangular" height={54} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rectangular" height={54} sx={{ borderRadius: 2 }} />
      </Stack>
    </Paper>
  );
}