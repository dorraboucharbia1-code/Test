import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FileRow from "../components/FileRow.jsx";

test("déclenche un téléchargement et affiche un toast success", async () => {
  const onToast = vi.fn();

  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    blob: async () => new Blob(["hello"], { type: "text/plain" }),
  });
  vi.stubGlobal("fetch", fetchMock);

  const createObjectURLSpy = vi
    .spyOn(URL, "createObjectURL")
    .mockReturnValue("blob:fake");
  const revokeObjectURLSpy = vi
    .spyOn(URL, "revokeObjectURL")
    .mockImplementation(() => {});
  const clickSpy = vi
    .spyOn(HTMLAnchorElement.prototype, "click")
    .mockImplementation(() => {});

  render(
    <FileRow
      file={{ name: "test.txt", size: 5, lastModified: "2026-01-01T00:00:00Z" }}
      onToast={onToast}
    />
  );

  const user = userEvent.setup();

  const btn = screen.getByRole("button", { name: /download/i });
  expect(btn).not.toBeDisabled();

  await user.click(btn);

  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalled();
  }, { timeout: 3000 });

  expect(fetchMock).toHaveBeenCalledWith("/download/test.txt");

  expect(onToast).toHaveBeenCalledWith(
    expect.objectContaining({ severity: "info" })
  );
  expect(onToast).toHaveBeenCalledWith(
    expect.objectContaining({ severity: "success" })
  );

  createObjectURLSpy.mockRestore();
  revokeObjectURLSpy.mockRestore();
  clickSpy.mockRestore();
  vi.unstubAllGlobals();
});
