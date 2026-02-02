import React from "react";
import { render, screen } from "@testing-library/react";
import FileList from "../components/FileList.jsx";
import { getFiles } from "../api/filesApi.js";

vi.mock("../api/filesApi.js", () => ({
  getFiles: vi.fn(),
}));

test("affiche ErrorState (Erreur + Réessayer) quand le chargement échoue", async () => {
  getFiles.mockRejectedValueOnce(new Error("HTTP 500")); // erreur API [web:816]

  render(
    <FileList
      query=""
      filters={{ type: "all", period: "any", sizeMinBytes: 0, sizeMaxBytes: Infinity }}
      onToast={() => {}}
    />
  );

  expect(await screen.findByText(/erreur/i)).toBeInTheDocument();
  expect(await screen.findByRole("button", { name: /réessayer/i })).toBeInTheDocument();
});
