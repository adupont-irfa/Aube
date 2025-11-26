import React from 'react';
import { MODEL_METRICS } from '../constants';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';
import { Cpu, GitMerge, Zap } from 'lucide-react';

const ModelAnalysis: React.FC = () => {
  const radarData = [
    { subject: 'Précision', A: 85, B: 92, fullMark: 100 },
    { subject: 'Stabilité', A: 98, B: 85, fullMark: 100 },
    { subject: 'Saisonnalité', A: 95, B: 80, fullMark: 100 },
    { subject: 'Réactivité', A: 70, B: 95, fullMark: 100 },
    { subject: 'Long terme', A: 75, B: 90, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Performance des Modèles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MODEL_METRICS.map((model, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg ${idx === 2 ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-600'}`}>
                    {idx === 0 ? <ActivityIcon /> : idx === 1 ? <Cpu size={20} /> : <GitMerge size={20} />}
                </div>
                <h3 className="font-bold text-lg text-slate-800">{model.modelName}</h3>
              </div>
              <p className="text-sm text-slate-500 mb-4 h-10">{model.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <span className="text-xs text-slate-400 block">RMSE</span>
                <span className="text-xl font-bold text-slate-700">{model.rmse}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">MAPE</span>
                <span className="text-xl font-bold text-green-600">{model.mape}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Comparatif : SARIMA vs LSTM</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="SARIMA" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Radar name="LSTM" dataKey="B" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Erreur Absolue Moyenne (MAPE)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MODEL_METRICS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="modelName" hide />
                <YAxis unit="%" />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="mape" fill="#3b82f6" barSize={50} radius={[4, 4, 0, 0]}>
                   {MODEL_METRICS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? '#10b981' : '#64748b'} />
                  ))}
                </Bar>
                <Legend payload={[
                    { value: 'SARIMA/LSTM (Base)', type: 'rect', color: '#64748b' },
                    { value: 'Ensemble Voting (Final)', type: 'rect', color: '#10b981' }
                ]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 mt-4 text-center">
            Le modèle Ensemble réduit le MAPE à environ 10%, surpassant les modèles individuels.
          </p>
        </div>
      </div>
    </div>
  );
};

const ActivityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
)

export default ModelAnalysis;