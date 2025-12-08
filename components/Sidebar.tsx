import React from "react";
import { LayoutDashboard, BarChart2, FileText, Bot, Settings, Home, PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  onToggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, collapsed, onToggleSidebar }) => {
  // Menu lateral qui gere le changement d'onglet dans l'application.
  const menuItems = [
    { id: "dashboard", label: "Vue d'ensemble", icon: LayoutDashboard },
    { id: "predictions", label: "Predictions", icon: FileText },
    { id: "assistant", label: "Assistant IA", icon: Bot },
  ];

  return (
    <div
      className={`${collapsed ? "w-20" : "w-64"} bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl z-10 transition-all duration-300`}
    >
      <div className={`${collapsed ? "p-4" : "p-6"} border-b border-slate-800 space-y-3`}>
        <div className={`flex items-center ${collapsed ? "justify-center" : "space-x-3"}`}>
          <img
            src="/logo_white.svg"
            alt="Aube"
            className={`${collapsed ? "w-8 h-8" : "w-10 h-10"} rounded-xl`}
          />
          {!collapsed && (
            <div>
              <p className="text-lg font-bold tracking-tight text-white">AUBE</p>
            </div>
          )}
        </div>
        <button
          onClick={onToggleSidebar}
          aria-label={collapsed ? "Agrandir la barre laterale" : "Reduire la barre laterale"}
          className="inline-flex items-center justify-center h-10 w-10 rounded-xl text-white hover:bg-white/10 transition-all"
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              aria-label={item.label}
              className={`w-full flex items-center ${collapsed ? "justify-center px-0" : "space-x-3 px-4"} py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} />
              {!collapsed && <span className="font-semibold text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <button
          onClick={() => setActiveTab("landing")}
          aria-label="Retour Accueil"
          className={`w-full flex items-center ${collapsed ? "justify-center px-0" : "space-x-3 px-4"} py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors`}
        >
          <Home size={18} />
          {!collapsed && <span className="text-sm font-bold">Retour Accueil</span>}
        </button>
        {!collapsed && (
          <div className="flex items-center space-x-3 text-slate-400 px-4 py-2">
            <Settings size={18} />
            <span className="text-sm font-medium">v1.0.2 (Prod)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
