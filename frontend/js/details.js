import { fetchFromApi } from "./app.js";

fetchFromApi('/menus/3')
  .then(menu => {
    document.querySelector('#menu-title').textContent = menu.name;
    document.querySelector('#menu-description').textContent = menu.description;
  });
  