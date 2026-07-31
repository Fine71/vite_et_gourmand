/**
 * app.js
 * Logique front générale : ici tu peux ajouter les appels
 * à l'API Symfony (backend), ex: fetch vers http://localhost:8000/api/...
 */

export const API_BASE_URL = 'http://localhost:8000/api';

export async function fetchFromApi(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
    }
    return response.json();
}

// Exemple d'utilisation :
// fetchFromApi('/users').then(data => console.log(data));

fetch(`${API_BASE_URL}/users`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

        data.forEach(user => {
            const userElement = document.createElement('div');
            userElement.textContent = `${user.name} (${user.email})`;
            document.body.appendChild(userElement);
        });
    })
    .catch(error => {
        console.error(error);

    });  
