import React from 'react';
import { LayoutDashboard, BarChart2, FileText, Bot, Settings, Home } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Vue d\'ensemble', icon: LayoutDashboard },
    { id: 'predictions', label: 'Prédictions (6 mois)', icon: FileText },
    { id: 'models', label: 'Performance Modèles', icon: BarChart2 },
    { id: 'assistant', label: 'Assistant IA', icon: Bot },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl z-10">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent uppercase">
          AUBE
        </h1>
        <p className="text-xs font-semibold tracking-wide text-slate-400 mt-1">Prédictions de Tensions</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-semibold text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <button 
            onClick={() => setActiveTab('landing')}
            className="w-full flex items-center space-x-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
            <Home size={18} />
            <span className="text-sm font-bold">Retour Accueil</span>
        </button>
        <div className="flex items-center space-x-3 text-slate-400 px-4 py-2">
          <Settings size={18} />
          <span className="text-sm font-medium">v1.0.4 (Prod)</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;