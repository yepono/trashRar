import { Sparkles, Trash2 } from 'lucide-react';
import { useTrashStore } from '../store/useTrashStore';

export const Navbar = () => {
  const { score, ecoPoints } = useTrashStore();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-[#fafafa]/95 backdrop-blur-xl border-b border-[#b51414]/20 px-6 sm:px-10 py-3.5 flex items-center justify-between shadow-[0_4px_24px_rgba(130,0,0,.08)] brand-reveal">
      {/* Contenedor del Logo y Eslogan */}
      <div className="flex items-center space-x-3">
        <div className="bg-[#820000] p-2 rounded-lg text-[#fafafa] brand-pulse">
          <Trash2 className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xl font-black tracking-wider text-[#820000] block leading-none">
            trashRar
          </span>
          <p className="text-[10px] text-[#b51414] font-bold uppercase tracking-wider mt-0.5 hidden sm:block">
            LA BASURA EN SU LUGAR
          </p>
        </div>
      </div>

      {/* Métricas e Indicadores en tiempo real */}
      <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono font-bold">
        <div className="flex items-center gap-1.5 text-[#e51010]">
          <Trash2 className="w-4 h-4" />
          <span>RECOGIDAS: <strong className="text-[#820000]">{score}</strong></span>
        </div>
        <div className="flex items-center gap-1.5 text-[#e51010]">
          <Sparkles className="w-4 h-4" />
          <span>ECO: <strong className="text-[#820000]">{ecoPoints}</strong></span>
        </div>
      </div>

      {/* Botón de Demostración */}
      <a 
        href="#persecucion"
        className="hidden sm:inline-flex items-center justify-center bg-[#820000] hover:bg-[#b51414] text-[#fafafa] font-bold px-5 py-2 rounded-lg text-xs transition shadow-md"
      >
        PROBAR DEMOSTRACIÓN
      </a>
    </nav>
  );
};