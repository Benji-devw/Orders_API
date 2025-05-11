# Vallena Orders API

API REST moderne pour la gestion des commandes, construite avec Fastify, TypeScript et MongoDB.

## 🚀 Technologies

- [Bun](https://bun.sh/) - Runtime JavaScript ultra-rapide
- [Fastify](https://www.fastify.io/) - Framework web rapide et efficace
- [TypeScript](https://www.typescriptlang.org/) - Typage statique pour JavaScript
- [MongoDB](https://www.mongodb.com/) - Base de données NoSQL
- [Mongoose](https://mongoosejs.com/) - ODM pour MongoDB

## 📋 Prérequis

- Bun >= 1.0.0
- MongoDB >= 6.0
- Node.js >= 18.0.0 (pour certaines dépendances)

## 🛠 Installation

1. Cloner le repository
```bash
git clone [URL_DU_REPO]
cd vallena_orders
```

2. Installer les dépendances
```bash
bun install
```

3. Configurer les variables d'environnement
```bash
cp .env.example .env
# Éditer .env avec vos configurations
```

## 🚀 Démarrage

Développement :
```bash
bun run dev
```

Production :
```bash
bun run start
```

## 📁 Structure du Projet

```
├── controllers/     # Logique métier
├── models/         # Schémas Mongoose
├── routes/         # Routes API
├── db/            # Configuration base de données
├── server.js      # Point d'entrée
└── tsconfig.json  # Configuration TypeScript
```

## 🔒 Sécurité

- Protection CORS configurée
- Helmet pour la sécurité des en-têtes HTTP
- Validation des données d'entrée

## 📝 API Endpoints

### Commandes
- `GET /api/orders` - Liste toutes les commandes
- `POST /api/orders` - Crée une nouvelle commande
- `GET /api/orders/:id` - Récupère une commande spécifique
- `PUT /api/orders/:id` - Met à jour une commande
- `DELETE /api/orders/:id` - Supprime une commande

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- [@Navart](https://navart.dev)

## 🙏 Remerciements

- Fastify pour leur excellent framework
- La communauté Bun pour leur support 
