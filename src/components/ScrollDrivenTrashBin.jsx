import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Clone, OrbitControls, useGLTF } from '@react-three/drei';

function ScrollDrivenModel({ rotation, interactive }) {
  const groupRef = useRef();
  const { scene: model } = useGLTF('/models/trashbin1objeto.glb');

  useFrame(() => {
    if (groupRef.current && !interactive) {
      groupRef.current.rotation.y = rotation;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <Clone object={model} scale={[3.5, 3.5, 3.5]} />
      </Center>
    </group>
  );
}

function TrashBinScene({ rotation, interactive }) {
  const controlsRef = useRef();
  const baseCameraPosition = useRef([0, 1.2, 7.5]);

  useFrame(({ camera }) => {
    if (!interactive) {
      camera.position.lerp(
        { x: baseCameraPosition.current[0], y: baseCameraPosition.current[1], z: baseCameraPosition.current[2] },
        0.055,
      );
      if (controlsRef.current) {
        controlsRef.current.target.lerp({ x: 0, y: 0, z: 0 }, 0.055);
        controlsRef.current.update();
      }
    }
  });

  return (
    <>
      <ambientLight intensity={1.7} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} />
      <pointLight position={[-3, 1, 2]} intensity={0.6} color="#e51010" />
      <React.Suspense fallback={null}>
        <ScrollDrivenModel rotation={rotation} interactive={interactive} />
      </React.Suspense>
      <OrbitControls
        ref={controlsRef}
        enabled={interactive}
        enablePan
        enableZoom
        enableRotate
        minDistance={4}
        maxDistance={14}
      />
    </>
  );
}

export const ScrollDrivenTrashBin = () => {
  const frameRef = useRef(null);
  const [motion, setMotion] = useState({
    progress: 0,
    reduced: false,
    interactive: false,
    anatomyPosition: null,
    anatomyBlend: 0,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => {
      setMotion((current) => ({ ...current, reduced: mediaQuery.matches }));
    };

    const updatePosition = () => {
      frameRef.current = null;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0
        ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight))
        : 0;
      const anatomyPanel = document.querySelector('#anatomia .brand-reveal');
      const panelBounds = anatomyPanel?.getBoundingClientRect();
      const anatomyVisible = panelBounds
        && panelBounds.bottom > window.innerHeight * 0.2
        && panelBounds.top < window.innerHeight * 0.8;
      const anatomyBlend = Math.min(1, Math.max(0, (progress - 0.68) / 0.24));
      const easedAnatomyBlend = anatomyBlend * anatomyBlend * (3 - 2 * anatomyBlend);
      const anatomyTarget = panelBounds
        ? {
          x: panelBounds.left + panelBounds.width / 2,
          y: Math.min(
            window.innerHeight * 0.62,
            Math.max(window.innerHeight * 0.38, panelBounds.top + panelBounds.height / 2),
          ),
        }
        : null;

      setMotion((current) => ({
        ...current,
        progress,
        interactive: Boolean(anatomyVisible && easedAnatomyBlend > 0.9),
        anatomyBlend: easedAnatomyBlend,
        anatomyPosition: anatomyTarget,
      }));
    };

    const requestPositionUpdate = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updatePosition);
      }
    };

    updateMotionPreference();
    updatePosition();
    mediaQuery.addEventListener('change', updateMotionPreference);
    window.addEventListener('scroll', requestPositionUpdate, { passive: true });
    window.addEventListener('resize', requestPositionUpdate);

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference);
      window.removeEventListener('scroll', requestPositionUpdate);
      window.removeEventListener('resize', requestPositionUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const horizontalRangeStart = window.innerWidth <= 640 ? 30 : 24;
  const horizontalRangeWidth = window.innerWidth <= 640 ? 40 : 52;
  const horizontalPosition = horizontalRangeStart
    + (horizontalRangeWidth * (0.5 - 0.5 * Math.cos(motion.progress * Math.PI * 4)));
  const verticalOffset = motion.reduced ? 0 : Math.sin(motion.progress * Math.PI * 4) * 4;
  const rotation = motion.reduced ? 0.18 : motion.progress * Math.PI * 8 + 0.18;
  const freePosition = {
    x: (window.innerWidth * horizontalPosition) / 100,
    y: (window.innerHeight * 0.53) + verticalOffset,
  };
  const anatomyPosition = motion.anatomyPosition || freePosition;
  const blendedPosition = {
    x: freePosition.x + (anatomyPosition.x - freePosition.x) * motion.anatomyBlend,
    y: freePosition.y + (anatomyPosition.y - freePosition.y) * motion.anatomyBlend,
  };
  const positionStyle = {
    left: `${blendedPosition.x}px`,
    top: `${blendedPosition.y}px`,
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div
      aria-label="Modelo 3D interactivo de TrashRar"
      className={`scroll-trash-bin${motion.interactive ? ' scroll-trash-bin--interactive' : ''}`}
      style={{
        ...positionStyle,
      }}
    >
      <div className="scroll-trash-bin__glow" />
      <Canvas camera={{ position: [0, 1.2, 7.5], fov: 45, near: 0.1, far: 100 }} dpr={[1, 1.5]}>
        <TrashBinScene rotation={rotation} interactive={motion.interactive} />
      </Canvas>
    </div>
  );
};

useGLTF.preload('/models/trashbin1objeto.glb');
