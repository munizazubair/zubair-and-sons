import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onShopNowClick: () => void;
}

export default function Hero({ onShopNowClick }: HeroProps) {
  // Path to our beautifully generated high-resolution 3D device collection image
  const heroImageSrc = '/src/assets/images/device_collection_1783242967563.jpg';

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Decorative Background Lighting Blobs */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-orange-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Text and CTA */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-5 space-y-8 flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[11px] font-mono tracking-wider font-semibold text-white/80 uppercase">
              Now Launching: Satin Black Edition
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
              Device <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                Collection
              </span>
            </h1>
            <p className="text-base sm:text-lg text-white/70 max-w-lg leading-relaxed font-sans">
              Devices set containing smartphone, tablet, computer, TV, camera, speaker, smartwatch, microphone, headphones and more.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <button
              onClick={onShopNowClick}
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium shadow-xl shadow-orange-500/10 hover:shadow-orange-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Shop now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('features');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 py-4 rounded-full border border-white/10 hover:border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer text-center text-sm font-medium"
            >
              Explore Features
            </button>
          </div>
        </motion.div>

        {/* Right Column: Beautiful Generated Image Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
          className="lg:col-span-7 relative flex justify-center"
        >
          {/* Glowing backdrops to make the image float organically */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-orange-500/5 rounded-3xl blur-2xl pointer-events-none" />
          
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl p-2 group">
            {/* The actual high resolution rendered image */}
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <img
                src={heroImageSrc}
                alt="Zubair & Sons Device Collection Showcase"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              {/* Overlay shading to integrate with page styling */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c0c1e]/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1c0c1e]/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Futuristic layout coordinates tag in corner (discreet and polished) */}
            <div className="absolute bottom-5 right-5 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-mono text-white/80 font-medium">STUDIO EDITION</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
