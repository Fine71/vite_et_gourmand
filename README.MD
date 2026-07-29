# 🍽️ Vite et Gourmand — Plateforme de commande de menu en ligne

> Une application web moderne pour parcourir des menus, personnaliser ses plats et passer commande en quelques clics.

---

## 📋 Table des matières

- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Configuration](#configuration)
- [Structure du projet](#structure-du-projet)
- [Routes & Endpoints](#routes--endpoints)
- [Contribuer](#contribuer)

---

## Présentation

**vite et gourmand** est une application web permettant aux clients de consulter un menu interactif, de composer leur commande et de la valider en ligne. Elle est conçue pour les restaurants, food trucks, cafétérias ou tout établissement souhaitant digitaliser leur prise de commande.

---

## Fonctionnalités

- 🗂️ **Affichage du menu** par catégories (entrées, plats, desserts, boissons…)
- 🔍 **Recherche et filtres** par allergènes, régime (végan, sans gluten…), prix
- 🛒 **Panier dynamique** avec résumé en temps réel
- ✏️ **Personnalisation des plats** (options, suppléments, cuisson)
- 💳 **Paiement en ligne** intégré
- 📱 **Interface responsive** — mobile, tablette, desktop (Bootstrap 5)
- 🔔 **Suivi de commande** en temps réel (statuts : en préparation, prêt, livré)
- 🧑‍💼 **Back-office restaurateur** pour gérer le menu et les commandes
- 📊 **Historique & analytics** stockés dans MongoDB

---

## Technologies utilisées

| Côté                          | Stack                                             |
|-------------------------------|---------------------------------------------------|
| Frontend                      | Bootstrap 5, Twig (moteur de templates Symfony)   |
| Backend                       | PHP 8.2, Symfony 7                                |
| Base de données relationnelle | MySQL 8 (utilisateurs, produits, commandes)       |
| Base de données NoSQL         | MongoDB 6 (logs, historique, sessions, analytics) |
| ORM / ODM                     | Doctrine ORM (MySQL) + Doctrine ODM (MongoDB)     |
| Authentification              | Symfony Security Component                        |
| Déploiement                   | Docker, Docker Compose                            |

---

## Installation

### Prérequis

- PHP ≥ 8.2
- Composer ≥ 2.x
- Symfony CLI
- MySQL ≥ 8.0
- MongoDB ≥ 6.0
- Docker & Docker Compose (recommandé)

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-utilisateur/menuorder.git
cd menuorder

# 2. Installer les dépendances PHP
composer install

# 3. Copier et renseigner les variables d'environnement
cp .env .env.local
# Éditez .env.local avec vos paramètres (voir section Configuration)

# 4. Lancer les conteneurs Docker (MySQL + MongoDB)
docker-compose up -d

# 5. Créer la base de données MySQL et jouer les migrations
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate

# 6. (Optionnel) Peupler avec des données de démonstration
php bin/console doctrine:fixtures:load

# 7. Lancer le serveur de développement Symfony
symfony server:start
```

L'application sera disponible sur `http://localhost:8000`.

---

## Configuration

Éditez le fichier `.env.local` avec vos valeurs :

```env
# Base de données MySQL (Doctrine ORM)
DATABASE_URL="mysql://user:password@127.0.0.1:3306/vite_et_gourmand?serverVersion=8.0"

# Base de données MongoDB (Doctrine ODM)
MONGODB_URL="mongodb://127.0.0.1:27017"
MONGODB_DB="vite_et_gourmand_db"

# Symfony
APP_ENV=dev
APP_SECRET=votre_secret_app

# Mailer (optionnel, pour les confirmations de commande)
MAILER_DSN=smtp://localhost
```

---

## Structure du projet

vite_et_gourmand/
├── assets/                      # JS et CSS sources (Webpack Encore)
│   ├── bootstrap.js
│   └── styles/
│       └── app.scss
│
├── config/                      # Configuration Symfony
│   ├── packages/
│   │   ├── doctrine.yaml        # Config MySQL / Doctrine ORM
│   │   ├── doctrine_mongodb.yaml# Config MongoDB / Doctrine ODM
│   │   └── security.yaml        # Config authentification
│   └── routes.yaml
│
├── migrations/                  # Migrations Doctrine (MySQL)
│
├── src/
│   ├── Controller/              # Contrôleurs Symfony
│   │   ├── MenuController.php
│   │   ├── OrderController.php
│   │   └── AdminController.php
│   ├── Entity/                  # Entités Doctrine (MySQL)
│   │   ├── User.php
│   │   ├── MenuItem.php
│   │   ├── Category.php
│   │   └── Order.php
│   ├── Document/                # Documents Doctrine ODM (MongoDB)
│   │   ├── OrderLog.php
│   │   └── UserSession.php
│   ├── Repository/              # Repositories MySQL et MongoDB
│   ├── Form/                    # Formulaires Symfony
│   └── DataFixtures/            # Fixtures de test
│
├── templates/                   # Templates Twig
│   ├── base.html.twig
│   ├── menu/
│   │   ├── index.html.twig      # Liste du menu
│   │   └── show.html.twig       # Détail d'un plat
│   ├── order/
│   │   ├── cart.html.twig       # Panier
│   │   └── confirmation.html.twig
│   └── admin/
│       └── dashboard.html.twig
│
├── docker-compose.yml
├── .env
└── README.md

---

## Routes & Endpoints

### Menu (public)

| Méthode | Route         | Description               |
|---------|---------------|---------------------------|
| `GET`   | `/`           | Page d'accueil / menu     |
| `GET`   | `/menu`       | Affichage du menu complet |
| `GET`   | `/menu/{id}`  | Détail d'un plat          |
| `GET`   | `/categories` | Liste des catégories      |

### Commandes

| Méthode | Route               | Description               |
|---------|---------------------|---------------------------|
| `GET`   | `/panier`           | Afficher le panier        |
| `POST`  | `/panier/ajouter`   | Ajouter un plat au panier |
| `POST`  | `/commande/valider` | Valider la commande       |
| `GET`   | `/commande/{id}`    | Suivi de commande         |

### Authentification

| Méthode    | Route          | Description             |
|------------|----------------|-------------------------|
| `GET/POST` | `/connexion`   | Formulaire de connexion |
| `GET`      | `/deconnexion` | Déconnexion             |
| `GET/POST` | `/inscription` | Création de compte      |

### Administration (rôle ROLE_ADMIN)

| Méthode    | Route                         | Description       |
|------------|-------------------------------|-------------------|
| `GET`      | `/admin`                      | Tableau de bord   |
| `GET/POST` | `/admin/menu/nouveau`         | Ajouter un plat   |
| `GET/POST` | `/admin/menu/{id}/modifier`   | Modifier un plat  |
| `POST`     | `/admin/commande/{id}/statut` | Changer le statut |

---

## Contribuer

Les contributions sont les bienvenues ! Voici comment participer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalite`)
3. Committez vos changements (`git commit -m 'feat: ajouter ma fonctionnalité'`)
4. Poussez la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvrez une Pull Request

Merci de respecter les [conventions de commit](https://www.conventionalcommits.org/fr/).

---

> Fait avec ❤️ par l'équipe vite_et_gourmand
