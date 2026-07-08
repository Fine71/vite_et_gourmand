import Route from "./route.js";

//Définition des routes de l'application

export const allRoutes = [
    new Route("/", "Accueil", "./pages/home.html", []),
    new Route("/menus", "Menus", "./pages/menus.html", []),
    new Route("/details", "Détails du menu", "./pages/menus/details.html", []),
    new Route("/commander", "Ma commande", "./pages/menus/commander.html", []),
]

// Le titre s'affiche comme ceci : Route.titre - websiteName

export const websiteName = "Vite & Gourmand";