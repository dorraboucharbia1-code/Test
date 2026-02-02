import app as app_module

def test_api_files_returns_list():
    client = app_module.app.test_client()
    res = client.get("/api/files")

    assert res.status_code == 200
    data = res.get_json()
    assert isinstance(data, list)

def test_download_missing_file_returns_404():
    client = app_module.app.test_client()
    res = client.get("/download/__does_not_exist__.txt")

    assert res.status_code == 404
    data = res.get_json()
    assert data["error"] == "File not found"