import { httpGetJson } from "./http.js";

export function getFiles() {
  return httpGetJson("/api/files");
}

export function getDownloadUrl(fileName) {
  return `/download/${encodeURIComponent(fileName)}`;
}