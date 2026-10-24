import { LifeBuoy, WifiOff, ShieldAlert } from 'lucide-react';

export const TechnicalSupport = () => {
  return (
    <section id="soporte" className="editorial-section editorial-section--left section-rule py-24 px-6 border-t border-[#b51414]/20 bg-[#fafafa]">
      <div className="editorial-heading mb-14">
        <span className="inline-flex rounded-full border border-[#b51414]/35 bg-[#b51414]/[0.06] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#b51414]">Respaldo operativo</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#820000] mt-4 mb-4">¿Qué pasa si algo sale mal?</h2>
        <p className="max-w-xl text-[#b51414]">Tres respuestas para mantener la operación activa.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 max-w-4xl">
        <div className="bg-[#fafafa] border border-[#b51414]/25 p-6 rounded-2xl shadow-[0_12px_30px_rgba(130,0,0,.08)] brand-reveal">
          <div className="text-[#e51010] mb-4 bg-[#b51414]/10 w-12 h-12 rounded-xl flex items-center justify-center">
            <WifiOff className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#820000] mb-2">Falla de red</h3>
          <p className="text-[#b51414] text-sm">Opera offline y sincroniza sus métricas al volver la conexión.</p>
        </div>

        <div className="bg-[#fafafa] border border-[#b51414]/25 p-6 rounded-2xl shadow-[0_12px_30px_rgba(130,0,0,.08)] brand-reveal">
          <div className="text-[#e51010] mb-4 bg-[#b51414]/10 w-12 h-12 rounded-xl flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#820000] mb-2">Atasco u obstrucción</h3>
          <p className="text-[#b51414] text-sm">Activa reversa automática y alerta al equipo de mantenimiento.</p>
        </div>

        <div className="bg-[#fafafa] border border-[#b51414]/25 p-6 rounded-2xl shadow-[0_12px_30px_rgba(130,0,0,.08)] brand-reveal">
          <div className="text-[#e51010] mb-4 bg-[#b51414]/10 w-12 h-12 rounded-xl flex items-center justify-center">
            <LifeBuoy className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#820000] mb-2">Soporte especializado</h3>
          <p className="text-[#b51414] text-sm">Diagnóstico remoto y reemplazo en sitio en menos de 24 horas.</p>
        </div>
      </div>

      <div className="mt-14 max-w-4xl text-left bg-[#fafafa] border-2 border-[#b51414] rounded-3xl p-8 md:p-12 shadow-[0_18px_50px_rgba(130,0,0,.1)] brand-reveal">
        <h3 className="text-2xl md:text-3xl font-black text-[#820000] mb-3">¿Listo para desplegar la recolección autónoma?</h3>
        <p className="text-[#b51414] max-w-xl mb-6">Programa un piloto para tu empresa o institución.</p>
        <a href="#persecucion" className="inline-flex items-center justify-center bg-[#b51414] hover:bg-[#e51010] text-[#fafafa] font-black px-6 py-3 rounded-xl transition shadow-md">
          Solicitar unidad de demostración
        </a>
      </div>
    </section>
  );
};