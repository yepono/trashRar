import React from 'react';
import { LifeBuoy, WifiOff, ShieldAlert } from 'lucide-react';

export const TechnicalSupport = () => {
  return (
    <section id="soporte" className="py-20 px-6 max-w-7xl mx-auto border-t border-red-200">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="bg-[#fee2e2] text-[#ed261a] border border-red-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          Soporte Biónico 24/7
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#ed261a] mt-4 mb-4">¿Qué pasa si algo sale mal?</h2>
        <p className="text-[#991b1b]">
          Diseñado con redundancia total para garantizar la operación continua de tus instalaciones sin interrupciones.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-red-200 p-6 rounded-2xl shadow-sm">
          <div className="text-[#ed261a] mb-4 bg-[#fee2e2] w-12 h-12 rounded-xl flex items-center justify-center">
            <WifiOff className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#450a0a] mb-2">Falla de Red o Conectividad</h3>
          <p className="text-[#991b1b] text-sm">trashRar opera de manera local con navegación LiDAR offline. Al restablecerse el internet, sincroniza automáticamente sus métricas con la nube.</p>
        </div>

        <div className="bg-white border border-red-200 p-6 rounded-2xl shadow-sm">
          <div className="text-[#ed261a] mb-4 bg-[#fee2e2] w-12 h-12 rounded-xl flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#450a0a] mb-2">Obstrucción o Atasco</h3>
          <p className="text-[#991b1b] text-sm">El sistema de compactador solar cuenta con reversa automática ante sobrecargas y alerta inmediata al equipo de mantenimiento del edificio.</p>
        </div>

        <div className="bg-white border border-red-200 p-6 rounded-2xl shadow-sm">
          <div className="text-[#ed261a] mb-4 bg-[#fee2e2] w-12 h-12 rounded-xl flex items-center justify-center">
            <LifeBuoy className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#450a0a] mb-2">Soporte Remoto y Físico</h3>
          <p className="text-[#991b1b] text-sm">Diagnóstico remoto vía telemetría y reemplazo de unidad en sitio en menos de 4 horas respaldado por nuestra garantía empresarial.</p>
        </div>
      </div>

      <div className="mt-16 text-center bg-white border-2 border-[#ed261a] rounded-3xl p-8 md:p-12 shadow-md">
        <h3 className="text-2xl md:text-3xl font-black text-[#ed261a] mb-3">¿Listo para desplegar la recolección autónoma?</h3>
        <p className="text-[#991b1b] max-w-xl mx-auto mb-6">Programa un piloto para tu corporativo, campus universitario o distrito municipal.</p>
        <a href="#persecucion" className="inline-flex items-center justify-center bg-[#ed261a] hover:bg-[#991b1b] text-white font-black px-6 py-3 rounded-xl transition shadow-sm">
          Solicitar unidad de demostración
        </a>
      </div>
    </section>
  );
};