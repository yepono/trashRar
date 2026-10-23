import React from 'react';
import { Sparkles, Trash2 } from 'lucide-react';
import { useTrashStore } from '../store/useTrashStore';

export const Navbar = () => {
  const { score, ecoPoints } = useTrashStore();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl bg-slate-900/85 backdrop-blur-xl border border-emerald-500/30 px-4 sm:px-6 py-3 rounded-2xl sm:rounded-full flex flex-wrap items-center justify-between gap-3 shadow-2xl shadow-emerald-950/30">
      <div className="flex items-center space-x-3">
        <div className="bg-emerald-500 p-2 rounded-lg text-slate-950 shadow-lg shadow-emerald-500/30">
          <Trash2 className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <span className="text-lg font-black tracking-wider text-white">trash<span className="text-emerald-400">Rar</span></span>
          <p className="text-[10px] text-slate-400 hidden sm:block">SISTEMA DE LIMPIEZA ACTIVA</p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5 text-[10px] sm:text-xs font-mono">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <Trash2 className="w-3.5 h-3.5" />
          <span>RECOGIDAS: <strong className="text-white">{score}</strong></span>
        </div>
        <div className="flex items-center gap-1.5 text-teal-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ECO: <strong className="text-white">{ecoPoints}</strong></span>
        </div>
      </div>

      <a 
        href="#persecucion"
        className="hidden sm:block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs shadow-md transition"
      >
        PROBAR DEMOSTRACIÓN
      </a>
    </nav>
  );
};