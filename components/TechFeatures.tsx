import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Zap, Leaf, Shield, Sparkles, Volume2, Maximize2, Layers } from 'lucide-react';

export default function TechFeatures() {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [ancLevel, setAncLevel] = useState<number>(85);
  const [refreshRate, setRefreshRate] = useState<number>(120);

  // For refresh rate simulation animation
  const [ballPosition, setBallPosition] = useState<number>(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    let speed = 2.5;
    let position = 0;
    
    const animate = () => {
      position += speed;
      if (position > 100 || position < 0) {
        speed = -speed;
      }
      setBallPosition(position);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const systemFeatures = [
    {
      title: 'Z-Mesh Intelligent Ecosystem',
      description: 'Zubair & Sons devices form an instant, high-speed encrypted local mesh network. Transfer studio-grade audio streams, extend screens, or synchronize biometrics seamlessly.',
      icon: Cpu,
      stats: '0.2ms Latency'
    },
    {
      title: 'Grade-5 Aviation Titanium',
      description: 'Sculpted with premium structural titanium. Coated in a customized Diamond-Like Carbon (DLC) matte shell that repels fingerprints and defends against scratches.',
      icon: Shield,
      stats: '10x Harder'
    },
    {
      title: 'Absolute Eco-Responsibility',
      description: 'Every chassis in the collection is crafted from 100% recycled structural alloys and biological resins. Zero-impact packaging makes our footprint fully transparent.',
      icon: Leaf,
      stats: '100% Recyclable'
    }
  ];

  const protocols = [
    { id: 'aud', name: 'Z-Cast Audio Share', desc: 'Broadcast audio to up to 5 headsets or cylinder speakers simultaneously without loss.' },
    { id: 'mir', name: 'Z-Link Display Mirror', desc: 'Cast your mobile device screen onto the Z-Monitor with zero-lag spatial gestures.' },
    { id: 'bio', name: 'Z-Bio Auth Sync', desc: 'Unlock your monitor, phone, and tablet securely when your Z-Ring or Z-Watch is within close proximity.' }
  ];

  const [selectedProtocol, setSelectedProtocol] = useState<string>('aud');

  return (
    <section id="features" className="py-24 max-w-7xl mx-auto px-6 space-y-24 scroll-mt-20">
      {/* Section Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-[11px] font-mono tracking-wider font-semibold uppercase">
          Ecosystem & Features
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
          State-of-the-Art Architecture
        </h2>
        <p className="text-white/50 text-sm sm:text-base leading-relaxed">
          Crafted by Zubair & Sons with meticulous attention to detail. Our hardware combines physical elegance with custom integrated protocols.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Left Grid: Features & Stats */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            {systemFeatures.map((feat, index) => {
              const Icon = feat.icon;
              const isSelected = activeFeature === index;

              return (
                <div
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                    isSelected 
                      ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30' 
                      : 'bg-white/5 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className={`p-3 rounded-xl border ${
                    isSelected ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-white/5 text-white/70 border-white/10'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-display font-bold text-base text-white">{feat.title}</h4>
                      <span className="text-[10px] font-mono bg-white/10 text-white/80 px-2.5 py-0.5 rounded-full font-bold">
                        {feat.stats}
                      </span>
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-500/15 to-purple-500/15 border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1c0c1e] flex items-center justify-center border border-white/10 text-orange-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-semibold text-sm text-white">Full Compatibility Guarantee</h5>
              <p className="text-xs text-white/50 mt-0.5">Every device in the Zubair & Sons catalog works seamlessly straight out of the box.</p>
            </div>
          </div>
        </div>

        {/* Right Grid: Interactive Labs (ANC & Refresh Rate) */}
        <div className="lg:col-span-7 bg-[#150917]/40 border border-white/5 rounded-3xl p-8 flex flex-col justify-between space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-purple-500/5 rounded-full blur-[80px]" />
          
          <div className="flex justify-between items-center border-b border-white/10 pb-5">
            <div>
              <h4 className="font-display font-bold text-lg text-white">Interactive Hardware Simulator</h4>
              <p className="text-xs text-white/40">Test Z-Acoustics Noise Cancellation and Z-Monitor refresh rates live</p>
            </div>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>

          {/* Interactive LAB 1: Noise Cancellation Wave flatting */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-white/80 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-purple-400" />
                Active Noise Cancellation (ANC)
              </span>
              <span className="font-mono text-purple-400 font-bold">{ancLevel}% Suppression</span>
            </div>
            <p className="text-xs text-white/50">
              Drag the suppressor to flatten ambient audio ripples into perfect silence.
            </p>

            <div className="flex items-center gap-6 py-4 bg-black/30 px-5 rounded-2xl border border-white/5 relative overflow-hidden">
              {/* Dynamic Sound Wave visualizer using SVG path */}
              <div className="flex-1 h-12 flex items-center justify-center">
                <svg className="w-full h-10 stroke-purple-500/70 stroke-[2px] fill-none" viewBox="0 0 400 40">
                  <path 
                    d={Array.from({ length: 41 }).map((_, i) => {
                      const x = i * 10;
                      // amplitude decreases as ancLevel increases
                      const amp = Math.max(1, 18 - (ancLevel / 100) * 17);
                      const frequency = 0.15;
                      const y = 20 + Math.sin(x * frequency) * amp * (i % 2 === 0 ? 1 : -1);
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ')}
                    className="transition-all duration-300"
                  />
                </svg>
              </div>

              {/* Slider control */}
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={ancLevel}
                onChange={(e) => setAncLevel(parseInt(e.target.value))}
                className="w-32 accent-purple-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Interactive LAB 2: Fluid Refresh Rate Lab */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-white/80 flex items-center gap-2">
                <Layers className="w-4 h-4 text-orange-400" />
                Refresh Rate Fluidity Lab
              </span>
              <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
                {[30, 60, 120].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setRefreshRate(rate)}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      refreshRate === rate ? 'bg-orange-500 text-white' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {rate}Hz
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-white/50">
              Observe the motion trail simulation. See how high frequencies improve spatial tracking.
            </p>

            <div className="h-16 bg-black/30 rounded-2xl border border-white/5 flex items-center px-6 relative overflow-hidden">
              {/* Ball tracking container */}
              <div className="relative w-full h-8">
                {/* Simulated frame trail overlay depending on refresh rate */}
                {Array.from({ length: refreshRate === 120 ? 8 : refreshRate === 60 ? 4 : 2 }).map((_, idx) => {
                  // offset ball positions to create trail effect
                  const delayFactor = idx * (refreshRate === 120 ? 1.5 : refreshRate === 60 ? 3 : 6);
                  const trailPosition = Math.max(0, Math.min(100, ballPosition - delayFactor));
                  const opacity = 1 - (idx / (refreshRate === 120 ? 8 : refreshRate === 60 ? 4 : 2)) * 0.9;
                  
                  return (
                    <div 
                      key={idx}
                      className="absolute w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-opacity"
                      style={{ 
                        left: `${trailPosition}%`,
                        transform: 'translateY(-50%)',
                        top: '50%',
                        opacity: idx === 0 ? 1 : opacity,
                        filter: idx === 0 ? 'none' : 'blur(1px)'
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive LAB 3: Protocol mesh selector */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <span className="text-xs text-white/40 font-semibold uppercase tracking-wider block">Select Protocol Module</span>
            <div className="flex gap-2">
              {protocols.map((proto) => (
                <button
                  key={proto.id}
                  onClick={() => setSelectedProtocol(proto.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                    selectedProtocol === proto.id 
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' 
                      : 'bg-white/5 text-white/60 border-white/5 hover:border-white/10'
                  }`}
                >
                  {proto.name.split(' ')[0]}
                </button>
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              {protocols.map((proto) => proto.id === selectedProtocol && (
                <motion.div
                  key={proto.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 bg-white/5 border border-white/5 rounded-2xl"
                >
                  <h5 className="font-bold text-xs text-white mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    {proto.name}
                  </h5>
                  <p className="text-xs text-white/50 leading-relaxed">{proto.desc}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
