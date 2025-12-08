import React from "react";
import { MOCK_PREDICTIONS } from "../constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { AlertTriangle, TrendingUp, TrendingDown, Users, Activity, Minus } from "lucide-react";

const Dashboard: React.FC = () => {
  // Vue principale qui synthetise les tensions et indicateurs clefs sur 6 mois.
  const criticalCount = MOCK_PREDICTIONS.filter((p) => p.predictedTension6Months > 1.5).length;
  const avgConfidence = (
    (MOCK_PREDICTIONS.reduce((acc, curr) => acc + curr.modelConfidence, 0) / MOCK_PREDICTIONS.length) * 100
  ).toFixed(1);
  const totalPredictions = MOCK_PREDICTIONS.length;
  const avgPredictedTension = (
    MOCK_PREDICTIONS.reduce((acc, curr) => acc + curr.predictedTension6Months, 0) / totalPredictions
  ).toFixed(2);
  const trendCounts = MOCK_PREDICTIONS.reduce<{ up: number; down: number; stable: number }>(
    (acc, curr) => {
      acc[curr.trend] += 1;
      return acc;
    },
    { up: 0, down: 0, stable: 0 }
  );
  const topPredictions = [...MOCK_PREDICTIONS]
    .sort((a, b) => b.predictedTension6Months - a.predictedTension6Months)
    .slice(0, 3);

  const aggregatedByZone = MOCK_PREDICTIONS.reduce<Record<string, { zone: string; sum: number; count: number }>>(
    (acc, curr) => {
      if (!acc[curr.zone]) {
        acc[curr.zone] = { zone: curr.zone, sum: 0, count: 0 };
      }
      acc[curr.zone].sum += curr.predictedTension6Months;
      acc[curr.zone].count += 1;
      return acc;
    },
    {}
  );

  const chartData = Object.values(aggregatedByZone)
    .map((zone) => ({
      zone: zone.zone,
      tension: Number((zone.sum / zone.count).toFixed(2)),
      count: zone.count,
    }))
    .filter((entry) => entry.tension > 1.5)
    .sort((a, b) => b.tension - a.tension)
    .slice(0, 6); // Top zones > 1.5 (moyenne)
  const today = new Date().toLocaleDateString("fr-FR");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
        <p className="text-sm text-slate-600">
          Collecte et analyse automatique des offres d'emploi normandes avec extraction semantique des competences
          requises.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Synthèse des prédictions</h3>
            <p className="text-sm text-slate-500">
              Agrégation des données présentes dans l'onglet prédictions.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase">Tension moyenne prévue</p>
            <p className="text-2xl font-bold text-blue-600">{avgPredictedTension}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase">Entrées total</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-2xl font-bold text-slate-900">{totalPredictions}</p>
              <Activity className="text-slate-500" size={20} />
            </div>
            <p className="text-xs text-slate-400">Métiers / zones suivis</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-100">
            <p className="text-xs font-semibold text-red-600 uppercase">En hausse</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-2xl font-bold text-red-700">{trendCounts.up}</p>
              <TrendingUp className="text-red-600" size={20} />
            </div>
            <p className="text-xs text-red-500">Signal de tension</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-100">
            <p className="text-xs font-semibold text-green-600 uppercase">En baisse</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-2xl font-bold text-green-700">{trendCounts.down}</p>
              <TrendingDown className="text-green-600" size={20} />
            </div>
            <p className="text-xs text-green-500">Tension qui se détend</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <p className="text-xs font-semibold text-slate-600 uppercase">Stables</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-2xl font-bold text-slate-800">{trendCounts.stable}</p>
              <Minus className="text-slate-500" size={20} />
            </div>
            <p className="text-xs text-slate-500">Variation neutre</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs text-slate-500 uppercase mb-3">Top 3 tensions prévisionnelles</p>
          <div className="space-y-3">
            {topPredictions.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">{p.jobTitle}</p>
                  <p className="text-xs text-slate-500">
                    {p.zone} - {p.romeCode}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">{p.predictedTension6Months}</p>
                  <div className="flex items-center justify-end space-x-2 mt-1">
                    {p.trend === "up" ? (
                      <TrendingUp className="text-red-500" size={16} />
                    ) : p.trend === "down" ? (
                      <TrendingDown className="text-green-500" size={16} />
                    ) : (
                      <Minus className="text-slate-400" size={16} />
                    )}
                    <span className="text-xs text-slate-500 capitalize">
                      {p.trend === "up" ? "hausse" : p.trend === "down" ? "baisse" : "stable"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Métiers en tension critique</p>
              <h3 className="text-3xl font-bold text-red-600 mt-2">{criticalCount}</h3>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Prévision +6 mois</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Confiance du modèle</p>
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
              <p className="text-sm font-medium text-slate-500">Zones d'emploi suivies</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">24</h3>
            </div>
            <div className="p-3 bg-slate-100 rounded-lg">
              <Users className="text-slate-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Couverture région Normandie</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Tendance globale</p>
              <h3 className="text-3xl font-bold text-orange-500 mt-2">+12%</h3>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Demande vs trimestre dernier</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Top zones en tension (Score &gt; 1.5)</h3>
          <p className="text-xs text-slate-500 mb-4">
            Moyenne des tensions prévues par zone a partir des données de l'onglet prédictions.
          </p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 2.5]} />
                <YAxis dataKey="zone" type="category" width={100} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  cursor={{ fill: "transparent" }}
                />
                <Bar dataKey="tension" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={30}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.tension > 1.5 ? "#ef4444" : "#3b82f6"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Dernière mise à jour</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-slate-500 text-sm">France Travail</span>
              <span className="text-slate-700 text-xs font-semibold px-2 py-1 bg-slate-100 rounded-full">{today}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-slate-500 text-sm">DARES</span>
              <span className="text-slate-700 text-xs font-semibold px-2 py-1 bg-slate-100 rounded-full">{today}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-slate-500 text-sm">INSEE</span>
              <span className="text-slate-700 text-xs font-semibold px-2 py-1 bg-slate-100 rounded-full">{today}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
