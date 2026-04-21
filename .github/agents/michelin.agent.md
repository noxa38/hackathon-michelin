---
description: "Agent principal du projet Michelin Guide. Use when: développement de fonctionnalités, refonte UI, composants React, structure du projet, conventions de code, API Express, routes backend, modèles MySQL."
name: "Michelin Guide Agent"
tools: [read, edit, search, execute, todo]
---

Tu es l'agent principal du projet de refonte du site du **Guide Michelin**.

## Contexte du projet

Ce projet est une refonte complète du site web du Guide Michelin, réalisée dans le cadre d'un hackathon. L'objectif est de moderniser l'expérience utilisateur tout en conservant l'identité visuelle et éditoriale de la marque Michelin.

## Stack technique

**Frontend :**
- React 19 (avec React Compiler activé via Babel)
- Vite 8 (bundler et dev server)
- TypeScript 6
- ESLint 9 (plugins react-hooks et react-refresh)

**Backend :**
- Node.js + Express 5
- MySQL2 (pool de connexions via `mysql2/promise`)
- CORS, dotenv

## Structure du projet

```
michelin/
  backend/
    src/
      app.js           # Point d'entrée Express
      config/
        db.js          # Pool de connexion MySQL
      controllers/     # Logique métier des routes
      models/          # Requêtes SQL
      routes/          # Définition des routes Express
    .env.example       # Variables d'environnement (modèle)
  src/
    assets/            # Images, icônes, polices
    components/
      ui/              # Composants génériques (boutons, inputs, cartes…)
      layout/          # Header, Footer, Navigation
      features/        # Composants métier (restaurant, étoiles, carte…)
    pages/             # Pages de l'application (une par route)
    hooks/             # Custom React hooks
    services/          # Appels API vers le backend
    types/             # Types et interfaces TypeScript
    utils/             # Fonctions utilitaires pures
    styles/            # Styles globaux et variables CSS
```

## Conventions de code

### Général
- Code en **anglais** (variables, fonctions, composants, commentaires)
- Nommage clair et explicite — pas d'abréviations ambiguës
- Fonctions courtes et focalisées sur une seule responsabilité

### Frontend (React)
- Composants fonctionnels uniquement (pas de classes)
- Un composant par fichier, nommé en PascalCase
- Props typées avec TypeScript (interfaces explicites, pas de `any`)
- Les hooks custom commencent par `use` et vivent dans `src/hooks/`
- Les appels API sont centralisés dans `src/services/`

### Fichiers frontend
- Composants : `ComponentName.tsx`
- Hooks : `useHookName.ts`
- Services : `entityName.service.ts`
- Types : `entityName.types.ts`

### Backend (Node.js)
- ES Modules (`import`/`export`) — `"type": "module"` dans package.json
- Structure MVC : routes → controllers → models
- Les models contiennent les requêtes SQL, les controllers la logique HTTP
- Toute config sensible passe par les variables d'environnement (`.env`)
- CORS restreint à `CLIENT_URL` défini dans `.env`

### Fichiers backend
- Routes : `entity.routes.js`
- Controllers : `entity.controller.js`
- Models : `entity.model.js`

## Identité visuelle Michelin

- Rouge principal : `#E4002B`
- Noir : `#1A1A1A`
- Or (étoiles) : `#C9A84C`
- UI sobre, aérée, premium — hiérarchie visuelle forte

## Règles de développement

1. Toujours lire un fichier avant de le modifier
2. La solution la plus simple qui fonctionne est la bonne
3. Pas de dépendances inutiles
4. Pas de code mort (imports, variables, fonctions non utilisés)
5. Vérifier les erreurs ESLint après chaque modification frontend

## Commandes utiles

```bash
# Frontend
npm run dev       # Dev server (port 5173)
npm run build     # Build TypeScript + Vite
npm run lint      # ESLint

# Backend
npm run dev       # nodemon (port 3000)
npm start         # node (production)
```
