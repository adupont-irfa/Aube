import { JobPrediction, ModelMetric, TensionLevel } from './types';

export const DEPARTMENTS = [
  { code: '14', name: 'Calvados' },
  { code: '27', name: 'Eure' },
  { code: '50', name: 'Manche' },
  { code: '61', name: 'Orne' },
  { code: '76', name: 'Seine-Maritime' }
];

export const MOCK_PREDICTIONS: JobPrediction[] = [
  { id: '1', romeCode: 'J1506', jobTitle: 'Soins infirmiers', zone: 'Caen', currentTension: 1.4, predictedTension6Months: 1.8, trend: 'up', modelConfidence: 0.92 },
  { id: '2', romeCode: 'M1805', jobTitle: 'Développement informatique', zone: 'Rouen', currentTension: 1.2, predictedTension6Months: 1.6, trend: 'up', modelConfidence: 0.88 },
  { id: '3', romeCode: 'H1102', jobTitle: 'Management industriel', zone: 'Le Havre', currentTension: 0.8, predictedTension6Months: 0.7, trend: 'down', modelConfidence: 0.95 },
  { id: '4', romeCode: 'K1304', jobTitle: 'Aide à domicile', zone: 'Evreux', currentTension: 1.6, predictedTension6Months: 1.9, trend: 'up', modelConfidence: 0.85 },
  { id: '5', romeCode: 'I1301', jobTitle: 'Maintenance industrielle', zone: 'Cherbourg', currentTension: 1.1, predictedTension6Months: 1.3, trend: 'up', modelConfidence: 0.89 },
  { id: '6', romeCode: 'D1202', jobTitle: 'Restauration (Cuisine)', zone: 'Deauville', currentTension: 1.3, predictedTension6Months: 1.1, trend: 'down', modelConfidence: 0.91 },
  { id: '7', romeCode: 'F1603', jobTitle: 'Plomberie', zone: 'Alençon', currentTension: 1.5, predictedTension6Months: 1.7, trend: 'up', modelConfidence: 0.87 },
  { id: '8', romeCode: 'A1203', jobTitle: 'Paysagisme', zone: 'Saint-Lô', currentTension: 0.5, predictedTension6Months: 0.6, trend: 'stable', modelConfidence: 0.93 },
];

export const MODEL_METRICS: ModelMetric[] = [
  { modelName: 'SARIMA (Baseline)', rmse: 150, mape: 12, description: 'Statistique, gestion saisonnalité' },
  { modelName: 'LSTM (Deep Learning)', rmse: 135, mape: 9.8, description: 'Réseaux de neurones récurrents' },
  { modelName: 'Ensemble Voting', rmse: 140, mape: 10, description: 'Combinaison pondérée (40% SARIMA, 60% LSTM)' },
];

export const PROJECT_CONTEXT = `
Tu es un assistant expert pour le projet de Data Science "Prédiction des tensions de recrutement en Normandie".
Voici les détails techniques du projet :

1. Objectif : Prédire à 6 mois les métiers en tension critique (> 1.5 écarts-types).
2. Périmètre : Région Normandie (14, 27, 50, 61, 76), granuarité Zone d'emploi (24 zones).
3. Données :
   - France Travail (API Offres, temps réel)
   - Dares (Indicateurs trimestriels, lag 90 jours)
   - INSEE (Stats structurelles)
   - ROME 4.0 (Référentiel métiers)
4. Pipeline :
   - Collecte multi-sources, harmonisation mensuelle.
   - Gestion des lags (interpolation).
   - Feature Engineering : Lags (t-1 à t-6), Moyennes mobiles (3, 6, 12 mois).
5. Modélisation :
   - SARIMA (40% du vote) : Baseline statistique.
   - LSTM (60% du vote) : Deep Learning pour non-linéarités.
   - Ensemble Voting : Modèle final.
   - Performance : MAPE ~10%, RMSE ~140 offres.
6. Industrialisation :
   - Batch mensuel (Cron).
   - API optionnelle (Docker/Flask).
   - Documentation et tests unitaires (Pytest > 80% coverage).

Utilise ces informations pour répondre aux questions de l'utilisateur sur le projet. Sois concis, professionnel et précis.
`;
