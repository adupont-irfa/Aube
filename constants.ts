import { JobPrediction, ModelMetric, TensionLevel } from './types';

export const DEPARTMENTS = [
  { code: '14', name: 'Calvados' },
  { code: '27', name: 'Eure' },
  { code: '50', name: 'Manche' },
  { code: '61', name: 'Orne' },
  { code: '76', name: 'Seine-Maritime' }
];

export const MOCK_PREDICTIONS: JobPrediction[] = [
  { id: '1', romeCode: 'J1506', jobTitle: 'Infirmiers', zone: 'Caen', currentTension: 1.8, predictedTension6Months: 2.1, trend: 'up', modelConfidence: 0.92 },
  { id: '2', romeCode: 'M1805', jobTitle: 'Techniciens ingenierie', zone: 'Le Havre', currentTension: 1.4, predictedTension6Months: 1.9, trend: 'up', modelConfidence: 0.9 },
  { id: '3', romeCode: 'K1304', jobTitle: 'Aide a domicile', zone: 'Rouen', currentTension: 1.5, predictedTension6Months: 1.8, trend: 'up', modelConfidence: 0.86 },
  { id: '4', romeCode: 'D1202', jobTitle: 'Cuisiniers restauration', zone: 'Deauville', currentTension: 1.3, predictedTension6Months: 1.1, trend: 'down', modelConfidence: 0.88 },
  { id: '5', romeCode: 'N4102', jobTitle: 'Techniciens administratifs', zone: 'Evreux', currentTension: 1.0, predictedTension6Months: 1.2, trend: 'up', modelConfidence: 0.84 },
  { id: '6', romeCode: 'D1505', jobTitle: 'Serveurs', zone: 'Caen', currentTension: 1.1, predictedTension6Months: 1.3, trend: 'up', modelConfidence: 0.82 },
  { id: '7', romeCode: 'N1103', jobTitle: 'Agents dentretien', zone: 'Lisieux', currentTension: 1.0, predictedTension6Months: 1.2, trend: 'up', modelConfidence: 0.83 },
  { id: '8', romeCode: 'H2902', jobTitle: 'Soudeurs', zone: 'Cherbourg', currentTension: 1.2, predictedTension6Months: 1.6, trend: 'up', modelConfidence: 0.87 },
  { id: '9', romeCode: 'H1203', jobTitle: 'Ouvriers polyvalents', zone: 'Avranches', currentTension: 0.9, predictedTension6Months: 1.0, trend: 'stable', modelConfidence: 0.8 },
  { id: '10', romeCode: 'M1607', jobTitle: 'Techniciens maintenance navale', zone: 'Cherbourg', currentTension: 1.3, predictedTension6Months: 1.7, trend: 'up', modelConfidence: 0.9 },
  { id: '11', romeCode: 'F1104', jobTitle: 'Macons', zone: 'Rouen', currentTension: 1.4, predictedTension6Months: 1.6, trend: 'up', modelConfidence: 0.85 },
  { id: '12', romeCode: 'N1201', jobTitle: 'Vendeurs commerce', zone: 'Dieppe', currentTension: 0.8, predictedTension6Months: 0.9, trend: 'stable', modelConfidence: 0.78 },
  { id: '13', romeCode: 'H2301', jobTitle: 'Conducteurs poids lourds', zone: 'Le Havre', currentTension: 1.1, predictedTension6Months: 1.4, trend: 'up', modelConfidence: 0.88 },
  { id: '14', romeCode: 'A1414', jobTitle: 'Techniciens agricoles', zone: 'Alencon', currentTension: 0.9, predictedTension6Months: 1.1, trend: 'stable', modelConfidence: 0.79 },
  { id: '15', romeCode: 'I1301', jobTitle: 'Maintenance industrielle', zone: 'Vernon', currentTension: 1.0, predictedTension6Months: 1.3, trend: 'up', modelConfidence: 0.86 },
];

export const MODEL_METRICS: ModelMetric[] = [
  { modelName: 'SARIMA (Baseline)', rmse: 150, mape: 12, description: 'Statistique, gestion saisonnalite' },
  { modelName: 'LSTM (Deep Learning)', rmse: 135, mape: 9.8, description: 'Reseaux de neurones recurrents' },
  { modelName: 'Ensemble Voting', rmse: 140, mape: 10, description: 'Combinaison ponderee (40% SARIMA, 60% LSTM)' },
];
