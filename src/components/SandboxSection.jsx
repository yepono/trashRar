import React, { useState } from 'react';
import { Bot, Zap, Shield, RefreshCw } from 'lucide-react';

export const SandboxSection = () => {
  const [speed, setSpeed] = useState('Normal');

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto bg-slate-900/40 border-y border-slate-800">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Modos de Respuesta Adaptativa</h2>
          <p className="text-slate-300 mb-6">
            Configura el comportamiento del robot trashRar según las políticas de flujo de personas de tu edificio o corporativo.
          </p>
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold text-sm">Modo Veloz (Alta Afluencia)</h4>
                <p className="text-xs text-slate-400">Ideal para horas de entrada y salida en corporativos.</p>
              </div>
              <button 
                onClick={() => setSpeed('Veloz')} 
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${speed === 'Veloz' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
              >
                Activar
              </button>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold text-sm">Modo Discreto (Oficinas Ejecutivas)</h4>
                <p className="text-xs text-slate-400">Movimiento silencioso y persecución a velocidad moderada.</p>
              </div>
              <button 
                onClick={() => setSpeed('Normal')} 
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${speed === 'Normal' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
              >
                Activar
              </button>
            </div>
          </div>
        </div>
        <div className="bg-slate-950 border border-emerald-500/30 p-8 rounded-3xl relative">
          <div className="flex items-center space-x-3 mb-6">
            <Bot className="w-8 h-8 text-emerald-400" />
            <div>
              <h3 className="text-white font-bold">Estado del Sistema IoT</h3>
              <p className="text-xs text-emerald-400">● Conectado a la Red Cloud</p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Modo actual:</span>
              <strong className="text-emerald-400">{speed}</strong>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Batería solar:</span>
              <strong className="text-white">98%</strong>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Capacidad de compactación:</span>
              <strong className="text-white">14%</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};