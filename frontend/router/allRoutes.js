import Route from "./route.js";

//Définition des routes de l'application

export const allRoutes = [
    new Route("/", "Accueil", "./pages/home.html", []),
    new Route("/signin", "Connexion", "./pages/auth/signin.html", [disconnected], "/js/auth/signin.js"),
    new Route("/signup", "Inscription", "./pages/auth/signup.html", [disconnected], "/js/auth/signup.js"),
    new Route("/account", "Mon compte", "./pages/auth/account.html", []),
    new Route("/editPassword", "Modifier le mot de passe", "./pages/auth/editPassword.html", []),
    new Route("/menus", "Menus", "./pages/menus.html", []),
    new Route("/details", "Détails du menu", "./pages/menus/details.html", []),
    new Route("/commander", "Ma commande", "./pages/menus/commander.html", []),
    new Route("/vos_commandes", "Vos commandes", "./pages/menus/allCommandes.html", []),
]

// Le titre s'affiche comme ceci : Route.titre - websiteName

export const websiteName = "Vite & Gourmand";