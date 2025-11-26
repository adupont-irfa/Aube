import React from 'react';
import { MOCK_PREDICTIONS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, TrendingUp, Users, Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  const criticalCount = MOCK_PREDICTIONS.filter(p => p.predictedTension6Months > 1.5).length;
  const avgConfidence = (MOCK_PREDICTIONS.reduce((acc, curr) => acc + curr.modelConfidence, 0) / MOCK_PREDICTIONS.length * 100).toFixed(1);
  
  const chartData = MOCK_PREDICTIONS.map(p => ({
    name: p.zone,
    tension: p.predictedTension6Months,
    job: p.jobTitle
  })).sort((a, b) => b.tension - a.tension).slice(0, 6); // Top 6 critical

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Métiers en Tension Critique</p>
              <h3 className="text-3xl font-bold text-red-600 mt-2">{criticalCount}</h3>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Prévision à +6 mois</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Confiance Modèle (Ensemble)</p>
              <h3 className="text-3xl font-bold text-blue-600 mt-2">{avgConfidence}%</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Activity className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Pondération: LSTM 60% / SARIMA 40%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Zones d'Emploi Suivies</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">24</h3>
            </div>
            <div className="p-3 bg-slate-100 rounded-lg">
              <Users className="text-slate-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Couverture Région Normandie</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Tendance Globale</p>
              <h3 className="text-3xl font-bold text-orange-500 mt-2">+12%</h3>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Demande vs Trimestre dernier</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Top Zones en Tension (Score &gt; 1.5)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 2.5]} />
                <YAxis dataKey="zone" type="category" width={100} tick={{fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: 'transparent'}}
                />
                <Bar dataKey="tension" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={30}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.tension > 1.5 ? '#ef4444' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Dernière Mise à Jour</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-slate-500 text-sm">France Travail API</span>
              <span className="text-green-600 text-xs font-semibold px-2 py-1 bg-green-50 rounded-full">En temps réel</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-slate-500 text-sm">Dares Indicateurs</span>
              <span className="text-orange-600 text-xs font-semibold px-2 py-1 bg-orange-50 rounded-full">Lag 90j (Estimé)</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-slate-500 text-sm">INSEE Stats</span>
              <span className="text-slate-600 text-xs font-semibold px-2 py-1 bg-slate-100 rounded-full">Annuel</span>
            </div>
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-500 mb-2 font-semibold">NOTE TECHNIQUE</p>
              <p className="text-xs text-slate-400">
                Les indicateurs Dares sont interpolés mensuellement pour alimenter le modèle Ensemble (Voting).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
