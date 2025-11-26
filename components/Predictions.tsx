import React, { useState } from 'react';
import { MOCK_PREDICTIONS } from '../constants';
import { TrendingUp, TrendingDown, Minus, Search } from 'lucide-react';

const Predictions: React.FC = () => {
  // Page listant les prédictions par métier avec filtrage et indicateurs.
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = MOCK_PREDICTIONS.filter(p => 
    p.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTrendIcon = (trend: string) => {
    // Sélectionne l’icône de tendance à afficher selon la direction du signal.
    switch (trend) {
      case 'up': return <TrendingUp className="text-red-500" size={16} />;
      case 'down': return <TrendingDown className="text-green-500" size={16} />;
      default: return <Minus className="text-slate-400" size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Prédictions à 6 Mois</h2>
          <p className="text-slate-500 mt-1">Projection des tensions par métier et zone d'emploi</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher un métier..." 
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Code ROME</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Intitulé du Poste</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Zone</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Tension Actuelle</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Prévision (+6M)</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Tendance</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Confiance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-mono text-slate-500">{job.romeCode}</td>
                  <td className="py-4 px-6 text-sm font-medium text-slate-900">{job.jobTitle}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{job.zone}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                      {job.currentTension}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      job.predictedTension6Months > 1.5 
                        ? 'bg-red-100 text-red-700' 
                        : job.predictedTension6Months > 1.0 
                        ? 'bg-orange-100 text-orange-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {job.predictedTension6Months}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(job.trend)}
                      <span className="capitalize text-xs text-slate-500">{job.trend === 'up' ? 'Hausse' : job.trend === 'down' ? 'Baisse' : 'Stable'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="w-full bg-slate-200 rounded-full h-1.5 w-24">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full" 
                        style={{ width: `${job.modelConfidence * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            Aucun résultat trouvé pour "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Predictions;
