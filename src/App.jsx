import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrashCan3DViewer } from './components/TrashCan3DViewer';
import { InteractiveStory } from './components/InteractiveStory';
import { FinancialImpact } from './components/FinancialImpact';
import { TechnicalSupport } from './components/TechnicalSupport';

export default function App() {
  return (
    <div className="bg-[#fafafa] text-[#2b0909] min-h-screen font-sans overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrashCan3DViewer />
      <InteractiveStory />
      <FinancialImpact />
      <TechnicalSupport />
      
      <footer className="py-12 px-6 text-center border-t border-[#b51414]/20 text-[#820000] text-sm bg-[#fafafa]">
        <p>© 2026 trashRar. Todos los derechos reservados. Con trashRar, la basura va en su lugar.</p>
      </footer>
    </div>
  );
}