import { useEffect, useRef, useState } from 'react';
import { Box, CupSoda, FileText, Package, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTrashStore } from '../store/useTrashStore';

const trashTypes = [
  { name: 'Botella', Icon: CupSoda },
  { name: 'Paquete', Icon: Package },
  { name: 'Caja', Icon: Box },
  { name: 'Papel', Icon: FileText },
];

export const InteractiveStory = () => {
  const { incrementScore, incrementEcoPoints, trashItems, addTrashItem, removeTrashItem, setIsChasing } = useTrashStore();
  const sectionRef = useRef(null);
  const [isChasing, setChaseActive] = useState(false);
  const [, setActiveStep] = useState(0);
  const [trashChance] = useState(1);

  useEffect(() => {
    const updatePhase = () => {
      const anatomy = document.getElementById('anatomia');
      if (!anatomy || !sectionRef.current) return;
      const anatomyBottom = anatomy.getBoundingClientRect().bottom + window.scrollY;
      const active = window.scrollY > anatomyBottom - window.innerHeight * 0.55;
      setChaseActive(active);
      setIsChasing(active);
    };

    updatePhase();
    window.addEventListener('scroll', updatePhase, { passive: true });
    window.addEventListener('resize', updatePhase);
    return () => {
      window.removeEventListener('scroll', updatePhase);
      window.removeEventListener('resize', updatePhase);
      setIsChasing(false);
    };
  }, [setIsChasing]);

  useEffect(() => {
    if (!isChasing) return undefined;

    const handlePageClick = (event) => {
      if (event.target.closest('button, a, input, [data-trash-item]')) return;
      if (Math.random() > trashChance) return;
      const trashType = trashTypes[Math.floor(Math.random() * trashTypes.length)];
      addTrashItem({
        id: Date.now() + Math.random(),
        x: event.clientX,
        y: event.clientY,
        trashType: trashType.name,
      });
      setActiveStep((step) => Math.min(2, step + 1));
    };

    document.addEventListener('click', handlePageClick);
    return () => document.removeEventListener('click', handlePageClick);
  }, [addTrashItem, isChasing, trashChance]);

  const collectTrash = (item) => {
    removeTrashItem(item.id);
    incrementScore();
    incrementEcoPoints(15);
    setActiveStep(trashItems.length <= 1 ? 3 : 2);
    confetti({ particleCount: 28, spread: 60, origin: { y: 0.75 } });
  };

  return (
    <section ref={sectionRef} id="persecucion" className="section-rule py-24 px-6 max-w-7xl mx-auto relative min-h-[760px]">
      {isChasing && trashItems.map((item) => (
        <div
          key={item.id}
          data-trash-item
          role="button"
          tabIndex={0}
          onClick={(event) => {
            event.stopPropagation();
            collectTrash(item);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') collectTrash(event);
          }}
          className="fixed z-50 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 brand-float"
          style={{ left: item.x, top: item.y }}
        >
          <img src="/trash-pile.svg" alt="Montículo de basura" className="w-20 h-auto drop-shadow-[0_10px_12px_rgba(130,0,0,.24)]" />
        </div>
      ))}

      {/* Encabezado de Sección */}
      <div className="text-center mb-10">
        <span className="inline-flex rounded-full border border-[#b51414]/35 bg-[#b51414]/[0.06] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#b51414]">La experiencia</span>
        <h2 className="text-3xl md:text-5xl font-black text-[#820000] mt-5 mb-3">
          La efectividad de TrashRar
        </h2>
        <p className="max-w-xl mx-auto text-sm leading-relaxed text-[#b51414]">Una demostración breve de cómo la solución transforma un residuo fuera de lugar en una acción medible.</p>
      </div>

      {/* Tarjetas de Pasos */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
        <div className="bg-[#fafafa] border border-[#b51414]/25 p-6 rounded-2xl shadow-[0_12px_30px_rgba(130,0,0,.08)] brand-reveal">
          <span className="text-[#e51010] text-xs font-mono font-bold">01 / SOLTAR</span>
          <h3 className="text-lg font-bold text-[#820000] mt-3">Una persona tira basura fuera de TrashRar</h3>
        </div>
        <div className="bg-[#fafafa] border border-[#b51414]/25 p-6 rounded-2xl shadow-[0_12px_30px_rgba(130,0,0,.08)] brand-reveal">
          <span className="text-[#e51010] text-xs font-mono font-bold">02 / SEGUIR</span>
          <h3 className="text-lg font-bold text-[#820000] mt-3">TrashRar te sigue para que regreses a colocar la basura en su lugar</h3>
        </div>
        <div className="bg-[#fafafa] border border-[#b51414]/25 p-6 rounded-2xl shadow-[0_12px_30px_rgba(130,0,0,.08)] brand-reveal">
          <span className="text-[#e51010] text-xs font-mono font-bold">03 / RECOGER</span>
          <h3 className="text-lg font-bold text-[#820000] mt-3">Recoges la basura y la depositas en TrashRar</h3>
        </div>
      </div>

      {/* Caja de Estado */}
      <div className="max-w-2xl mx-auto text-center bg-[#fafafa] border-2 border-[#b51414] rounded-3xl p-8 shadow-[0_16px_40px_rgba(130,0,0,.1)] brand-pulse">
        <Sparkles className="w-8 h-8 text-[#e51010] mx-auto mb-4" />
        <p className="text-[#820000] text-xl font-mono font-bold uppercase tracking-widest mb-3">PLAYGROUND</p>
      </div>
    </section>
  );
};