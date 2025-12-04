import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Predictions from "./components/Predictions";
import ModelAnalysis from "./components/ModelAnalysis";
import Assistant from "./components/Assistant";
import LandingPage from "./components/LandingPage";
import LoadingScreen from "./components/LoadingScreen";

const App: React.FC = () => {
  // Composant principal qui orchestre la navigation entre les sections de l'application.
  const [activeTab, setActiveTab] = useState("landing");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (activeTab === "landing") {
    return <LandingPage onEnter={() => setActiveTab("loading")} />;
  }

  if (activeTab === "loading") {
    return <LoadingScreen onComplete={() => setActiveTab("dashboard")} />;
  }

  const renderContent = () => {
    // Selecteur de vue qui retourne le contenu associe a l'onglet actif.
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "predictions":
        return <Predictions />;
      case "models":
        return <ModelAnalysis />;
      case "assistant":
        return <Assistant />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
      />

      <main
        className={`flex-1 ${sidebarCollapsed ? "ml-20" : "ml-64"} p-8 overflow-y-auto transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {activeTab === "dashboard" && "Tableau de Bord"}
                {activeTab === "predictions" && "Detail des Predictions"}
                {activeTab === "models" && "Analyse des Modeles"}
                {activeTab === "assistant" && "Assistant IA Expert"}
              </h1>
              <p className="text-slate-500 text-sm font-medium mt-1">
                Region Normandie - Previsions a 6 mois
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Systeme Operationnel
              </span>
            </div>
          </header>

          <div className="fade-in-content">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default App;
