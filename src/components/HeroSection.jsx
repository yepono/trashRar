import React from 'react';
import { AlertTriangle, DollarSign, Play, Sparkles, TrendingDown } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section id="problema" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 relative">
      <div className="relative z-10 max-w-4xl">
        
        <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight text-[#ed261a] mt-4 mb-6">
          Frase de gancho
        </h1>
        
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