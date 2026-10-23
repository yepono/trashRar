import React, { useState } from 'react';
import { Bot } from 'lucide-react';

export const SandboxSection = () => {
  const [speed, setSpeed] = useState('Normal');

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto bg-[#fafafa] border-y border-[#b51414]/20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#820000] mb-4">Modos de Respuesta Adaptativa</h2>
          <p className="text-[#b51414] mb-6 font-medium">
            Configura el comportamiento del robot trashRar según las políticas de flujo de personas de tu edificio o corporativo.
          </p>
          <div className="space-y-4">
            <div className="bg-[#fafafa] p-4 rounded-xl border border-[#b51414]/20 flex items-center justify-between shadow-sm">
              <div>
                <h4 className="text-[#820000] font-bold text-sm">Modo Veloz (Alta Afluencia)</h4>
                <p className="text-xs text-[#b51414] font-medium">Ideal para horas de entrada y salida en corporativos.</p>
              </div>
              <button 
                onClick={() => setSpeed('Veloz')} 
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${speed === 'Veloz' ? 'bg-[#b51414] hover:bg-[#e51010] text-white' : 'bg-[#fafafa] border border-[#b51414]/30 text-[#820000]'}`}
              >
                Activar
              </button>
            </div>
            <div className="bg-[#fafafa] p-4 rounded-xl border border-[#b51414]/20 flex items-center justify-between shadow-sm">
              <div>
                <h4 className="text-[#820000] font-bold text-sm">Modo Discreto (Oficinas Ejecutivas)</h4>
                <p className="text-xs text-[#b51414] font-medium">Movimiento silencioso y persecución a velocidad moderada.</p>
              </div>
              <button 
                onClick={() => setSpeed('Normal')} 
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${speed === 'Normal' ? 'bg-[#b51414] hover:bg-[#e51010] text-white' : 'bg-[#fafafa] border border-[#b51414]/30 text-[#820000]'}`}
              >
                Activar
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[#fafafa] border-2 border-[#b51414] p-8 rounded-3xl relative shadow-md">
          <div className="flex items-center space-x-3 mb-6">
            <Bot className="w-8 h-8 text-[#e51010]" />
            <div>
              <h3 className="text-[#820000] font-bold">Estado del Sistema IoT</h3>
              <p className="text-xs text-[#e51010] font-bold">● Conectado a la Red Cloud</p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-[#b51414]">
            <div className="flex justify-between border-b border-[#b51414]/20 pb-2">
              <span className="font-medium">Modo actual:</span>
              <strong className="text-[#820000]">{speed}</strong>
            </div>
            <div className="flex justify-between border-b border-[#b51414]/20 pb-2">
              <span className="font-medium">Batería solar:</span>
              <strong className="text-[#820000]">98%</strong>
            </div>
            <div className="flex justify-between border-b border-[#b51414]/20 pb-2">
              <span className="font-medium">Capacidad de compactación:</span>
              <strong className="text-[#820000]">14%</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};