import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';

export const FinancialImpact = () => {
  return (
    <section id="roi" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="bg-[#fee2e2] text-[#ed261a] border border-red-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          Modelo de Negocio RaaS
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-[#ed261a] mt-4 mb-4">ROI e impacto financiero</h2>
        <p className="text-[#991b1b]">
          Sin costos iniciales elevados de CapEx. Suscripción todo incluido adaptada para mantener tu edificio impecable.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-white border-2 border-[#ed261a] p-8 rounded-3xl flex flex-col justify-between shadow-md">
          <div>
            <h3 className="text-2xl font-bold text-[#450a0a] mb-2">Plan Enterprise RaaS</h3>
            <p className="text-[#991b1b] text-sm mb-6">Robotics as a Service para corporativos e instalaciones de alta exigencia.</p>
            <div className="text-4xl font-black text-[#ed261a] mb-6">$1,200 <span className="text-sm font-normal text-[#991b1b]">USD / mes por unidad</span></div>
            <ul className="space-y-3 text-[#450a0a] text-sm mb-8">
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#ed261a]" /><span>Hardware inteligente trashRar incluido</span></li>
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#ed261a]" /><span>Actualizaciones de software OTA y mapa SLAM</span></li>
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#ed261a]" /><span>Mantenimiento preventivo e IoT Cloud Dashboard</span></li>
            </ul>
          </div>
          <a href="#persecucion" className="w-full bg-[#ed261a] hover:bg-[#991b1b] text-white font-bold py-3 rounded-xl text-center transition shadow-sm">
            Solicitar Demostración
          </a>
        </div>

        <div className="bg-white border border-red-200 p-8 rounded-3xl flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="text-2xl font-bold text-[#450a0a] mb-2">Retorno de Inversión (ROI)</h3>
            <p className="text-[#991b1b] text-sm mb-6">Análisis financiero proyectado para empresas.</p>
            <div className="space-y-4 text-[#450a0a] text-sm mb-6">
              <div className="flex justify-between border-b border-red-100 pb-2">
                <span>Reducción en costos de limpieza:</span>
                <strong className="text-[#ed261a]">45%</strong>
              </div>
              <div className="flex justify-between border-b border-red-100 pb-2">
                <span>Periodo estimado de recuperación:</span>
                <strong className="text-[#450a0a]">14 meses</strong>
              </div>
              <div className="flex justify-between border-b border-red-100 pb-2">
                <span>Garantía de uptime operativo:</span>
                <strong className="text-[#450a0a]">99.9%</strong>
              </div>
            </div>
          </div>
          <div className="bg-[#fee2e2] border border-red-200 p-4 rounded-xl flex items-center space-x-3">
            <ShieldCheck className="w-6 h-6 text-[#ed261a] flex-shrink-0" />
            <p className="text-xs text-[#991b1b] font-medium">Incluye reemplazo express en sitio en menos de 4 horas ante cualquier falla.</p>
          </div>
        </div>
      </div>
    </section>
  );
};