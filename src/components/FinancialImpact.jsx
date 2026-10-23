import { Check, ShieldCheck } from 'lucide-react';

export const FinancialImpact = () => {
  return (
    <section id="roi" className="editorial-section editorial-section--right section-wash section-rule py-24 px-6">
      <div className="editorial-heading mb-14">
        <span className="inline-flex rounded-full border border-[#b51414]/35 bg-[#b51414]/[0.06] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#b51414]">El modelo de negocio</span>
        <h2 className="text-4xl md:text-5xl font-black text-[#820000] mt-4 mb-4">Adquiere TrashRar</h2>
        <p className="max-w-xl text-[#b51414]">
          Suscripción todo incluido adaptada para mantener tu edificio impecable.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
        <div className="bg-[#fafafa] border-2 border-[#b51414] p-8 rounded-3xl flex flex-col justify-between shadow-[0_18px_50px_rgba(130,0,0,.1)] brand-reveal">
          <div>
            <h3 className="text-2xl font-bold text-[#820000] mb-2">Plan Enterprise RaaS</h3>
            <p className="text-[#b51414] text-sm mb-6">Robotics as a Service para corporativos e instalaciones de alta exigencia.</p>
            <div className="text-4xl font-black text-[#b51414] mb-6">$1,200 <span className="text-sm font-normal text-[#b51414]">USD / mes por unidad</span></div>
            <ul className="space-y-3 text-[#2b0909] text-sm mb-8">
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#e51010]" /><span>Hardware inteligente trashRar incluido</span></li>
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#e51010]" /><span>Actualizaciones de software OTA y mapa SLAM</span></li>
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#e51010]" /><span>Mantenimiento preventivo e IoT Cloud Dashboard</span></li>
            </ul>
          </div>
          <a href="#persecucion" className="w-full bg-[#b51414] hover:bg-[#e51010] text-[#fafafa] font-bold py-3 rounded-xl text-center transition shadow-md">
            Solicitar Demostración
          </a>
        </div>

        <div className="bg-[#fafafa] border border-[#b51414]/25 p-8 rounded-3xl flex flex-col justify-between shadow-[0_12px_30px_rgba(130,0,0,.08)] brand-reveal">
          <div>
            <h3 className="text-2xl font-bold text-[#820000] mb-2">Retorno de Inversión (ROI)</h3>
            <p className="text-[#b51414] text-sm mb-6">Análisis financiero proyectado para empresas.</p>
            <div className="space-y-4 text-[#2b0909] text-sm mb-6">
              <div className="flex justify-between border-b border-[#b51414]/20 pb-2">
                <span>Reducción en costos de limpieza:</span>
                <strong className="text-[#e51010]">45%</strong>
              </div>
              <div className="flex justify-between border-b border-[#b51414]/20 pb-2">
                <span>Periodo estimado de recuperación:</span>
                <strong className="text-[#820000]">14 meses</strong>
              </div>
              <div className="flex justify-between border-b border-[#b51414]/20 pb-2">
                <span>Garantía de uptime operativo:</span>
                <strong className="text-[#820000]">99.9%</strong>
              </div>
            </div>
          </div>
          <div className="bg-[#b51414]/10 border border-[#b51414]/25 p-4 rounded-xl flex items-center space-x-3">
            <ShieldCheck className="w-6 h-6 text-[#e51010] flex-shrink-0" />
            <p className="text-xs text-[#b51414] font-medium">Incluye reemplazo express en sitio en menos de 24 horas ante cualquier falla.</p>
          </div>
        </div>
      </div>
    </section>
  );
};