/**
 * menu.js
 * Affiche une liste de menus, et charge le détail du menu sélectionné
 * via un appel AJAX (fetch) vers l'API Symfony, sans recharger la page.
 *
 * Endpoints attendus côté API :
 *   GET /api/menus        -> liste des menus [{ id, name, ... }, ...]
 *   GET /api/menus/{id}    -> détail d'un menu { id, name, description, price, ... }
 */

import { fetchFromApi } from './app.js';

const listContainer = document.getElementById('menu-list');
const detailContainer = document.getElementById('menu-detail');

/**
 * Charge et affiche la liste des menus au chargement de la page.
 */
async function loadMenuList() {
    if (!listContainer) return;

    listContainer.innerHTML = `<p class="text-muted">Chargement des menus...</p>`;

    try {
        const menus = await fetchFromApi('/menus');

        if (!menus.length) {
            listContainer.innerHTML = `<p class="text-muted">Aucun menu disponible.</p>`;
            return;
        }

        listContainer.innerHTML = `
            <div class="list-group">
                ${menus.map((menu) => `
                    <button
                        type="button"
                        class="list-group-item list-group-item-action menu-item"
                        data-id="${menu.id}"
                    >
                        ${menu.name}
                    </button>
                `).join('')}
            </div>
        `;

        // Un écouteur par bouton : au clic, on charge le détail correspondant
        listContainer.querySelectorAll('.menu-item').forEach((button) => {
            button.addEventListener('click', () => {
                // Marque visuellement l'élément actif
                listContainer.querySelectorAll('.menu-item').forEach((b) => b.classList.remove('active'));
                button.classList.add('active');

                loadMenuDetail(button.dataset.id);
            });
        });
    } catch (error) {
        listContainer.innerHTML = `
            <div class="alert alert-danger">
                Impossible de charger les menus (${error.message}).
            </div>
        `;
    }
}

/**
 * Charge et affiche le détail d'un menu précis (appel AJAX déclenché au clic).
 */
async function loadMenuDetail(menuId) {
    if (!detailContainer) return;

    detailContainer.innerHTML = `<p class="text-muted">Chargement du détail...</p>`;

    try {
        const menu = await fetchFromApi(`/menus/${menuId}`);

        detailContainer.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">${menu.name}</h3>
                    <p class="card-text">${menu.description ?? ''}</p>
                    ${menu.price !== undefined ? `<p class="fw-bold">${menu.price} €</p>` : ''}
                </div>
            </div>
        `;
    } catch (error) {
        detailContainer.innerHTML = `
            <div class="alert alert-danger">
                Impossible de charger le détail du menu (${error.message}).
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', loadMenuList);