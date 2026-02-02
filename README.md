# téléchargeur de fichiers (React + Flask)

Application web permettant de lister et télécharger des fichiers depuis un dossier côté serveur, avec une UI/UX soignée (Material UI), recherche par nom et filtres (type, période, taille).

## Fonctionnalités

Frontend (React + Vite + MUI)
- Affichage de la liste des fichiers (nom, taille, date de modification).
- États gérés : chargement, erreur (avec bouton Réessayer), liste vide.
- Recherche par nom.
- Filtres (barre fixe à gauche) : type, période, taille.
- Téléchargement avec feedback UX : loading, succès, erreur via Snackbar/Alert (sans changer de page).

Backend (Flask)
- Lecture des fichiers depuis le dossier `files/`.
- API : `GET /api/files` et `GET /download/filename`.

## Prérequis

- Node.js + npm 
- Python 3.x + pip

## Installation

### 1) Backend

cd Backend
python -m venv .venv
# Windows (PowerShell)
.venv\Scripts\Activate.ps1
pip install -r requirements.txt

### 2) Frontend

cd Frontend/frontend
npm install

## Lancer le projet

### Démarrer le backend (Flask)

cd Backend
python app.py

Backend par défaut : http://127.0.0.1:5000

### Démarrer le frontend (Vite)

cd Frontend/frontend
npm run dev

Frontend par défaut : http://localhost:5173

Le frontend utilise un proxy Vite (`vite.config.js`) pour rediriger `/api` et `/download` vers le backend Flask.

## Utilisation (recherche + filtres)

- Recherche : tapez un nom dans la barre de recherche pour filtrer la liste.
- Filtres (panneau à gauche) :
  - Type : Tous / PDF / Images / Autres
  - Période : Tout / 7j / 30j / 1 an
  - Taille : plage en MB
- Les filtres sont combinables (ex: Images + 30j + 0–20MB).

## API (exemples)

### Lister les fichiers

curl http://127.0.0.1:5000/api/files


Réponse (exemple) :

[
  { "name": "document.pdf", "size": 123456, "lastModified": "2025-01-15T10:32:00Z" },
  { "name": "image.png", "size": 45678, "lastModified": "2025-01-10T09:12:00Z" }
]

### Télécharger un fichier

curl -OJ http://127.0.0.1:5000/download/document.pdf

Si le fichier n'existe pas : erreur 404 (ex: `{"error":"File not found"}`).

## Tests

### Tests backend (pytest)

cd Backend
pytest


### Tests frontend (Vitest + React Testing Library)

cd Frontend/frontend
npm run test


Tests présents :
- `src/tests/FileList.test.jsx` : vérifie l'état erreur de chargement (ErrorState + bouton Réessayer).
- `src/tests/FileRow.download.test.jsx` : vérifie le clic "download" (mock fetch) + toasts (loading/success).

## Choix techniques & UX

- Material UI (MUI) : composants accessibles + design moderne.
- Skeleton loaders pour une meilleure perception de performance pendant le chargement.
- Gestion des erreurs : écran d'erreur clair + bouton Réessayer.
- Téléchargement sans changer de page : `fetch + blob` avec notifications.
- Proxy Vite : évite les soucis CORS et simplifie les URLs côté frontend (`/api/...` et `/download/...`).
