import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function TransmissionModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-dark-bg/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
        >
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-[210] p-4 text-gold hover:text-white transition-colors border border-gold/30 hover:border-white rounded-full bg-dark-card/50"
          >
            <X size={24} />
          </button>
          
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-7xl aspect-video bg-black overflow-hidden border border-gold/20 shadow-[0_0_100px_rgba(197,160,89,0.15)]"
          >
            {/* Ambient Lighting around video */}
            <div className="absolute -inset-4 bg-gold/20 blur-3xl rounded-[100%] opacity-30 mix-blend-screen pointer-events-none"></div>
            
            {/* YouTube Embedded Teaser */}
            <iframe 
              src="https://www.youtube.com/embed/Skstk2ErxDU?autoplay=1&modestbranding=1&rel=0&showinfo=0" 
              className="relative z-10 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            
            {/* Reticle Overlay */}
            <div className="absolute inset-0 border border-white/5 pointer-events-none mix-blend-overlay">
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-gold/50"></div>
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-gold/50"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-gold/50"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-gold/50"></div>
            </div>
            
            <div className="absolute bottom-4 left-8 font-mono text-xs text-gold/60 uppercase tracking-widest pointer-events-none">
              DEC / 0495.2.AA / TRANS
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
