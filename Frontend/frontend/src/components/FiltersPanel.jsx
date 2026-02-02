import React from "react";
import {
  Paper,
  Stack,
  Box,
  Typography,
  Divider,
  FormControl,
  FormLabel,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Slider,
  Button,
} from "@mui/material";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

export default function FiltersPanel({
  type,
  setType,
  period,
  setPeriod,
  sizeRange,
  setSizeRange,
  onReset,
}) {
  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
      <Stack spacing={1.75}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            Filtres
          </Typography>

          <Button
            variant="text"
            startIcon={<RestartAltRoundedIcon />}
            onClick={onReset}
            sx={{ fontWeight: 800 }}
          >
            Reset
          </Button>
        </Box>

        <Divider />

        <FormControl>
          <FormLabel sx={{ mb: 1 }}>Type de fichier</FormLabel>
          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={(_, v) => v && setType(v)}
            size="small"
            fullWidth
          >
            <ToggleButton value="all">Tous</ToggleButton>
            <ToggleButton value="pdf">PDF</ToggleButton>
            <ToggleButton value="image">Images</ToggleButton>
            <ToggleButton value="other">Autres</ToggleButton>
          </ToggleButtonGroup>
        </FormControl>

        <Divider />

        <FormControl>
          <FormLabel sx={{ mb: 1 }}>Période</FormLabel>
          <ToggleButtonGroup
            value={period}
            exclusive
            onChange={(_, v) => v && setPeriod(v)}
            size="small"
            fullWidth
          >
            <ToggleButton value="any">Tout</ToggleButton>
            <ToggleButton value="7d">7j</ToggleButton>
            <ToggleButton value="30d">30j</ToggleButton>
            <ToggleButton value="365d">1 an</ToggleButton>
          </ToggleButtonGroup>
        </FormControl>

        <Divider />

        <FormControl>
          <FormLabel sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
            Taille (MB)
            <Chip
              size="small"
              label={`${sizeRange[0]}–${sizeRange[1]} MB`}
              color="primary"
              variant="outlined"
            />
          </FormLabel>

          <Slider
            value={sizeRange}
            onChange={(_, v) => setSizeRange(v)}
            valueLabelDisplay="auto"
            min={0}
            max={100}
            step={1}
          />
        </FormControl>
      </Stack>
    </Paper>
  );
}
