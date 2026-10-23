import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrashCan3DViewer } from './components/TrashCan3DViewer';
import { InteractiveStory } from './components/InteractiveStory';
import { SandboxSection } from './components/SandboxSection';
import { FinancialImpact } from './components/FinancialImpact';
import { TechnicalSupport } from './components/TechnicalSupport';

export default function App() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-[#ed261a] selection:text-white font-sans overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrashCan3DViewer />
      <InteractiveStory />
      <SandboxSection />
      <FinancialImpact />
      <TechnicalSupport />
      
      <footer className="py-12 px-6 text-center border-t border-slate-900 text-slate-500 text-sm">
        <p>© 2026 trashRar. Todos los derechos reservados. Con trashRar, la basura va en su lugar.</p>
      </footer>
    </div>
  );
}