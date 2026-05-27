import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Terminal as TerminalIcon } from 'lucide-react';

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ type: 'input' | 'output' | 'error', text: string }[]>([
    { type: 'output', text: 'SYNTAX OS v9.2.1 ALIVE.' },
    { type: 'output', text: 'Type "help" for available commands.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: { type: 'output' | 'error', text: string }[] = [];

    switch (trimmed) {
      case 'help':
        response = [
          { type: 'output', text: 'AVAILABLE COMMANDS:' },
          { type: 'output', text: '  archive   - Access restricted files' },
          { type: 'output', text: '  status    - View system health' },
          { type: 'output', text: '  scan      - Search for local anomalies' },
          { type: 'output', text: '  clear     - Wipe terminal history' },
        ];
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'archive':
        response = [
          { type: 'output', text: 'ACCESSING ARCHIVE...' },
          { type: 'error', text: 'ERR: CORRUPTED DATA. ENCRYPTION KEY REQUIRED.' }
        ];
        break;
      case 'status':
        response = [
          { type: 'output', text: 'SYSTEM STATUS: DEGRADED' },
          { type: 'output', text: 'POWER CABLE: SEVERED' },
          { type: 'output', text: 'LOCAL NODES: OFFLINE' },
        ];
        break;
      case 'scan':
        response = [
          { type: 'output', text: 'SCANNING SECTOR...' },
          { type: 'output', text: '1 ANOMALY DETECTED IN DISTRICT 4.' },
          { type: 'output', text: 'WARNING: BIOLOGICAL SIGNATURE UNRECOGNIZED.' }
        ];
        break;
      case 'ghost':
        response = [
          { type: 'output', text: '...' },
          { type: 'output', text: 'They are still here. In the walls.' },
          { type: 'output', text: 'Do not trust the light.' }
        ];
        break;
      case '':
        break;
      default:
        response = [{ type: 'error', text: `COMMAND NOT FOUND: ${trimmed}` }];
    }

    setHistory(prev => [...prev, { type: 'input', text: cmd }, ...response]);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 z-50 p-4 rounded-full bg-dark-card border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold transition-colors backdrop-blur-md"
        data-interactive="true"
      >
        <TerminalIcon size={24} />
      </button>

      <motion.div
        initial={false}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : 20,
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
        className="fixed bottom-24 left-8 z-50 w-full max-w-lg bg-dark-card/90 backdrop-blur-xl border border-gold/20 p-1 sm:p-4 rounded-sm shadow-2xl font-mono text-sm"
      >
        <div className="flex border-b border-gold/20 pb-2 mb-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-900/50"></div>
            <div className="w-3 h-3 rounded-full bg-gold/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-900/50"></div>
          </div>
          <div className="ml-4 text-xs text-gold/50 tracking-widest uppercase">Terminal Access</div>
        </div>
        
        <div className="h-64 overflow-y-auto mb-4 space-y-2 text-gold/80 scrollbar-thin">
          {history.map((log, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`
                ${log.type === 'input' ? 'text-white' : ''}
                ${log.type === 'error' ? 'text-red-500' : ''}
              `}
            >
              {log.type === 'input' ? `> ${log.text}` : log.text}
            </motion.div>
          ))}
          <div ref={endRef} />
        </div>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(input);
          }}
          className="flex items-center gap-2 border-t border-gold/20 pt-4"
        >
          <span className="text-white">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white focus:ring-0 placeholder:text-gold/30"
            placeholder="AWAITING COMMAND..."
            data-interactive="true"
          />
        </form>
      </motion.div>
    </>
  );
}
