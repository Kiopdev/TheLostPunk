import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const bootLogs = [
    "INITIALIZING CORE SYSTEM...",
    "DECRYPTING ARCHIVE DATABANKS...",
    "ESTABLISHING NEURAL LINK...",
    "WARNING: SECTOR 4 SIGNAL INTERFERENCE DETECTED",
    "BYPASSING SECURITY PROTOCOLS...",
    "ACCESS GRANTED",
  ];

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => setStage(1), 800);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (stage === 1) {
      setTimeout(() => onComplete(), 1500);
    }
  }, [stage, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-dark-bg flex flex-col items-center justify-center font-mono text-gold overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="w-full max-w-3xl p-8 text-sm md:text-base leading-relaxed">
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-2"
            >
              {`> ${log}`}
            </motion.div>
          ))}
          {stage === 0 && (
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              _
            </motion.div>
          )}
        </div>
        {stage === 1 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <h1 className="text-4xl md:text-7xl font-serif text-white tracking-widest uppercase opacity-20">
              System Online
            </h1>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
