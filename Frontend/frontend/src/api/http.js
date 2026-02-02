export async function httpGetJson(path) {
  let res;

  try {
    res = await fetch(path);
  } catch (e) {
    throw new Error("Impossible de joindre le serveur. Lance le backend puis réessaie.");
  }

  if (!res.ok) {
    if (res.status >= 500) {
      throw new Error("Erreur serveur. Réessaie dans quelques secondes.");
    }
    if (res.status === 404) {
      throw new Error("Ressource introuvable (404).");
    }
    throw new Error(`Requête refusée (HTTP ${res.status}).`);
  }

  return res.json();
}
