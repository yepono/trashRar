import { Sparkles, Trash2 } from 'lucide-react';
import { useTrashStore } from '../store/useTrashStore';
import logo from '../assets/logo_sin_fondo.png';

export const Navbar = () => {
  const { score, ecoPoints } = useTrashStore();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-[#fafafa]/95 backdrop-blur-xl border-b border-[#b51414]/20 px-6 sm:px-10 py-3.5 flex items-center justify-between shadow-[0_4px_24px_rgba(130,0,0,.08)] brand-reveal">
      {/* Contenedor del Logo y Eslogan */}
      <div className="flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fafafa] brand-pulse">
          <img src={logo} alt="Logo de trashRar" className="h-8 w-8 object-contain" />
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

    </nav>
  );
};