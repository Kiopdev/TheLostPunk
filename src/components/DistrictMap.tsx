import { motion } from 'motion/react';
import { useState } from 'react';

const DISTRICTS = [
  { id: 'd1', name: 'NEON HEIGHTS', x: 20, y: 30, level: 'DANGER', desc: 'The corporate elite.' },
  { id: 'd2', name: 'THE UNDERCITY', x: 60, y: 60, level: 'LETHAL', desc: 'Forgotten by the sun.' },
  { id: 'd3', name: 'SECTOR 4', x: 80, y: 30, level: 'UNKNOWN', desc: 'Signal lost.' }
];

export default function DistrictMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative py-32 px-6 bg-[#020202] text-white min-h-screen overflow-hidden flex items-center justify-center border-t border-white/5">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 mix-blend-screen scale-110"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Info Panel */}
        <div className="w-full lg:w-1/3 space-y-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold/50"></div>
            <span className="text-gold font-mono text-sm tracking-[0.2em] uppercase">Global Map</span>
          </div>
          <h2 className="font-serif text-5xl">DISTRICTS</h2>
          
          <div className="h-48 border-l border-gold/20 pl-6">
            {active ? (
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {DISTRICTS.filter(d => d.id === active).map(d => (
                  <div key={d.id}>
                    <h3 className="font-serif text-3xl mb-2">{d.name}</h3>
                    <span className="font-mono text-xs text-red-400 tracking-widest border border-red-900/50 bg-red-900/10 px-2 py-1 mb-4 inline-block">{d.level}</span>
                    <p className="font-sans text-gray-400">{d.desc}</p>
                  </div>
                ))}
              </motion.div>
            ) : (
              <p className="font-mono text-white/30 text-sm animate-pulse mt-12">AWAITING SELECTION...</p>
            )}
          </div>
        </div>

        {/* The Map (Simulated via grid and dots) */}
        <div className="w-full lg:w-2/3 aspect-video relative bg-dark-card/30 border border-white/5 backdrop-blur-md rounded-sm overflow-hidden" data-interactive="true">
          {/* Grid lines */}
          <div className="absolute inset-0 border-[0.5px] border-white/5 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          {DISTRICTS.map((district) => (
            <motion.div
              key={district.id}
              className="absolute group"
              style={{ left: `${district.x}%`, top: `${district.y}%` }}
              onHoverStart={() => setActive(district.id)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="relative flex items-center justify-center w-8 h-8 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute inset-0 bg-gold/20 rounded-full animate-ping"></div>
                <div className={`w-2 h-2 rounded-full ${active === district.id ? 'bg-white' : 'bg-gold'} transition-colors shadow-[0_0_10px_rgba(197,160,89,1)]`}></div>
              </div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="bg-dark-bg border border-gold/30 px-3 py-1 font-mono text-xs text-gold uppercase tracking-widest backdrop-blur-md">
                   {district.name}
                 </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
