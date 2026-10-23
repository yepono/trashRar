import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Clone, useGLTF } from '@react-three/drei';
import { Box, CupSoda, FileText, Package, Sparkles, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTrashStore } from '../store/useTrashStore';

function PursuitModel() {
  const groupRef = useRef();
  const { scene: model } = useGLTF('/models/trashbin1objeto.glb');

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.55;
  });

  return (
    <group ref={groupRef}>
      <Center>
        <Clone object={model} scale={[1, 1, 1]} />
      </Center>
    </group>
  );
}

function PursuitBin({ position }) {
  return (
    <div
      data-pursuit-bin
      className="fixed z-40 w-36 h-36 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-[left,top] duration-75"
      style={{ left: position.x, top: position.y }}
    >
      <div className="absolute inset-0 rounded-full bg-[#e51010]/20 blur-xl animate-pulse" />
      <Canvas camera={{ position: [0, 1.2, 4], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 5, 4]} intensity={2} />
        <React.Suspense fallback={null}>
          <PursuitModel />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

export const InteractiveStory = () => {
  const { score, ecoPoints, incrementScore, incrementEcoPoints, trashItems, addTrashItem, removeTrashItem, setIsChasing } = useTrashStore();
  const sectionRef = useRef(null);
  const binPositionRef = useRef({ x: window.innerWidth - 90, y: window.innerHeight - 110 });
  const targetPositionRef = useRef({ x: window.innerWidth - 90, y: window.innerHeight - 110 });
  const [binPosition, setBinPosition] = useState(binPositionRef.current);
  const [isChasing, setChaseActive] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [chaseSpeed, setChaseSpeed] = useState(0.075);
  const [trashChance, setTrashChance] = useState(1);

  const trashTypes = [
    { name: 'Botella', Icon: CupSoda },
    { name: 'Paquete', Icon: Package },
    { name: 'Caja', Icon: Box },
    { name: 'Papel', Icon: FileText },
  ];

  const steps = [
    'Paso 1: Da clic en cualquier parte de esta sección para generar basura simulada en el suelo.',
    'Paso 2: El bote detecta la basura y comienza a perseguir tu cursor.',
    'Paso 3: Haz clic en cada residuo para que el bote lo recoja.',
    'Excelente. Las instalaciones están limpias y la métrica de eficiencia sube en tiempo real.',
  ];

  useEffect(() => {
    const updatePhase = () => {
      const anatomy = document.getElementById('anatomia');
      if (!anatomy || !sectionRef.current) return;
      const anatomyBottom = anatomy.getBoundingClientRect().bottom + window.scrollY;
      const active = window.scrollY > anatomyBottom - window.innerHeight * 0.55;
      setChaseActive(active);
      setIsChasing(active);
    };

    const handleMouseMove = (event) => {
      if (trashItems.length > 0) {
        targetPositionRef.current = { x: event.clientX, y: event.clientY };
      }
    };

    updatePhase();
    window.addEventListener('scroll', updatePhase, { passive: true });
    window.addEventListener('resize', updatePhase);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', updatePhase);
      window.removeEventListener('resize', updatePhase);
      window.removeEventListener('mousemove', handleMouseMove);
      setIsChasing(false);
    };
  }, [setIsChasing, trashItems.length]);

  useEffect(() => {
    let frameId;
    const animateBin = () => {
      const current = binPositionRef.current;
      const target = trashItems.length > 0
        ? targetPositionRef.current
        : { x: window.innerWidth - 72, y: window.innerHeight - 92 };
      current.x += (target.x - current.x) * chaseSpeed;
      current.y += (target.y - current.y) * chaseSpeed;
      setBinPosition({ x: current.x, y: current.y });
      frameId = requestAnimationFrame(animateBin);
    };
    frameId = requestAnimationFrame(animateBin);
    return () => cancelAnimationFrame(frameId);
  }, [chaseSpeed, trashItems.length]);

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
    <section ref={sectionRef} id="persecucion" className="py-24 px-6 max-w-7xl mx-auto relative min-h-[760px]">
      {isChasing && <PursuitBin position={binPosition} />}

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
          className="fixed z-50 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-2xl sm:text-3xl drop-shadow-md transition-transform hover:scale-125"
          style={{ left: item.x, top: item.y }}
        >
          {(() => {
            const trashType = trashTypes.find((type) => type.name === item.trashType) || trashTypes[0];
            return <trashType.Icon aria-label={trashType.name} className="w-8 h-8 text-[#e51010]" />;
          })()}
        </div>
      ))}

      <div className="text-center mb-10">
        <span className="bg-[#fafafa] text-[#820000] border border-[#b51414]/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          Arena interactiva
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-[#820000] mt-5 mb-3">
          Prueba la persecución del bote
        </h2>
        <p className="text-[#b51414] max-w-2xl mx-auto font-medium">
          Haz clic en una zona libre para soltar basura. Después, encuentra y haz clic en cada partícula para que el bote la recoja.
        </p>
        
        <div className="mt-6 inline-flex items-center gap-5 bg-[#fafafa] border border-[#b51414]/20 px-5 py-3 rounded-xl text-xs font-mono font-bold shadow-sm">
          <span className="text-[#e51010]"><Trash2 className="inline w-4 h-4 mr-1" /> RECOGIDAS: <strong className="text-[#820000]">{score}</strong></span>
          <span className="text-[#e51010]"><Sparkles className="inline w-4 h-4 mr-1" /> ECO: <strong className="text-[#820000]">{ecoPoints}</strong></span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mb-10 grid md:grid-cols-2 gap-4 bg-[#fafafa] border border-[#b51414]/20 rounded-2xl p-5 shadow-sm">
        <label className="text-left text-xs text-[#b51414] font-bold">
          <span className="flex justify-between mb-2"><span>Velocidad de persecución</span><strong className="text-[#820000]">{Math.round(chaseSpeed * 100)}%</strong></span>
          <input aria-label="Velocidad de persecución" type="range" min="0.03" max="0.16" step="0.005" value={chaseSpeed} onChange={(event) => setChaseSpeed(Number(event.target.value))} className="w-full accent-[#b51414]" />
        </label>
        <label className="text-left text-xs text-[#b51414] font-bold">
          <span className="flex justify-between mb-2"><span>Frecuencia de basura por clic</span><strong className="text-[#820000]">{Math.round(trashChance * 100)}%</strong></span>
          <input aria-label="Frecuencia de basura por clic" type="range" min="0.25" max="1" step="0.05" value={trashChance} onChange={(event) => setTrashChance(Number(event.target.value))} className="w-full accent-[#b51414]" />
        </label>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
        <div className="bg-[#fafafa] border border-[#b51414]/20 p-6 rounded-2xl shadow-sm">
          <span className="text-[#e51010] text-xs font-mono font-bold">01 / SOLTAR</span>
          <h3 className="text-lg font-bold text-[#820000] mt-3">Suelta basura</h3>
          <p className="text-sm text-[#b51414] mt-2 font-medium">Cada click sobre un espacio libre crea una partícula de basura.</p>
        </div>
        <div className="bg-[#fafafa] border border-[#b51414]/20 p-6 rounded-2xl shadow-sm">
          <span className="text-[#e51010] text-xs font-mono font-bold">02 / SEGUIR</span>
          <h3 className="text-lg font-bold text-[#820000] mt-3">El bote te sigue</h3>
          <p className="text-sm text-[#b51414] mt-2 font-medium">Sin residuos, el modelo espera en la esquina inferior derecha.</p>
        </div>
        <div className="bg-[#fafafa] border border-[#b51414]/20 p-6 rounded-2xl shadow-sm">
          <span className="text-[#e51010] text-xs font-mono font-bold">03 / RECOGER</span>
          <h3 className="text-lg font-bold text-[#820000] mt-3">Haz clic para recoger</h3>
          <p className="text-sm text-[#b51414] mt-2 font-medium">Haz clic en cada icono para levantarlo y sumar impacto.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto text-center bg-[#fafafa] border-2 border-[#820000] rounded-3xl p-8 shadow-sm">
        <Sparkles className="w-8 h-8 text-[#e51010] mx-auto mb-4" />
        <p className="text-[#820000] text-xs font-mono font-bold uppercase tracking-widest mb-3">Estado de persecución</p>
        <p className="text-[#b51414] font-semibold">{isChasing ? steps[activeStep] : 'Desplázate hacia esta sección para activar el modo de persecución.'}</p>
      </div>
    </section>
  );
};