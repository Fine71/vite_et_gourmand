import Route from "./route.js";

//Définition des routes de l'application

export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", []),    
]

// Le titre s'affiche comme ceci : Route.titre - websiteName

export const websiteName = "Vite & Gourmand";