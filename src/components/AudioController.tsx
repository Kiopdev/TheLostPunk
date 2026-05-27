import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

export default function AudioController() {
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // We synthesize a low drone for the ambient track.
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioCtxRef.current;
      
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.value = 55; // Low A

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.value = 55.5; // Slight detune

      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.1; // Slow modulation

      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 10;
      lfo.connect(lfoGain);
      lfoGain.connect(osc2.frequency);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 120;

      const masterGain = ctx.createGain();
      masterGain.gain.value = 0; // Start muted
      gainNodeRef.current = masterGain;

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      lfo.start();
    }

    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  const toggleMute = () => {
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    
    setIsMuted(!isMuted);
    
    if (gainNodeRef.current && audioCtxRef.current) {
      const targetGain = isMuted ? 0.3 : 0;
      gainNodeRef.current.gain.setTargetAtTime(targetGain, audioCtxRef.current.currentTime, 1);
    }
  };

  return (
    <motion.button
      onClick={toggleMute}
      className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-dark-card border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle Audio"
    >
      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </motion.button>
  );
}
