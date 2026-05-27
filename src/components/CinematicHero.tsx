import { motion, useScroll, useTransform } from 'motion/react';
import { Play } from 'lucide-react';
import { useRef } from 'react';

export default function CinematicHero({ onWatchClick }: { onWatchClick: () => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center">
      <motion.div 
        className="absolute inset-0 z-0 bg-dark-bg"
        style={{ y: y1 }}
      >
        {/* We use a procedural CSS background that looks like a dark foggy city / particles */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-dark-bg to-dark-bg"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        {/* Fake rain / particles overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
      </motion.div>

      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <span className="text-gold font-mono tracking-[0.3em] text-sm uppercase mb-6 block">We Create Worlds Worth Exploring</span>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[9rem] leading-none mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            THE LOST PUNK
          </h1>
          <p className="font-sans font-light text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12">
            A story of identity, friendship, and survival. A world forgotten by time.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <button 
            onClick={onWatchClick}
            className="group relative flex items-center gap-4 px-8 py-4 border border-gold/50 bg-dark-card/50 backdrop-blur-sm hover:border-gold transition-all duration-500 overflow-hidden"
            data-interactive="true"
          >
            <div className="absolute inset-0 bg-gold/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
            <span className="relative z-10 uppercase font-mono text-sm tracking-widest text-gold group-hover:text-white transition-colors">Watch Transmission</span>
            <Play size={16} className="relative z-10 text-gold group-hover:text-white transition-colors" />
          </button>
          
          <button 
            className="group relative flex items-center gap-4 px-8 py-4 border border-white/20 bg-dark-card/30 backdrop-blur-sm hover:border-white transition-all duration-500 overflow-hidden"
            onClick={() => document.getElementById('archive')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="absolute inset-0 bg-white/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <span className="relative z-10 uppercase font-mono text-sm tracking-widest text-white">Enter Archive</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Cinematic Scanline Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 h-[10vh] w-full bg-gradient-to-b from-transparent via-gold/[0.03] to-transparent opacity-50 animate-[scanline_8s_linear_infinite]" />
    </section>
  );
}
