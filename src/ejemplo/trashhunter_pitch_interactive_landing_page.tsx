import React, { useState, useEffect, useRef } from 'react';
import { 
  Trash2, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Play, 
  ChevronRight, 
  ChevronLeft, 
  Cpu, 
  Wifi, 
  BatteryCharging, 
  RefreshCw, 
  DollarSign, 
  BarChart3, 
  CheckCircle2, 
  HelpCircle,
  Eye,
  Info
} from 'lucide-react';

// Web Audio API Sound Synthesizer (No external assets required)
const playSound = (type, muted) => {
  if (muted) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'chomp') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.8, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'power') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (e) {
    console.error(e);
  }
};

export default function App() {
  // Global State
  const [muted, setMuted] = useState(false);
  const [pitchMode, setPitchMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [score, setScore] = useState(0);
  const [cleanliness, setCleanliness] = useState(65);
  const [ecoPoints, setEcoPoints] = useState(120);
  const [binSpeed, setBinSpeed] = useState(0.06);
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Cursor & Chase Mechanics State
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const binPos = useRef({ x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 100 });
  const [particles, setParticles] = useState([]);
  const [capturedFX, setCapturedFX] = useState([]);
  const canvasRef = useRef(null);

  // ROI Calculator State
  const [binUnits, setBinUnits] = useState(15);
  const [laborCost, setLaborCost] = useState(35000);

  // Handle Mouse Movement & Trash Trail
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Add trash trail particle randomly
      if (Math.random() < 0.25) {
        setParticles((prev) => [
          ...prev.slice(-15),
          {
            id: Math.random(),
            x: e.clientX + (Math.random() * 20 - 10),
            y: e.clientY + (Math.random() * 20 - 10),
            size: Math.random() * 8 + 6,
            rotation: Math.random() * 360,
            emoji: ['🧃', '📦', '🥤', '📄', '🥫'][Math.floor(Math.random() * 5)]
          }
        ]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Main Canvas & Chase Physics Loop
  useEffect(() => {
    let animationFrameId;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      // Adjust size for screen DPI
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lerp Bin position towards mouse
      const dx = mousePos.current.x - binPos.current.x;
      const dy = mousePos.current.y - binPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      binPos.current.x += dx * binSpeed;
      binPos.current.y += dy * binSpeed;

      // Draw Chasing Tether Line
      ctx.beginPath();
      ctx.setLineDash([6, 6]);
      ctx.moveTo(binPos.current.x, binPos.current.y);
      ctx.lineTo(mousePos.current.x, mousePos.current.y);
      ctx.strokeStyle = distance < 120 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);

      // Collision Detection (Catch mechanic)
      if (distance < 50) {
        // Trigger capture event
        setScore((s) => s + 1);
        setCleanliness((c) => Math.min(100, c + 2));
        setEcoPoints((p) => p + 15);
        playSound('chomp', muted);

        // Flash Effect at capture point
        setCapturedFX((prev) => [
          ...prev.slice(-5),
          { id: Math.random(), x: mousePos.current.x, y: mousePos.current.y }
        ]);

        // Reset cursor location slightly to continue game loop dynamism
        mousePos.current.x += (Math.random() - 0.5) * 200;
        mousePos.current.y += (Math.random() - 0.5) * 200;
      }

      // Draw Animated Smart Bin
      ctx.save();
      ctx.translate(binPos.current.x, binPos.current.y);
      const angle = Math.atan2(dy, dx);
      ctx.rotate(angle + Math.PI / 2);

      // Bin Body Glow
      ctx.shadowColor = '#10B981';
      ctx.shadowBlur = distance < 100 ? 25 : 10;

      // Bin Body (Gradient Sleek Robot Metallic)
      const grad = ctx.createLinearGradient(-30, -35, 30, 35);
      grad.addColorStop(0, '#111827');
      grad.addColorStop(0.5, '#1F2937');
      grad.addColorStop(1, '#065F46');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(-30, -35, 60, 70, 16);
      ctx.fill();

      // Bin Lid / Chomp Mouth
      const lidOpen = Math.min(1, 80 / Math.max(distance, 1));
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.roundRect(-28, -35 - lidOpen * 12, 56, 14, 6);
      ctx.fill();

      // Cybernetic Sensor Eye (Tracks target)
      ctx.fillStyle = distance < 100 ? '#EF4444' : '#10B981';
      ctx.beginPath();
      ctx.arc(0, -10, 8 + Math.sin(Date.now() / 150) * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(0, -10, 3, 0, Math.PI * 2);
      ctx.fill();

      // LED Radar Ring
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 38, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [binSpeed, muted]);

  // Cleanup old capture FX
  useEffect(() => {
    if (capturedFX.length > 0) {
      const timer = setTimeout(() => {
        setCapturedFX((prev) => prev.slice(1));
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [capturedFX]);

  // Slides for Pitch Deck Mode
  const slides = [
    {
      title: "TrashHunter: Smart Autonomous Waste Catching",
      subtitle: "Revolutionizing Urban Cleanliness with Active Pursuit IoT",
      badge: "The Pitch Deck",
      content: (
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-emerald-400">Trash doesn't wait for humans. Bins shouldn't either.</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Traditional public trash bins are passive, overflowing, and ignored. TrashHunter active tracking turns littering prevention into an engaging, gamified ecosystem for smart cities, venues, and campuses.
            </p>
            <div className="flex gap-4">
              <div className="p-4 bg-emerald-950/60 border border-emerald-500/30 rounded-xl">
                <p className="text-2xl font-black text-emerald-400">+85%</p>
                <p className="text-xs text-gray-400">Waste Capture Rate</p>
              </div>
              <div className="p-4 bg-emerald-950/60 border border-emerald-500/30 rounded-xl">
                <p className="text-2xl font-black text-emerald-400">-40%</p>
                <p className="text-xs text-gray-400">Janitorial Labor Cost</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-emerald-500/30 shadow-2xl text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center animate-pulse">
              <Zap className="w-12 h-12 text-emerald-400" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">LiDAR Autonomous Tracking</h4>
            <p className="text-sm text-gray-400">Uses low-power depth cameras to detect litter in a 15m radius and actively positions itself to catch public waste.</p>
          </div>
        </div>
      )
    },
    {
      title: "The Urban Crisis: Overflow & High Operational Expenses",
      subtitle: "Why Traditional Waste Management is Broken",
      badge: "Market Problem",
      content: (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-red-500/30 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 font-bold">01</div>
            <h4 className="text-lg font-bold text-white">Passive Neglect</h4>
            <p className="text-sm text-gray-400">72% of pedestrians drop trash within 10 meters of a bin if it requires detouring. People are lazy; bins must be proactive.</p>
          </div>
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-orange-500/30 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">02</div>
            <h4 className="text-lg font-bold text-white">Inefficient Routes</h4>
            <p className="text-sm text-gray-400">Municipalities spend millions checking empty bins. Static schedules lead to fuel waste and unnecessary carbon emissions.</p>
          </div>
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-yellow-500/30 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold">03</div>
            <h4 className="text-lg font-bold text-white">Pest Infestation</h4>
            <p className="text-sm text-gray-400">Open or overflowing traditional trash receptacles attract rodents, insects, and create severe public hygiene hazards.</p>
          </div>
        </div>
      )
    },
    {
      title: "Hardware + Cloud IoT Ecosystem",
      subtitle: "A Powerful Platform for Smart Infrastructure",
      badge: "Technology Solution",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-slate-900/80 rounded-xl border border-emerald-500/20">
              <Cpu className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h5 className="font-bold text-white">Internal Solar Compactor</h5>
                <p className="text-sm text-gray-400">Quadruples waste density before requiring pickup using integrated solar-powered hydraulic pressing.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-slate-900/80 rounded-xl border border-emerald-500/20">
              <Wifi className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h5 className="font-bold text-white">5G / LoRaWAN Fleet Mesh</h5>
                <p className="text-sm text-gray-400">Bins coordinate in real-time, sharing crowd density maps and notifying dispatchers when full.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-slate-900/80 rounded-xl border border-emerald-500/20">
              <Award className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h5 className="font-bold text-white">Gamified QR Rewards</h5>
                <p className="text-sm text-gray-400">Users tap phone NFC/QR when throwing waste to earn local store discounts and eco-rewards.</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-500/30 flex flex-col justify-center items-center text-center">
            <div className="text-5xl font-black text-emerald-400 mb-2">4.8x</div>
            <p className="text-gray-300 font-medium">Capacity compared to standard trash receptacles</p>
            <div className="w-full bg-gray-800 h-3 rounded-full mt-6 overflow-hidden">
              <div className="bg-emerald-500 h-full w-[88%] animate-pulse"></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">88% Volume Optimization Efficiency</p>
          </div>
        </div>
      )
    },
    {
      title: "Financial ROI & Investor Projections",
      subtitle: "Capital Efficiency with Proven Savings",
      badge: "Business Model",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-emerald-500/20">
              <p className="text-xs text-gray-400">Unit Price</p>
              <p className="text-xl font-bold text-white">$1,850</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-emerald-500/20">
              <p className="text-xs text-gray-400">Annual Maintenance</p>
              <p className="text-xl font-bold text-white">$120/yr</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-emerald-500/20">
              <p className="text-xs text-gray-400">Avg. Payback Period</p>
              <p className="text-xl font-bold text-emerald-400">11 Months</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-emerald-500/20">
              <p className="text-xs text-gray-400">3-Year ROI</p>
              <p className="text-xl font-bold text-emerald-400">312%</p>
            </div>
          </div>
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-500/30">
            <h4 className="font-bold text-white mb-2">B2B & Municipal Monetization Channels</h4>
            <ul className="grid md:grid-cols-2 gap-3 text-sm text-gray-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Direct Fleet Hardware Sales</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> SaaS Fleet Route Optimization Software</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> On-Bin Digital LED Sponsorships</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Carbon Offset Credit Verification</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  // Hotspot details
  const hotspots = [
    {
      id: 'lidar',
      title: '360° LiDAR & Vision AI',
      desc: 'Detects dropped paper, cans, and bottles up to 15 meters away in real-time.',
      pos: 'top-[20%] left-[45%]'
    },
    {
      id: 'compactor',
      title: 'Solar Auto-Compactor',
      desc: 'Crushes trash with 800 lbs of force, increasing capacity by 450%.',
      pos: 'top-[50%] left-[55%]'
    },
    {
      id: 'wheels',
      title: 'Omni-Directional Drive',
      desc: 'Silent brush-less motors navigate crowds smoothly without tripping pedestrians.',
      pos: 'top-[80%] left-[48%]'
    },
    {
      id: 'display',
      title: 'Interactive LED Matrix',
      desc: 'Displays expressions, thank-you animations, and gamified eco points.',
      pos: 'top-[35%] left-[30%]'
    }
  ];

  // Calculate dynamic ROI
  const calculatedSavings = Math.round((binUnits * laborCost * 0.38) / 1000) * 1000;
  const paybackMonths = Math.max(4, Math.round((binUnits * 1850) / (calculatedSavings / 12)));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Background Interactive Canvas (The Chase Area) */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-10"
      />

      {/* Capture Flash Particle Effects */}
      {capturedFX.map((fx) => (
        <div
          key={fx.id}
          className="fixed pointer-events-none z-20 animate-ping text-emerald-400 font-black text-xl flex items-center gap-1"
          style={{ left: fx.x - 20, top: fx.y - 20 }}
        >
          <Sparkles className="w-6 h-6 text-yellow-300" /> +15 ECO
        </div>
      ))}

      {/* Floating Cursor Trash Follower */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-20 text-lg transition-opacity duration-700"
          style={{
            left: p.x,
            top: p.y,
            transform: `rotate(${p.rotation}deg)`,
            opacity: 0.8
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* Top Floating Control Bar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/80 backdrop-blur-md border border-emerald-500/30 px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-slate-950">
            TH
          </div>
          <span className="font-extrabold tracking-wider bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
            TRASH<span className="text-white">HUNTER</span>
          </span>
        </div>

        <div className="h-4 w-px bg-slate-700" />

        {/* Live HUD Stats */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1 text-emerald-400">
            <Trash2 className="w-3.5 h-3.5" />
            <span>CAUGHT: <strong className="text-white">{score}</strong></span>
          </div>
          <div className="flex items-center gap-1 text-teal-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ECO: <strong className="text-white">{ecoPoints}</strong></span>
          </div>
        </div>

        <div className="h-4 w-px bg-slate-700" />

        {/* Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playSound('click', muted);
              setMuted(!muted);
            }}
            className="p-2 rounded-full hover:bg-slate-800 transition text-gray-300 hover:text-white"
            title="Toggle Sound"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={() => {
              playSound('power', muted);
              setPitchMode(!pitchMode);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
              pitchMode 
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/30' 
                : 'bg-slate-800 text-emerald-400 border border-emerald-500/30 hover:bg-slate-700'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            {pitchMode ? 'Exit Pitch Mode' : 'Pitch Deck View'}
          </button>
        </div>
      </header>

      {/* PITCH DECK MODAL OVERLAY */}
      {pitchMode ? (
        <div className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-8 md:p-16">
          <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center">
            <div className="inline-block self-start px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-semibold mb-4">
              {slides[currentSlide].badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-2 text-white">
              {slides[currentSlide].title}
            </h2>
            <p className="text-lg text-emerald-400/80 mb-8">
              {slides[currentSlide].subtitle}
            </p>

            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl min-h-[320px] flex items-center">
              {slides[currentSlide].content}
            </div>
          </div>

          {/* Slide Navigation Controls */}
          <div className="max-w-5xl mx-auto w-full flex items-center justify-between pt-6 border-t border-slate-800">
            <div className="text-sm text-gray-400">
              Slide <span className="text-white font-bold">{currentSlide + 1}</span> of {slides.length}
            </div>
            <div className="flex gap-3">
              <button
                disabled={currentSlide === 0}
                onClick={() => {
                  playSound('click', muted);
                  setCurrentSlide((s) => Math.max(0, s - 1));
                }}
                className="p-3 bg-slate-900 border border-slate-700 rounded-xl disabled:opacity-30 hover:bg-slate-800 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                disabled={currentSlide === slides.length - 1}
                onClick={() => {
                  playSound('click', muted);
                  setCurrentSlide((s) => Math.min(slides.length - 1, s + 1));
                }}
                className="p-3 bg-emerald-500 text-slate-950 rounded-xl disabled:opacity-30 hover:bg-emerald-400 font-bold transition flex items-center gap-2"
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* STANDARD SCROLLYTELLING LANDING PAGE */
        <main className="relative z-20">
          
          {/* HERO SECTION */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 relative">
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-semibold">
                <Sparkles className="w-4 h-4" /> Next-Gen Autonomous Public Sanitation
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none text-white">
                Trash shouldn't look for the bin... <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-400 bg-clip-text text-transparent">
                  The bin should hunt the trash!
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                Move your cursor around the screen! Our AI autonomous bin actively tracks, chases, and eats litter before it pollutes your facility or city streets.
              </p>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <a
                  href="#sandbox"
                  onClick={() => playSound('click', muted)}
                  className="px-8 py-4 bg-emerald-500 text-slate-950 font-extrabold rounded-2xl hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/25 flex items-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" /> Try Live Chase Sandbox
                </a>
                <a
                  href="#roi"
                  onClick={() => playSound('click', muted)}
                  className="px-8 py-4 bg-slate-900 border border-emerald-500/30 text-white font-bold rounded-2xl hover:bg-slate-800 transition"
                >
                  Calculate Enterprise ROI
                </a>
              </div>
            </div>

            {/* Interactive Cursor Prompt */}
            <div className="absolute bottom-10 animate-bounce flex flex-col items-center text-xs text-emerald-400/80 font-mono">
              <span>MOVE YOUR MOUSE / TAP TO DROP TRASH</span>
              <ChevronRight className="w-4 h-4 rotate-90 mt-1" />
            </div>
          </section>

          {/* SECTION 1: THE CRISIS & PROBLEM */}
          <section className="py-24 px-4 bg-slate-900/60 border-y border-slate-800/80">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-black text-white">The Cost of Passive Infrastructure</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Static trash receptacles rely 100% on human compliance. Here is why traditional sanitation models fail modern urban spaces.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-slate-950 p-8 rounded-3xl border border-emerald-500/20 space-y-4 hover:border-emerald-500/50 transition">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">2.12 Billion Tons</h3>
                  <p className="text-sm text-gray-400">Of municipal solid waste generated globally each year, with over 33% poorly managed open-dumping.</p>
                </div>

                <div className="bg-slate-950 p-8 rounded-3xl border border-emerald-500/20 space-y-4 hover:border-emerald-500/50 transition">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">$11.5 Billion Spent</h3>
                  <p className="text-sm text-gray-400">Annual US cleanup costs for littering. TrashHunter cuts manual street-sweeping hours by over 40%.</p>
                </div>

                <div className="bg-slate-950 p-8 rounded-3xl border border-emerald-500/20 space-y-4 hover:border-emerald-500/50 transition">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">70% Empty Hauls</h3>
                  <p className="text-sm text-gray-400">Traditional collection trucks waste fuel collecting half-empty bins due to static, unoptimized schedules.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: HOTSPOT 360 MODEL INSPECTOR */}
          <section className="py-24 px-4 relative">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-semibold">
                  Hardware Breakdown
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white">Anatomy of a TrashHunter</h2>
                <p className="text-gray-400 max-w-xl mx-auto">
                  Click the glowing hotspots to explore our LiDAR, solar compaction, and smart mesh technology.
                </p>
              </div>

              <div className="relative w-full max-w-2xl h-[450px] mx-auto bg-slate-900/80 rounded-3xl border border-emerald-500/30 flex items-center justify-center p-8 overflow-hidden shadow-2xl">
                
                {/* Visual Representation of Smart Bin Core */}
                <div className="relative w-56 h-80 bg-gradient-to-b from-slate-800 to-emerald-950 rounded-3xl border-2 border-emerald-500/50 flex flex-col items-center justify-between p-6 shadow-2xl">
                  {/* Top Sensor Bar */}
                  <div className="w-full h-8 bg-slate-950 rounded-xl border border-emerald-400/40 flex items-center justify-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                  </div>

                  {/* Matrix Screen */}
                  <div className="w-32 h-20 bg-slate-950 rounded-xl border border-emerald-500/30 flex flex-col items-center justify-center font-mono text-emerald-400 text-xs">
                    <span className="text-lg">◕‿◕</span>
                    <span>READY TO CHASE</span>
                  </div>

                  {/* Bottom Motors */}
                  <div className="w-full flex justify-between px-2">
                    <div className="w-8 h-4 bg-emerald-500 rounded-full" />
                    <div className="w-8 h-4 bg-emerald-500 rounded-full" />
                  </div>
                </div>

                {/* Hotspot Interactive Nodes */}
                {hotspots.map((hs) => (
                  <button
                    key={hs.id}
                    onClick={() => {
                      playSound('click', muted);
                      setActiveHotspot(hs);
                    }}
                    className={`absolute ${hs.pos} p-2 bg-emerald-500 text-slate-950 rounded-full shadow-lg shadow-emerald-500/50 hover:scale-125 transition flex items-center justify-center animate-bounce`}
                  >
                    <Info className="w-5 h-5" />
                  </button>
                ))}
              </div>

              {/* Hotspot Detail Drawer */}
              {activeHotspot && (
                <div className="max-w-md mx-auto p-6 bg-slate-900 border border-emerald-500/50 rounded-2xl space-y-2 text-center animate-fadeIn">
                  <h4 className="text-xl font-bold text-emerald-400">{activeHotspot.title}</h4>
                  <p className="text-sm text-gray-300">{activeHotspot.desc}</p>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="mt-3 px-4 py-1.5 bg-slate-800 text-xs text-gray-400 hover:text-white rounded-lg"
                  >
                    Close Inspector
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 3: LIVE PITCH INTERACTIVE SANDBOX */}
          <section id="sandbox" className="py-24 px-4 bg-slate-900/80 border-t border-slate-800">
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-semibold">
                    Interactive Arena
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-white mt-2">Test Bin Pursuit Mechanics</h2>
                  <p className="text-gray-400 text-sm">
                    Adjust motor speeds and watch how effectively TrashHunter intercepts your cursor in real-time.
                  </p>
                </div>

                {/* Motor Speed Controller */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
                  <span className="text-xs text-gray-400 font-mono">AGILITY SPEED:</span>
                  <div className="flex gap-2">
                    {[
                      { label: 'Normal', speed: 0.04 },
                      { label: 'Turbo', speed: 0.08 },
                      { label: 'Apex Hunter', speed: 0.15 }
                    ].map((mode) => (
                      <button
                        key={mode.label}
                        onClick={() => {
                          playSound('click', muted);
                          setBinSpeed(mode.speed);
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                          binSpeed === mode.speed
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-800 text-gray-400 hover:text-white'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Telemetry Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-500/20 flex items-center gap-4">
                  <div className="p-4 bg-emerald-500/10 rounded-xl text-emerald-400">
                    <Trash2 className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-mono">TOTAL CAPTURED</p>
                    <p className="text-3xl font-black text-white">{score} <span className="text-xs font-normal text-gray-500">units</span></p>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-500/20 flex items-center gap-4">
                  <div className="p-4 bg-teal-500/10 rounded-xl text-teal-400">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-mono">CLEANLINESS INDEX</p>
                    <p className="text-3xl font-black text-white">{cleanliness}%</p>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-500/20 flex items-center gap-4">
                  <div className="p-4 bg-yellow-500/10 rounded-xl text-yellow-400">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-mono">ECO IMPACT REWARD</p>
                    <p className="text-3xl font-black text-white">{ecoPoints} <span className="text-xs font-normal text-gray-500">pts</span></p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: ENTERPRISE ROI & INVESTOR CALCULATOR */}
          <section id="roi" className="py-24 px-4">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-black text-white">ROI & Financial Impact</h2>
                <p className="text-gray-400 max-w-xl mx-auto">
                  See how quickly TrashHunter pays for itself through labor reduction and optimized haul schedules.
                </p>
              </div>

              <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center shadow-2xl">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-gray-300 block mb-2">
                      Fleet Size: <span className="text-emerald-400 font-mono text-lg">{binUnits} Bins</span>
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={binUnits}
                      onChange={(e) => setBinUnits(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-300 block mb-2">
                      Avg. Annual Janitorial Labor per Worker: <span className="text-emerald-400 font-mono text-lg">${laborCost.toLocaleString()}</span>
                    </label>
                    <input
                      type="range"
                      min="20000"
                      max="60000"
                      step="2500"
                      value={laborCost}
                      onChange={(e) => setLaborCost(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs text-gray-400">
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Includes 4.5x solar compaction capacity savings</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Includes 40% reduction in janitorial floor sweeps</p>
                  </div>
                </div>

                <div className="bg-slate-950 p-8 rounded-2xl border border-emerald-500/30 text-center space-y-6">
                  <div>
                    <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">Projected Annual Savings</p>
                    <p className="text-4xl md:text-5xl font-black text-emerald-400 mt-1">
                      ${calculatedSavings.toLocaleString()}
                    </p>
                  </div>

                  <div className="h-px bg-slate-800" />

                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-xs text-gray-400">Estimated Payback</p>
                      <p className="text-xl font-bold text-white">{paybackMonths} Months</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">CO2 Emissions Reduced</p>
                      <p className="text-xl font-bold text-white">{(binUnits * 1.4).toFixed(1)} Tons/yr</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER & FINAL CALL TO ACTION */}
          <footer className="py-16 px-4 border-t border-slate-800 text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-black text-white">Ready to Deploy Autonomous Trash Hunting?</h3>
            <p className="text-gray-400 max-w-md mx-auto text-sm">
              Schedule a pilot program for your venue, university campus, or municipal district today.
            </p>
            <button
              onClick={() => playSound('power', muted)}
              className="px-8 py-4 bg-emerald-500 text-slate-950 font-black rounded-2xl hover:bg-emerald-400 transition shadow-xl shadow-emerald-500/20"
            >
              Request Enterprise Demo Unit
            </button>
            <p className="text-xs text-gray-600 pt-8">
              © {new Date().getFullYear()} TrashHunter Autonomous Systems Inc. All rights reserved.
            </p>
          </footer>
        </main>
      )}
    </div>
  );
}