const API_URL = 'http://localhost:8000/api';

async function chargerAvis(restaurantId) {
  const conteneur = document.getElementById('liste-avis');
  if (!conteneur) return;

  try {
    const reponse = await fetch(`${API_URL}/avis/${restaurantId}`);
    if (!reponse.ok) throw new Error('Erreur lors du chargement des avis');

    const avis = await reponse.json();
    afficherAvis(avis, conteneur);
  } catch (erreur) {
    conteneur.textContent = 'Impossible de charger les avis pour le moment.';
    console.error(erreur);
  }
}

function afficherAvis(avisListe, conteneur) {
  conteneur.innerHTML = '';

  if (avisListe.length === 0) {
    conteneur.textContent = 'Aucun avis pour le moment.';
    return;
  }

  avisListe.forEach((avis) => {
    const carte = document.createElement('div');
    carte.classList.add('avis-card');

    const note = document.createElement('strong');
    note.textContent = `${avis.note} / 5`;

    // textContent plutôt que innerHTML : protection contre le XSS
    // sur un contenu saisi par un utilisateur (cf. section 4.6)
    const commentaire = document.createElement('p');
    commentaire.textContent = avis.commentaire;

    carte.appendChild(note);
    carte.appendChild(commentaire);
    conteneur.appendChild(carte);
  });
}

async function envoyerAvis(event) {
  event.preventDefault();

  const form = event.target;
  const note = parseInt(form.note.value, 10);
  const commentaire = form.commentaire.value.trim();

  if (!commentaire || note < 1 || note > 5) {
    afficherErreurFormulaire('Merci de renseigner une note (1 à 5) et un commentaire.');
    return;
  }

  try {
    const reponse = await fetch(`${API_URL}/avis`, {
      method: 'POST',
      credentials: 'include', // envoie le cookie de session avec la requête cross-origin
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        restaurantId: parseInt(form.restaurantId.value, 10),
        note,
        commentaire,
      }),
    });

    if (reponse.status === 401 || reponse.status === 403) {
      afficherErreurFormulaire('Vous devez être connecté pour publier un avis.');
      return;
    }

    if (!reponse.ok) throw new Error('Erreur lors de l\'envoi de l\'avis');

    form.reset();
    chargerAvis(form.restaurantId.value);
  } catch (erreur) {
    afficherErreurFormulaire('Une erreur est survenue, réessayez plus tard.');
    console.error(erreur);
  }
}

function afficherErreurFormulaire(message) {
  const erreurEl = document.getElementById('avis-erreur');
  if (erreurEl) erreurEl.textContent = message;
}

const formAvis = document.getElementById('form-avis');
if (formAvis) {
  formAvis.addEventListener('submit', envoyerAvis);
}

const restaurantIdCourant = document.body.dataset.restaurantId;
if (restaurantIdCourant) {
  chargerAvis(restaurantIdCourant);
}