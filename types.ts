export enum TensionLevel {
  CRITICAL = 'Critique',
  HIGH = 'Élevée',
  MODERATE = 'Modérée',
  LOW = 'Faible'
}

export interface ZoneEmploi {
  id: string;
  name: string;
  department: string; // 14, 27, 50, 61, 76
}

export interface JobPrediction {
  id: string;
  romeCode: string;
  jobTitle: string;
  zone: string;
  currentTension: number;
  predictedTension6Months: number; // > 1.5 is critical
  trend: 'up' | 'down' | 'stable';
  modelConfidence: number;
}

export interface ModelMetric {
  modelName: string;
  rmse: number;
  mape: number;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}