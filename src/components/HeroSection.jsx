import { AlertTriangle, DollarSign, TrendingDown } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section id="problema" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 relative bg-[#fafafa]">
      <div className="relative z-10 max-w-4xl">
        
        <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight text-[#820000] mt-4 mb-6 brand-reveal">
          Frase de gancho
        </h1>
        
      </div>

      <div className="relative z-10 w-full max-w-4xl mt-14 mb-3 flex items-center gap-4 brand-reveal">
        <span className="h-px flex-1 bg-[#b51414]/25" />
        <span className="inline-flex items-center gap-2 rounded-full border border-[#b51414]/35 bg-[#b51414]/[0.06] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#b51414]">
          La problemática
        </span>
        <span className="h-px flex-1 bg-[#b51414]/25" />
      </div>

      <p className="relative z-10 max-w-2xl text-center text-sm leading-relaxed text-[#b51414] brand-reveal">
        Tres señales que muestran por qué la infraestructura pasiva ya no es suficiente.
      </p>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl w-full mt-8 text-left">
        <div className="bg-[#fafafa] border border-[#b51414]/25 p-5 rounded-2xl shadow-[0_12px_30px_rgba(130,0,0,.08)] brand-reveal">
          <DollarSign className="w-5 h-5 text-[#e51010] mb-4" />
          <p className="text-2xl font-black text-[#820000]">$4.2M USD</p>
          <p className="text-xs text-[#b51414] mt-1">Costo anual en infraestructura pasiva y limpieza manual.</p>
        </div>
        <div className="bg-[#fafafa] border border-[#b51414]/25 p-5 rounded-2xl shadow-[0_12px_30px_rgba(130,0,0,.08)] brand-reveal">
          <AlertTriangle className="w-5 h-5 text-[#e51010] mb-4" />
          <p className="text-2xl font-black text-[#820000]">68%</p>
          <p className="text-xs text-[#b51414] mt-1">De residuos quedan a más de 3 metros de un bote estático.</p>
        </div>
        <div className="bg-[#fafafa] border border-[#b51414]/25 p-5 rounded-2xl shadow-[0_12px_30px_rgba(130,0,0,.08)] brand-reveal">
          <TrendingDown className="w-5 h-5 text-[#e51010] mb-4" />
          <p className="text-2xl font-black text-[#820000]">+340%</p>
          <p className="text-xs text-[#b51414] mt-1">Incremento en captura al convertir el bote en agente activo.</p>
        </div>
      </div>
    </section>
  );
};