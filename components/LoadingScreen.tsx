import React, { useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#FF2D2080,transparent_35%),radial-gradient(circle_at_70%_40%,#F9731680,transparent_38%),radial-gradient(circle_at_40%_70%,#60A5FA55,transparent_40%)] blur-3xl"></div>
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_60%,transparent_70%),linear-gradient(240deg,rgba(255,255,255,0.05)_0%,transparent_55%)]"></div>

      <div className="relative flex flex-col items-center space-y-8">
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF2D20] via-[#F97316] to-[#60A5FA] opacity-30 blur-2xl animate-ping"></div>
          <div className="absolute inset-8 rounded-full bg-slate-900/60 backdrop-blur-lg border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.4)]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FF2D20] via-[#F97316] to-[#60A5FA] animate-[pulse_1.8s_ease-in-out_infinite] shadow-[0_0_0_12px_rgba(255,255,255,0.03)]"></div>
          </div>
          <div className="absolute inset-0 animate-[spin_14s_linear_infinite]">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.25)]"></div>
          </div>
          <div className="absolute inset-0 animate-[spin_10s_linear_infinite_reverse]">
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#F97316] shadow-[0_0_10px_3px_rgba(249,115,22,0.35)]"></div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-lg font-semibold tracking-[0.2em] uppercase text-slate-200">
            Synchronisation AUBE
          </p>
          <p className="text-sm text-slate-400 font-medium">
            Connexion aux sources temps réel, agrégation et préparation des
            signaux…
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-bold tracking-wide text-slate-300">
          <span className="h-2 w-2 rounded-full bg-lime-400 animate-ping"></span>
          <span>France Travail</span>
          <span className="h-2 w-2 rounded-full bg-sky-400 animate-ping [animation-delay:0.2s]"></span>
          <span>Insee</span>
          <span className="h-2 w-2 rounded-full bg-amber-300 animate-ping [animation-delay:0.4s]"></span>
          <span>DataNormandie</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
