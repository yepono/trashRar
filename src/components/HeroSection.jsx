import React from 'react';
import { AlertTriangle, DollarSign, Play, Sparkles, TrendingDown } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section id="problema" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 relative">
      <div className="relative z-10 max-w-4xl">
        <span className="inline-flex items-center gap-2 bg-[#fafafa] text-[#820000] border border-[#b51414]/20 px-4 py-2 rounded-full text-xs font-bold mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-[#e51010]" /> Saneamiento público autónomo de nueva generación
        </span>
        
        <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight text-[#820000] mt-4 mb-6">
          La basura no debería buscar el bote...<br />
          ¡El bote debería buscar la basura!
        </h1>
        
        <p className="text-base md:text-lg text-[#b51414] max-w-2xl mx-auto leading-relaxed font-semibold">
          Mueve el cursor por la pantalla. Nuestro bote autónomo con IA rastrea, persigue y recoge los residuos antes de que contaminen tus instalaciones o las calles de la ciudad.
        </p>
        
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#persecucion" className="inline-flex items-center gap-2 px-6 py-3 bg-[#b51414] text-white font-extrabold rounded-xl hover:bg-[#e51010] transition shadow-md">
            <Play className="w-4 h-4 fill-current" /> Probar persecución en vivo
          </a>
          <a href="#roi" className="px-6 py-3 bg-[#fafafa] border border-[#b51414]/30 text-[#820000] font-bold rounded-xl hover:bg-[#e51010] hover:text-white transition shadow-sm">
            Calcular ROI empresarial
          </a>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl w-full mt-16 text-left">
        <div className="bg-[#fafafa] border border-[#b51414]/20 p-5 rounded-2xl shadow-sm">
          <DollarSign className="w-5 h-5 text-[#e51010] mb-4" />
          <p className="text-2xl font-black text-[#820000]">$4.2M USD</p>
          <p className="text-xs text-[#b51414] mt-1 font-medium">Costo anual en infraestructura pasiva y limpieza manual.</p>
        </div>
        <div className="bg-[#fafafa] border border-[#b51414]/20 p-5 rounded-2xl shadow-sm">
          <AlertTriangle className="w-5 h-5 text-[#e51010] mb-4" />
          <p className="text-2xl font-black text-[#820000]">68%</p>
          <p className="text-xs text-[#b51414] mt-1 font-medium">De residuos quedan a más de 3 metros de un bote estático.</p>
        </div>
        <div className="bg-[#fafafa] border border-[#b51414]/20 p-5 rounded-2xl shadow-sm">
          <TrendingDown className="w-5 h-5 text-[#e51010] mb-4" />
          <p className="text-2xl font-black text-[#820000]">+340%</p>
          <p className="text-xs text-[#b51414] mt-1 font-medium">Incremento en captura al convertir el bote en agente activo.</p>
        </div>
      </div>
    </section>
  );
};