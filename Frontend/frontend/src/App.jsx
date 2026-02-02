import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import HomePage from "./pages/HomePage.jsx";
import { buildTheme } from "./theme/theme.js";

export default function App() {
  const [mode, setMode] = React.useState("light");
  const theme = React.useMemo(() => buildTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomePage mode={mode} setMode={setMode} />
    </ThemeProvider>
  );
}