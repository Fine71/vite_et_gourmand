async function deconnexion() {
  try {
    await fetch(`${API_URL}/logout`, {
      method: "GET",
      credentials: "include",
    });
  } catch (erreur) {
    console.error(erreur);
  } finally {
    // On nettoie le cookie applicatif côté client dans tous les cas,
    // même si la requête réseau échoue
    deleteCookie(RoleCookieName);
    window.location.replace("/signin.html");
  }
}

const boutonDeconnexion = document.getElementById("btn-deconnexion");
if (boutonDeconnexion) {
  boutonDeconnexion.addEventListener("click", deconnexion);
}
