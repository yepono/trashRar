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
      <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl animate-pulse" />
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
    'Paso 1: Da clic en cualquier parte de esta sección para generar basura.',
    'Paso 2: El bote detecta la basura y comienza a perseguirte.',
    'Paso 3: Haz clic en cada residuo para recogerlo y tirarlo en el bote de basura.',
    'Excelente. Las instalaciones están limpias y la métrica de eficiencia subio en tiempo real.',
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
            return <trashType.Icon aria-label={trashType.name} className="w-8 h-8 text-[#ed261a]" />;
          })()}
        </div>
      ))}

      {/* Encabezado de Sección */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-black text-[#ed261a] mt-5 mb-3">
          La efectividad de TrashRar
        </h2>
        
      </div>

      {/* Tarjetas de Pasos */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
        <div className="bg-white border border-red-200 p-6 rounded-2xl shadow-sm">
          <span className="text-[#ed261a] text-xs font-mono font-bold">01 / SOLTAR</span>
          <h3 className="text-lg font-bold text-[#450a0a] mt-3">Una persona tira basura fuera de TrashRar</h3>
        </div>
        <div className="bg-white border border-red-200 p-6 rounded-2xl shadow-sm">
          <span className="text-[#ed261a] text-xs font-mono font-bold">02 / SEGUIR</span>
          <h3 className="text-lg font-bold text-[#450a0a] mt-3">TrashRar te sigue para que regreses a colocar la basura en su lugar</h3>
        </div>
        <div className="bg-white border border-red-200 p-6 rounded-2xl shadow-sm">
          <span className="text-[#ed261a] text-xs font-mono font-bold">03 / RECOGER</span>
          <h3 className="text-lg font-bold text-[#450a0a] mt-3">Recoges la basura y la depositas en TrashRar</h3>
        </div>
      </div>

      {/* Caja de Estado */}
      <div className="max-w-2xl mx-auto text-center bg-white border-2 border-[#ed261a] rounded-3xl p-8 shadow-sm">
        <Sparkles className="w-8 h-8 text-[#ed261a] mx-auto mb-4" />
        <p className="text-[#ed261a] text-xl font-mono font-bold uppercase tracking-widest mb-3">PLAYGROUND</p>
      </div>
    </section>
  );
};