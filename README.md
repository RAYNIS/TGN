# TGN - Plateforme de Gestion de Réseau de Transport Urbain

Plateforme complète de gestion de réseau de transport urbain développée en Vue.js 3 avec trois interfaces distinctes :

- **Admin Exploitant** : Gestion opérationnelle (lignes, véhicules, horaires, conducteurs, suivi temps réel, incidents, rapports)
- **Admin Autorité** : Monitoring réglementaire (conformité, validation, tarification, analytics, audit)
- **App Client** : Interface voyageurs (recherche, réservation, suivi temps réel, paiement, notifications, favoris, feedback)

## Démo en ligne

👉 **https://raynis.github.io/TGN/**

Choisissez un rôle sur la page de connexion pour accéder au portail correspondant avec des données mock réalistes.

## Stack Technique

- **Front-end** : Vue.js 3 (Composition API)
- **Build** : Vite
- **State Management** : Pinia
- **Styling** : Tailwind CSS
- **Routing** : Vue Router
- **Temps réel** : Socket.io (mock)
- **Cartes** : Leaflet
- **Graphiques** : Chart.js + vue-chartjs
- **Déploiement** : GitHub Pages (CI/CD automatique)

## Structure du Projet

```
src/
├── components/
│   ├── common/      # ChartWidget, DataTable, KpiCard, MapView, ModalDialog, etc.
│   └── layout/      # ExploitantLayout, AutoriteLayout, ClientLayout
├── views/
│   ├── auth/        # LoginView (sélection de rôle)
│   ├── exploitant/  # 8 vues (Dashboard, Lignes, Véhicules, Horaires, Conducteurs, Suivi, Rapports, Incidents)
│   ├── autorite/    # 7 vues (Dashboard, Monitoring, Rapports, Validation, Tarification, Analytics, Audit)
│   └── client/      # 9 vues (Home, Recherche, Réservation, Suivi, Historique, Notifications, Favoris, Paiement, Feedback)
├── router/          # Configuration routing avec guards d'authentification
├── stores/          # Pinia stores avec données mock (auth, exploitant, autorite, client)
├── assets/          # Styles Tailwind CSS
└── services/        # API mock (Axios) et WebSocket (Socket.io)
```

## Installation

```bash
npm install
npm run dev
```

Le serveur de développement démarre sur **http://localhost:5173**.

## Build de production

```bash
npm run build
npm run preview
```
