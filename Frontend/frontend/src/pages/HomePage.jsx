import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import AppHeader from "../components/AppHeader.jsx";
import FileList from "../components/FileList.jsx";
import FiltersPanel from "../components/FiltersPanel.jsx";

const drawerWidth = 340;

export default function HomePage({ mode, setMode }) {
  const [query, setQuery] = React.useState("");
  const [toast, setToast] = React.useState(null);

  const [type, setType] = React.useState("all");
  const [period, setPeriod] = React.useState("any");
  const [sizeRange, setSizeRange] = React.useState([0, 20]);

  const resetFilters = () => {
    setType("all");
    setPeriod("any");
    setSizeRange([0, 20]);
  };

  const filters = React.useMemo(
    () => ({
      type,
      period,
      sizeMinBytes: sizeRange[0] * 1024 * 1024,
      sizeMaxBytes: sizeRange[1] * 1024 * 1024,
    }),
    [type, period, sizeRange]
  );

  return (
    <>
      <AppHeader
        mode={mode}
        onToggleMode={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
      />

      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: (t) => `1px solid ${t.palette.divider}`,
              backgroundColor: (t) => t.palette.background.paper,
              backgroundImage: (t) =>
                t.palette.mode === "dark"
                  ? "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))"
                  : "linear-gradient(180deg, rgba(255,255,255,1), rgba(246,247,251,1))",
            },
          }}
        >
          <Toolbar sx={{ minHeight: 72 }} />

          <Box sx={{ p: 2 }}>
            <FiltersPanel
              type={type}
              setType={setType}
              period={period}
              setPeriod={setPeriod}
              sizeRange={sizeRange}
              setSizeRange={setSizeRange}
              onReset={resetFilters}
            />
          </Box>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minWidth: 0,
            px: { xs: 2, md: 3 },
            pb: 4,
          }}
        >
          <Toolbar sx={{ minHeight: 72 }} />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: "100%", maxWidth: 1100 }}>
              <Paper
                elevation={0}
                variant="outlined"
                sx={{ p: { xs: 2, sm: 3 }, mt: 2 }}
              >
                <Stack spacing={2.2}>
                  <Stack spacing={0.4}>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      Fichiers disponibles
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Recherchez un fichier puis téléchargez-le.
                    </Typography>
                  </Stack>

                  <TextField
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher par nom…"
                    size="small"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <FileList query={query} filters={filters} onToast={setToast} />
                </Stack>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {toast ? (
          <Alert severity={toast.severity || "info"} variant="filled">
            {toast.message}
          </Alert>
        ) : null}
      </Snackbar>
    </>
  );
}
