import { createTheme } from "@mui/material/styles";

export function buildTheme(mode = "light") {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,

      primary: { main: isDark ? "#8B5CF6" : "#2563eb" },
      secondary: { main: isDark ? "#3B82F6" : "#7C3AED" },

      background: {
        default: isDark ? "#0B1220" : "#F6F7FB",
        paper: isDark ? "#0F1A2E" : "#FFFFFF",
      },

      text: {
        primary: isDark ? "#E8EEFF" : "#0F172A",
        secondary: isDark ? "rgba(232,238,255,0.72)" : "rgba(15,23,42,0.72)",
      },

      divider: isDark ? "rgba(232,238,255,0.10)" : "rgba(15,23,42,0.10)",
    },

    shape: { borderRadius: 14 },

    typography: {
      fontFamily: ["Inter", "Roboto", "system-ui", "Arial"].join(","),
    },

    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: isDark
              ? "linear-gradient(90deg, rgba(139,92,246,0.45), rgba(59,130,246,0.35))"
              : "linear-gradient(90deg, rgba(124,58,237,0.95), rgba(37,99,235,0.95))",
            backdropFilter: "blur(10px)",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: isDark
              ? "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))"
              : "none",
            border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(15,23,42,0.08)",
          },
        },
      },

      MuiCssBaseline: {
    styleOverrides: {
      html: {
        scrollbarWidth: "none", 
      },
      "body::-webkit-scrollbar": {
        display: "none", 
      },
    },
  },

      MuiButton: {
        styleOverrides: {
          root: { textTransform: "none" },
        },
      },
    },
  });
}
