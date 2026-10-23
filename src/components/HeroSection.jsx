import React from 'react';
import { AlertTriangle, DollarSign, Play, Sparkles, TrendingDown } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section id="problema" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 relative overflow-hidden">
      {/* Resplandor radial rojo tenue */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_42%,rgba(237,38,26,0.12),transparent_38%)]" />
      
      <div className="relative z-10 max-w-4xl">
        <span className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/30 px-4 py-2 rounded-full text-xs font-semibold">
          <Sparkles className="w-4 h-4" /> Saneamiento público autónomo de nueva generación
        </span>
        
        <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight text-white mt-8 mb-6">
          La basura no debería buscar<br />
          el bote...<br />
          <span className="bg-gradient-to-r from-red-500 via-rose-400 to-orange-400 bg-clip-text text-transparent">
            ¡El bote debería buscar la basura!
          </span>
        </h1>
        
        <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Mueve el cursor por la pantalla. Nuestro bote autónomo con IA rastrea, persigue y recoge los residuos antes de que contaminen tus instalaciones o las calles de la ciudad.
        </p>
        
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#persecucion" className="inline-flex items-center gap-2 px-6 py-3 bg-[#ed261a] text-white font-extrabold rounded-xl hover:bg-[#ff382b] transition shadow-lg shadow-red-600/30">
            <Play className="w-4 h-4 fill-current" /> Probar persecución en vivo
          </a>
          <a href="#roi" className="px-6 py-3 bg-slate-900 border border-red-500/30 text-white font-bold rounded-xl hover:bg-slate-800 transition">
            Calcular ROI empresarial
          </a>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl w-full mt-16 text-left">
        <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl backdrop-blur-sm">
          <DollarSign className="w-5 h-5 text-red-500 mb-4" />
          <p className="text-2xl font-black text-white">$4.2M USD</p>
          <p className="text-xs text-slate-400 mt-1">Costo anual en infraestructura pasiva y limpieza manual.</p>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl backdrop-blur-sm">
          <AlertTriangle className="w-5 h-5 text-amber-400 mb-4" />
          <p className="text-2xl font-black text-white">68%</p>
          <p className="text-xs text-slate-400 mt-1">De residuos quedan a más de 3 metros de un bote estático.</p>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl backdrop-blur-sm">
          <TrendingDown className="w-5 h-5 text-rose-400 mb-4" />
          <p className="text-2xl font-black text-white">+340%</p>
          <p className="text-xs text-slate-400 mt-1">Incremento en captura al convertir el bote en agente activo.</p>
        </div>
      </div>

      <div className="absolute bottom-8 text-[10px] uppercase tracking-[0.25em] text-red-500/70">
        Mueve el cursor / haz clic para soltar basura
      </div>
    </section>
  );
};