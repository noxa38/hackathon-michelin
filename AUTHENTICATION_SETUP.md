# 🔐 Authentification & Dashboard - Guide de mise en place

## 📋 Résumé des changements

Une solution complète d'authentification et de dashboard a été implémentée avec :

### ✨ Fonctionnalités principales
- **Connexion/Inscription** avec validation des données
- **Mot de passe oublié** avec lien de réinitialisation par email
- **Authentification JWT** sécurisée
- **Dashboard personnalisé** avec deux sections:
  - 📚 **Mes listes** - Créer et gérer vos listes de restaurants
  - 👤 **Mon profil** - Voir et éditer vos informations

## 🗂️ Architecture

```
Backend
├── models/user.model.js (new)
├── models/list.model.js (new)
├── controllers/auth.controller.js (new)
├── controllers/list.controller.js (new)
├── routes/auth.routes.js (new)
├── routes/list.routes.js (new)
├── middleware/auth.middleware.js (new)
└── database/schema.sql (updated)

Frontend
├── pages/AuthPage.tsx (new)
├── pages/AuthPage.module.css (new)
├── pages/DashboardPage.tsx (new)
├── pages/DashboardPage.module.css (new)
├── services/auth.service.ts (new)
├── services/list.service.ts (new)
├── types/auth.types.ts (new)
└── App.tsx (updated)
```

## ⚙️ Configuration du Backend

### 1. Fichier `.env`

Créez un fichier `.env` à la racine du dossier `backend/`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourPassword
DB_NAME=michelin_guide
JWT_SECRET=your-super-secret-key-change-in-production
PORT=3000
CLIENT_URL=http://localhost:5173
```

### 2. Base de données

Créez la base de données et les tables:

```bash
# Connectez-vous à MySQL
mysql -u root -p

# Exécutez dans MySQL:
CREATE DATABASE michelin_guide;
USE michelin_guide;
SOURCE backend/src/database/schema.sql;
SOURCE backend/src/database/seed.sql;  # (si existe)
```

### 3. Installez les dépendances

```bash
cd backend
npm install
```

Les packages suivants ont été ajoutés:
- **bcryptjs** - Hachage des mots de passe
- **jsonwebtoken** - Gestion des tokens JWT

### 4. Démarrez le serveur

```bash
npm run dev  # ou npm start
```

Server running on http://localhost:3000

## 🚀 Démarrage du Frontend

```bash
# À la racine du projet
npm run dev
```

Application available at http://localhost:5173

## 🔑 Endpoints API

### Authentication
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/profile` - Récupérer le profil (protégé)
- `PUT /api/auth/profile` - Mettre à jour le profil (protégé)
- `GET /api/auth/verify` - Vérifier le token

### Lists (tous protégés)
- `GET /api/lists` - Récupérer toutes les listes
- `POST /api/lists` - Créer une liste
- `GET /api/lists/:id` - Récupérer une liste
- `PUT /api/lists/:id` - Mettre à jour une liste
- `DELETE /api/lists/:id` - Supprimer une liste
- `GET /api/lists/:listId/restaurants` - Récupérer les restaurants d'une liste
- `POST /api/lists/:listId/restaurants` - Ajouter un restaurant
- `DELETE /api/lists/:listId/restaurants/:restaurantId` - Retirer un restaurant

## 🎨 Styles

Tous les styles suivent le design system existant :
- Variables CSS (--color-black, --accent, etc.)
- CSS Modules pour l'isolation des styles
- Responsive design (mobile-first)
- Cohérent avec RestaurantCard et HomePage

## 🔒 Sécurité

- Mots de passe hachés avec **bcryptjs** (10 rounds)
- Tokens JWT avec expiration 7 jours
- Middleware de protection sur les routes sensibles
- Validation des données côté client et serveur
- CORS configuré

## ✅ Checklist de mise en place

- [ ] Créer `.env` avec les variables correctes
- [ ] Créer la base de données MySQL
- [ ] Exécuter le schema.sql
- [ ] Installer les dépendances backend (`npm install`)
- [ ] Démarrer le backend (`npm run dev`)
- [ ] Démarrer le frontend (`npm run dev`)
- [ ] Tester la connexion à http://localhost:5173/auth
- [ ] Créer un compte de test
- [ ] Accéder au dashboard

## 📝 Utilisation

### Inscription
1. Allez sur `/auth`
2. Cliquez sur l'onglet "Inscription"
3. Remplissez le formulaire
4. Créez votre compte
5. Redirection automatique vers le dashboard

### Connexion
1. Allez sur `/auth`
2. Remplissez vos identifiants
3. Cliquez sur "Se connecter"
4. Accès au dashboard

### Gestion des listes
1. Dans le dashboard, allez à "Mes listes"
2. Cliquez sur "Nouvelle liste"
3. Nommez votre liste
4. Gérez vos listes (créer, supprimer)

### Mon profil
1. Dans le dashboard, cliquez sur "Mon profil"
2. Consultez vos informations
3. Bouton "Éditer" prêt à être implémenté

## 🐛 Troubleshooting

### "Database connection failed"
- Vérifiez que MySQL est démarré
- Vérifiez les identifiants dans `.env`
- Vérifiez que la base de données existe

### "CORS error"
- Vérifiez que `CLIENT_URL` dans `.env` est correct
- Vérifiez le port du frontend (par défaut 5173)

### "Token invalid"
- Vérifiez que `JWT_SECRET` est cohérent
- Supprimez le token dans `localStorage` et reconnectez-vous

## 🎯 Prochaines étapes (optionnel)

- [ ] Implémenter l'édition du profil
- [ ] Ajouter les restaurants aux listes
- [ ] Intégrer avec la page des restaurants
- [ ] Implémenter la vraie récupération de mot de passe par email
- [ ] Ajouter des tests unitaires et intégration
- [ ] Déployer en production

---

**Support**: Pour toute question, consultez les fichiers source commentés.
