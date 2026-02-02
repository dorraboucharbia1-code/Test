from datetime import datetime, timezone
from pathlib import Path

from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

BASE_DIR = Path(__file__).resolve().parent
FILES_DIR = BASE_DIR / "files"

app = Flask(__name__)
CORS(app)  

@app.get("/api/files")
def list_files():
    FILES_DIR.mkdir(exist_ok=True)

    items = []
    for p in FILES_DIR.iterdir():
        if p.is_file():
            stat = p.stat()
            last_modified = datetime.fromtimestamp(stat.st_mtime, tz=timezone.utc).isoformat()
            items.append({
                "name": p.name,
                "size": stat.st_size,
                "lastModified": last_modified,
            })

    items.sort(key=lambda x: x["name"].lower())
    return jsonify(items)

@app.get("/download/<path:name>")
def download_file(name):
    target = FILES_DIR / name
    if not target.exists() or not target.is_file():
        return jsonify({"error": "File not found"}), 404

    return send_from_directory(FILES_DIR, name, as_attachment=True)  

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)  