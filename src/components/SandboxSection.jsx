import React, { useState } from 'react';
import { Bot } from 'lucide-react';

export const SandboxSection = () => {
  const [speed, setSpeed] = useState('Normal');

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto bg-white border-y border-red-200">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#ed261a] mb-4">Modos de Respuesta Adaptativa</h2>
          <p className="text-[#991b1b] mb-6">
            Configura el comportamiento del robot trashRar según las políticas de flujo de personas de tu edificio o corporativo.
          </p>
          <div className="space-y-4">
            <div className="bg-[#f8fafc] p-4 rounded-xl border border-red-200 flex items-center justify-between">
              <div>
                <h4 className="text-[#450a0a] font-bold text-sm">Modo Veloz (Alta Afluencia)</h4>
                <p className="text-xs text-[#991b1b]">Ideal para horas de entrada y salida en corporativos.</p>
              </div>
              <button 
                onClick={() => setSpeed('Veloz')} 
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${speed === 'Veloz' ? 'bg-[#ed261a] text-white' : 'bg-white border border-red-200 text-[#450a0a]'}`}
              >
                Activar
              </button>
            </div>
            <div className="bg-[#f8fafc] p-4 rounded-xl border border-red-200 flex items-center justify-between">
              <div>
                <h4 className="text-[#450a0a] font-bold text-sm">Modo Discreto (Oficinas Ejecutivas)</h4>
                <p className="text-xs text-[#991b1b]">Movimiento silencioso y persecución a velocidad moderada.</p>
              </div>
              <button 
                onClick={() => setSpeed('Normal')} 
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${speed === 'Normal' ? 'bg-[#ed261a] text-white' : 'bg-white border border-red-200 text-[#450a0a]'}`}
              >
                Activar
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[#f8fafc] border-2 border-[#ed261a] p-8 rounded-3xl relative shadow-md">
          <div className="flex items-center space-x-3 mb-6">
            <Bot className="w-8 h-8 text-[#ed261a]" />
            <div>
              <h3 className="text-[#450a0a] font-bold">Estado del Sistema IoT</h3>
              <p className="text-xs text-[#ed261a] font-bold">● Conectado a la Red Cloud</p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-[#450a0a]">
            <div className="flex justify-between border-b border-red-200 pb-2">
              <span>Modo actual:</span>
              <strong className="text-[#ed261a]">{speed}</strong>
            </div>
            <div className="flex justify-between border-b border-red-200 pb-2">
              <span>Batería solar:</span>
              <strong className="text-[#450a0a]">98%</strong>
            </div>
            <div className="flex justify-between border-b border-red-200 pb-2">
              <span>Capacidad de compactación:</span>
              <strong className="text-[#450a0a]">14%</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};