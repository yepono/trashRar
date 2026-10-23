import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Clone, OrbitControls, useGLTF, Center } from '@react-three/drei';
import { useTrashStore } from '../store/useTrashStore';
import { Cpu, Zap, Eye } from 'lucide-react';

function Model() {
  const gltfRef = useRef();
  const { scene: model } = useGLTF('/models/trashbin1objeto.glb');

  useFrame((state) => {
    if (gltfRef.current) {
      gltfRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={gltfRef}>
      <Center>
        <Clone object={model} scale={[2, 2, 2]} />
      </Center>
    </group>
  );
}

// Fallback visual si el modelo no está disponible.
function FallbackBin() {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });
  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1, 0.8, 2.5, 32]} />
      <meshStandardMaterial color="#b51414" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

export const TrashCan3DViewer = () => {
  const { activeHotspot, setActiveHotspot } = useTrashStore();
  const sectionRef = useRef(null);
  const [revealProgress, setRevealProgress] = useState(0);

  const hotspots = [
    { id: 1, title: 'Detector de basura', desc: 'Detecta a personas y cúmulos de basura en un radio amplio.', icon: <Eye className="w-5 h-5"/>, pos: 'top-10 left-10' },
    { id: 2, title: 'Compresor integrado', desc: 'Reduce el volumen de los residuos mediante compresión automatizada.', icon: <Zap className="w-5 h-5"/>, pos: 'top-1/2 right-10' },
    { id: 3, title: 'Reportes informativos', desc: 'Genera reportes de calor y estadisticas sobre los habitos de recolección dentro de la empresa.', icon: <Cpu className="w-5 h-5"/>, pos: 'bottom-10 left-1/4' },
  ];

  useEffect(() => {
    const updateReveal = () => {
      if (!sectionRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.88 - top) / (height * 0.58)));
      setRevealProgress(progress);
    };

    updateReveal();
    window.addEventListener('scroll', updateReveal, { passive: true });
    window.addEventListener('resize', updateReveal);
    return () => {
      window.removeEventListener('scroll', updateReveal);
      window.removeEventListener('resize', updateReveal);
    };
  }, []);

  return (
    <section id="anatomia" ref={sectionRef} className="section-wash section-rule py-24 px-6 max-w-7xl mx-auto relative min-h-[900px]">
      <div className="text-center mb-12">
        <span className="inline-flex rounded-full border border-[#b51414]/35 bg-[#b51414]/[0.06] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#b51414]">La solución</span>
        <h2 className="text-3xl md:text-5xl font-black text-[#820000] mt-5 mb-4">
          Anatomía de un TrashRar
        </h2>
        <p className="max-w-xl mx-auto text-sm leading-relaxed text-[#b51414]">Conoce los sistemas que convierten un bote estático en una solución activa para tu empresa.</p>
      </div>

      <div className="sticky top-28 h-[560px] w-full max-w-4xl mx-auto bg-[#fafafa] border-2 border-[#b51414]/30 rounded-3xl relative overflow-hidden shadow-[0_18px_50px_rgba(130,0,0,.12)] brand-reveal">
        <div
          className="absolute inset-0 transition-[transform,opacity] duration-100 ease-out"
          style={{ opacity: revealProgress, transform: `translateY(${(1 - revealProgress) * 170}px) scale(${0.7 + revealProgress * 0.3})` }}
        >
          <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 20, 15]} intensity={1.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <React.Suspense fallback={<FallbackBin />}>
              <Model />
            </React.Suspense>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
        </div>

        {/* Hotspots interactivos sobre el Canvas */}
        {hotspots.map((spot) => (
          <div key={spot.id} className={`absolute ${spot.pos} z-10`}>
            <button
              aria-label={`Inspeccionar ${spot.title}`}
              onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
              className="bg-[#e51010] text-[#fafafa] p-3 rounded-full shadow-md hover:scale-110 hover:bg-[#b51414] transition flex items-center justify-center font-bold brand-pulse"
            >
              {spot.icon}
            </button>
            {activeHotspot === spot.id && (
              <div className={`absolute z-20 w-56 max-w-[calc(100vw-3rem)] bg-[#fafafa] border-2 border-[#b51414] p-4 rounded-xl shadow-lg text-left ${spot.id === 2 ? 'top-0 right-14' : spot.id === 3 ? 'bottom-14 left-0' : 'top-14 left-0'}`}>
                <h4 className="text-[#820000] font-bold text-sm mb-1">{spot.title}</h4>
                <p className="text-[#2b0909] text-xs font-medium">{spot.desc}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};