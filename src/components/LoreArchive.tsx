import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LoreEntry } from '../types';

export default function LoreArchive() {
  const [lore, setLore] = useState<LoreEntry[]>([]);

  useEffect(() => {
    fetch('/data/lore.json')
      .then(res => res.json())
      .then(data => setLore(data))
      .catch(err => console.error("Archive databank corrupted:", err));
  }, []);

  return (
    <section id="archive" className="relative py-32 px-6 bg-dark-bg text-white min-h-screen">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold/50"></div>
            <span className="text-gold font-mono text-sm tracking-[0.2em] uppercase">Archive Network</span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl">RESTRICTED DOSSIERS</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lore.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group relative border border-white/5 bg-dark-card/50 p-8 hover:bg-white/[0.02] transition-colors duration-500 overflow-hidden cursor-pointer"
              data-interactive="true"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[80px] group-hover:bg-gold/20 transition-all duration-700"></div>
              
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="font-serif text-2xl mb-2">{entry.title}</h3>
                  <span className={`font-mono text-xs tracking-widest px-2 py-1 border ${entry.classification === 'TOP SECRET' ? 'border-red-900/50 text-red-500 bg-red-900/10' : 'border-gold/30 text-gold/70 bg-gold/5'}`}>
                    {entry.classification}
                  </span>
                </div>
                <span className="font-mono text-white/20 text-sm">{String(idx + 1).padStart(2, '0')}</span>
              </div>
              
              <p className={`font-sans text-gray-400 leading-relaxed ${entry.corrupted ? 'animate-[glitch_2s_infinite] opacity-50' : ''}`}>
                {entry.content}
              </p>

              {/* Hover Frame */}
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-colors duration-500 pointer-events-none"></div>
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
