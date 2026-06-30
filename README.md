# TGN - Plateforme de Gestion de Réseau de Transport Urbain

Plateforme complète de gestion de réseau de transport urbain développée en Vue.js avec trois interfaces distinctes :

- **Admin Exploitant** : Gestion opérationnelle du réseau
- **Admin Autorité** : Monitoring et pilotage global
- **App Client** : Interface voyageurs

## Stack Technique

- **Front-end** : Vue.js 3
- **State Management** : Pinia
- **Styling** : Tailwind CSS / SCSS
- **Routing** : Vue Router
- **Temps réel** : WebSockets
- **Cartes** : Leaflet

## Structure du Projet

```
src/
├── components/      # Composants réutilisables
├── views/          # Pages par rôle
├── router/         # Configuration routing
├── stores/         # Pinia stores
├── assets/         # Images, fonts, styles globales
└── services/       # API clients, utilitaires
```

## Installation

```bash
npm install
npm run dev
```

---

**À développer** : Architecture complète du front avec les trois interfaces.
