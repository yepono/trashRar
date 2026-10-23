import React from 'react';
import { AlertTriangle, DollarSign, Play, Sparkles, TrendingDown } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section id="problema" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 relative">
      <div className="relative z-10 max-w-4xl">
        <span className="inline-flex items-center gap-2 bg-[#fee2e2] text-[#ed261a] border border-red-200 px-4 py-2 rounded-full text-xs font-bold mb-6">
          <Sparkles className="w-4 h-4" /> Saneamiento público autónomo de nueva generación
        </span>
        
        <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight text-[#ed261a] mt-4 mb-6">
          La basura no debería buscar el bote...<br />
          ¡El bote debería buscar la basura!
        </h1>
        
        <p className="text-base md:text-lg text-[#991b1b] max-w-2xl mx-auto leading-relaxed font-medium">
          Mueve el cursor por la pantalla. Nuestro bote autónomo con IA rastrea, persigue y recoge los residuos antes de que contaminen tus instalaciones o las calles de la ciudad.
        </p>
        
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#persecucion" className="inline-flex items-center gap-2 px-6 py-3 bg-[#ed261a] text-white font-extrabold rounded-xl hover:bg-[#991b1b] transition shadow-md">
            <Play className="w-4 h-4 fill-current" /> Probar persecución en vivo
          </a>
          <a href="#roi" className="px-6 py-3 bg-white border border-red-200 text-[#450a0a] font-bold rounded-xl hover:bg-[#fee2e2] transition">
            Calcular ROI empresarial
          </a>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl w-full mt-16 text-left">
        <div className="bg-white border border-red-200 p-5 rounded-2xl shadow-sm">
          <DollarSign className="w-5 h-5 text-[#ed261a] mb-4" />
          <p className="text-2xl font-black text-[#450a0a]">$4.2M USD</p>
          <p className="text-xs text-[#991b1b] mt-1">Costo anual en infraestructura pasiva y limpieza manual.</p>
        </div>
        <div className="bg-white border border-red-200 p-5 rounded-2xl shadow-sm">
          <AlertTriangle className="w-5 h-5 text-[#ed261a] mb-4" />
          <p className="text-2xl font-black text-[#450a0a]">68%</p>
          <p className="text-xs text-[#991b1b] mt-1">De residuos quedan a más de 3 metros de un bote estático.</p>
        </div>
        <div className="bg-white border border-red-200 p-5 rounded-2xl shadow-sm">
          <TrendingDown className="w-5 h-5 text-[#ed261a] mb-4" />
          <p className="text-2xl font-black text-[#450a0a]">+340%</p>
          <p className="text-xs text-[#991b1b] mt-1">Incremento en captura al convertir el bote en agente activo.</p>
        </div>
      </div>
    </section>
  );
};