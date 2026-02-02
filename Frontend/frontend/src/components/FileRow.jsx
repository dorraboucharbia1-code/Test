import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DownloadIcon from "@mui/icons-material/Download";

import { getDownloadUrl } from "../api/filesApi.js";

function formatBytes(bytes) {
  if (bytes == null) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let n = bytes;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i += 1;
  }
  return `${n.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString();
}

export default function FileRow({ file, onToast }) {
  const [downloading, setDownloading] = React.useState(false);

  async function handleDownload() {
    const url = getDownloadUrl(file.name);

    try {
      setDownloading(true);

      onToast?.({ severity: "info", message: "Téléchargement en cours..." });

      await new Promise((r) => setTimeout(r, 1200));

      const res = await fetch(url);

      if (!res.ok) {
        let msg = `Erreur téléchargement (HTTP ${res.status})`;
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
        } catch {
        }
        onToast?.({ severity: "error", message: msg });
        return;
      }

      const blob = await res.blob();

      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);

      onToast?.({ severity: "success", message: `Téléchargé: ${file.name}` });
    } catch (e) {
      onToast?.({
        severity: "error",
        message: "Erreur réseau pendant le téléchargement",
      });
    } finally {
      setDownloading(false);
    }
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 2, py: 1.2 }}>
      <InsertDriveFileOutlinedIcon color="action" />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography noWrap sx={{ fontWeight: 800 }}>
          {file.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {formatBytes(file.size)}
          {file.lastModified ? ` • ${formatDate(file.lastModified)}` : ""}
        </Typography>
      </Box>

      <Tooltip title="Télécharger">
        <span>
          <IconButton
            aria-label="download"
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? <CircularProgress size={22} /> : <DownloadIcon />}
          </IconButton>
        </span>
      </Tooltip>
    </Stack>
  );
}
