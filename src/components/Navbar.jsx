import React from 'react';
import { Sparkles, Trash2 } from 'lucide-react';
import { useTrashStore } from '../store/useTrashStore';

export const Navbar = () => {
  const { score, ecoPoints } = useTrashStore();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-red-200 px-6 sm:px-10 py-3.5 flex items-center justify-between shadow-sm">
      {/* Contenedor del Logo y Eslogan */}
      <div className="flex items-center space-x-3">
        <div className="bg-[#ed261a] p-2 rounded-lg text-white">
          <Trash2 className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xl font-black tracking-wider text-[#ed261a] block leading-none">
            trashRar
          </span>
          <p className="text-[10px] text-[#ed261a] font-bold uppercase tracking-wider mt-0.5 hidden sm:block">
            LA BASURA EN SU LUGAR
          </p>
        </div>
      </div>

      {/* Métricas e Indicadores en tiempo real */}
      <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono font-bold">
        <div className="flex items-center gap-1.5 text-[#ed261a]">
          <Trash2 className="w-4 h-4" />
          <span>RECOGIDAS: <strong className="text-[#450a0a]">{score}</strong></span>
        </div>
        <div className="flex items-center gap-1.5 text-[#991b1b]">
          <Sparkles className="w-4 h-4" />
          <span>ECO: <strong className="text-[#450a0a]">{ecoPoints}</strong></span>
        </div>
      </div>

      {/* Botón de Demostración */}
      <a 
        href="#persecucion"
        className="hidden sm:inline-flex items-center justify-center bg-[#ed261a] hover:bg-[#991b1b] text-white font-bold px-5 py-2 rounded-lg text-xs transition shadow-sm"
      >
        PROBAR DEMOSTRACIÓN
      </a>
    </nav>
  );
};