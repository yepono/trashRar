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

// Fallback visual si el modelo no está disponible (con color rojo)
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
      <meshStandardMaterial color="#ed261a" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

export const TrashCan3DViewer = () => {
  const { activeHotspot, setActiveHotspot } = useTrashStore();
  const sectionRef = useRef(null);
  const [revealProgress, setRevealProgress] = useState(0);

  const hotspots = [
    { id: 1, title: 'LiDAR & Sensores Ópticos', desc: 'Detección espacial de personas y cúmulos de basura en un radio de 15 metros.', icon: <Eye className="w-5 h-5"/>, pos: 'top-10 left-10' },
    { id: 2, title: 'Compactador Solar Interno', desc: 'Reduce el volumen de los residuos 5:1 mediante compresión automatizada por energía solar.', icon: <Zap className="w-5 h-5"/>, pos: 'top-1/2 right-10' },
    { id: 3, title: 'Módulo de Navegación IoT', desc: 'Mapeo autónomo SLAM y sincronización en tiempo real con la nube empresarial.', icon: <Cpu className="w-5 h-5"/>, pos: 'bottom-10 left-1/4' },
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
    <section id="anatomia" ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto relative min-h-[900px]">
      <div className="text-center mb-12">
        <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">Desglose de hardware</span>
        <h2 className="text-3xl md:text-5xl font-black text-white mt-5 mb-4">Anatomía de un trashHunter</h2>
        <p className="text-slate-400 max-w-xl mx-auto">Inspecciona el hardware inteligente que compone nuestro bote de basura autónomo.</p>
      </div>

      <div className="sticky top-28 h-[560px] w-full max-w-4xl mx-auto bg-slate-900/80 border border-red-500/30 rounded-3xl relative overflow-hidden shadow-2xl">
        {/* Resplandor radial detrás del modelo 3D en tono rojo */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(237,38,26,0.15),transparent_54%)]" />
        <div
          className="absolute inset-0 transition-[transform,opacity] duration-100 ease-out"
          style={{ opacity: revealProgress, transform: `translateY(${(1 - revealProgress) * 170}px) scale(${0.7 + revealProgress * 0.3})` }}
        >
        <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[10, 20, 15]} intensity={1.5} />
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
              className="bg-[#ed261a] text-white p-3 rounded-full shadow-lg shadow-red-600/40 hover:scale-110 transition flex items-center justify-center font-bold"
            >
              {spot.icon}
            </button>
            {activeHotspot === spot.id && (
              <div className={`absolute z-20 w-56 max-w-[calc(100vw-3rem)] bg-slate-950/95 border border-red-500/40 p-4 rounded-xl shadow-2xl backdrop-blur text-left ${spot.id === 2 ? 'top-0 right-14' : spot.id === 3 ? 'bottom-14 left-0' : 'top-14 left-0'}`}>
                <h4 className="text-white font-bold text-sm mb-1">{spot.title}</h4>
                <p className="text-slate-300 text-xs">{spot.desc}</p>
              </div>
            )}
          </div>
        ))}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center text-[10px] uppercase tracking-[0.18em] text-red-500/70">Desplázate para revelar el modelo · Haz clic en los nodos</div>
      </div>
    </section>
  );
};