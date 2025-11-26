# Aube – Prédiction des tensions RH en Normandie

Application React/Vite qui visualise les tensions de recrutement par zone d’emploi : tableau de bord, prédictions détaillées, analyse de modèles et landing page immersive. Un assistant local aide à parcourir la méthodologie (SARIMA, LSTM, ensemble) sans appel externe.

## Fonctionnalités principales
- Tableau de bord synthétique (zones en tension, confiance des modèles, historique d’actualisation).
- Liste filtrable des prédictions sur 6 mois (tendance, confiance, seuils de tension).
- Analyse comparée des modèles (radar, bar chart) et description des métriques.
- Assistant local (hors ligne) pour rappeler la méthodologie et le périmètre données.
- Landing page animée mettant en avant la valeur du produit.

## Stack
- React 19 + Vite 6 + TypeScript
- Recharts (visualisation), lucide-react (icônes)
- Tailwind (via CDN) pour la mise en forme rapide

## Prérequis
- Node.js 18+ et npm

## Installation et lancement
1) Installer les dépendances  
```bash
npm install
```
2) Démarrer le serveur de dev (port 3005)  
```bash
npm run dev
```

## Scripts utiles
- `npm run dev` : lance le serveur de développement sur `http://localhost:3005`.
- `npm run build` : construit la version production dans `dist/`.
- `npm run preview` : sert le build localement pour validation.

## Déploiement
1) Construire : `npm run build`  
2) Servir le dossier `dist/` avec le serveur statique de votre choix (Vercel, Netlify, nginx…).

## Structure rapide
- `App.tsx` : shell principal et navigation par onglets.
- `components/` : vues (Dashboard, Predictions, ModelAnalysis, Assistant, LandingPage, Sidebar).
- `constants.ts` / `types.ts` : données mock et typages.
