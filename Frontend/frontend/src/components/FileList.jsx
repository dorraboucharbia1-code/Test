import React from "react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

import { getFiles } from "../api/filesApi.js";
import LoadingState from "./LoadingState.jsx";
import ErrorState from "./ErrorState.jsx";
import EmptyState from "./EmptyState.jsx";
import FileRow from "./FileRow.jsx";

function getExt(name = "") {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i + 1).toLowerCase() : "";
}

function isImageExt(ext) {
  return ["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp"].includes(ext);
}

function withinPeriod(lastModified, period) {
  if (!period || period === "any") return true;

  const d = new Date(lastModified);
  const t = d.getTime();
  if (!Number.isFinite(t)) return true;

  const now = Date.now();
  const days =
    period === "7d" ? 7 : period === "30d" ? 30 : period === "365d" ? 365 : null;

  if (!days) return true;
  return now - t <= days * 24 * 60 * 60 * 1000;
}

export default function FileList({ query, filters, onToast }) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [files, setFiles] = React.useState([]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await getFiles();
      setFiles(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.message || "Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    load();
  }, []);

  const filtered = React.useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    const type = filters?.type || "all";
    const period = filters?.period || "any";
    const minBytes = Number.isFinite(filters?.sizeMinBytes) ? filters.sizeMinBytes : 0;
    const maxBytes = Number.isFinite(filters?.sizeMaxBytes) ? filters.sizeMaxBytes : Infinity;

    return (files || []).filter((f) => {
      const name = (f?.name || "").toString();
      const size = Number(f?.size ?? 0);
      const lastModified = f?.lastModified;

      if (q && !name.toLowerCase().includes(q)) return false;

      const ext = getExt(name);
      if (type === "pdf" && ext !== "pdf") return false;
      if (type === "image" && !isImageExt(ext)) return false;
      if (type === "other" && (ext === "pdf" || isImageExt(ext))) return false;

      if (Number.isFinite(size)) {
        if (size < minBytes) return false;
        if (size > maxBytes) return false;
      }

      if (!withinPeriod(lastModified, period)) return false;

      return true;
    });
  }, [files, query, filters]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={load} />;
  if (filtered.length === 0) return <EmptyState />;

  return (
    <Paper variant="outlined" sx={{ overflow: "hidden" }}>
      <Stack divider={<Divider flexItem />}>
        {filtered.map((file) => (
          <FileRow key={file.name} file={file} onToast={onToast} />
        ))}
      </Stack>
    </Paper>
  );
}
