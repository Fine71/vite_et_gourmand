export default class Route {
    constructor(url, title, pathHtml, authorize, pathJS = "") {
        this.url = url;
        this.title = title;
        this.pathHtml = pathHtml;
        this.authorize = authorize;
        this.pathJS = pathJS;
        this.authorize = this.authorize;
    }
}

/*
[] -> tout le monde peux y accerder
["disconnected"] -> que les utilisateurs non connectés peuvent y accéder
["client"] -> que les clients peuvent y accéder
["admin"] -> que les admins peuvent y accéder
["employé"] -> que les employés peuvent y accéder

On peut aussi faire des combinaisons : ["client", "admin"] -> que les clients et les admins peuvent y accéder
*/