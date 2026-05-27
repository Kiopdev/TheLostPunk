import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { DevlogEntry } from '../types';

export default function Devlogs() {
  const [logs, setLogs] = useState<DevlogEntry[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/devlogs.json')
      .then(r => r.json())
      .then(d => setLogs(d));
  }, []);

  return (
    <section className="relative py-32 px-6 bg-dark-bg text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-px bg-white/30"></div>
          <span className="text-white/50 font-mono text-sm tracking-[0.2em] uppercase">SYSTEM.DEVLOGS</span>
        </div>
        <h2 className="font-serif text-4xl mb-16">DEVELOPMENT LOGS</h2>

        <div className="space-y-4">
          {logs.map((log, idx) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border border-white/10 bg-dark-card/30 backdrop-blur-sm group"
              data-interactive="true"
            >
              <button 
                onClick={() => setExpanded(expanded === log.id ? null : log.id)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-white/5 transition-colors"
              >
                <div>
                  <span className="font-mono text-gold/60 text-xs mb-2 block">{log.date}</span>
                  <h3 className="font-serif text-xl group-hover:text-gold transition-colors">{log.title}</h3>
                </div>
                <div className="flex gap-2">
                  {log.tags.map(t => (
                    <span key={t} className="font-mono text-[10px] tracking-widest border border-white/20 px-2 py-1 text-white/50 hidden sm:block">
                      {t}
                    </span>
                  ))}
                </div>
              </button>
              
              <motion.div
                initial={false}
                animate={{ height: expanded === log.id ? 'auto' : 0, opacity: expanded === log.id ? 1 : 0 }}
                className="overflow-hidden bg-black/20"
              >
                <div className="p-6 pt-0 font-sans text-gray-400 leading-relaxed border-t border-white/5 mt-4">
                  {log.description}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
