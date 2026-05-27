export default function Footer() {
  return (
    <footer className="relative bg-[#020202] border-t border-white/5 pt-32 pb-16 px-6 overflow-hidden">
      {/* Decorative background numbers/code */}
      <div className="absolute top-0 right-0 p-8 font-mono text-[8vw] leading-none text-white/[0.02] pointer-events-none select-none break-all whitespace-pre-wrap max-h-full overflow-hidden opacity-30">
        01001100 01001111 01010011 01010100 00100000 01010011 01011001 01001110 01010100 01000001 01011000
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="max-w-md">
          <div className="font-serif text-3xl tracking-widest text-white mb-6">
            SYN<span className="text-gold">T</span>AX STUDIO
          </div>
          <p className="font-sans text-gray-500 mb-8 max-w-sm">
            Games are how we tell stories. Stories are how we leave a mark.
          </p>
          
          <div className="flex gap-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-mono text-xs text-green-500/50 uppercase tracking-widest">Signal Locked. TRNS-4952</span>
          </div>
        </div>

        <div className="flex gap-16">
          <div>
            <h4 className="font-mono text-white tracking-[0.2em] text-xs font-bold mb-6 uppercase">Explore</h4>
            <ul className="space-y-4 font-sans text-gray-500 text-sm">
              <li><button onClick={() => window.scrollTo(0,0)} className="hover:text-white transition-colors" data-interactive="true">Home</button></li>
              <li><button onClick={() => document.getElementById('archive')?.scrollIntoView()} className="hover:text-white transition-colors" data-interactive="true">Archive</button></li>
              <li><button className="hover:text-white transition-colors" data-interactive="true">Press Kit</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-white tracking-[0.2em] text-xs font-bold mb-6 uppercase">Connect</h4>
            <ul className="space-y-4 font-sans text-gray-500 text-sm">
              <li><a href="#" className="hover:text-white transition-colors" data-interactive="true">Discord</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-interactive="true">Twitter (X)</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-interactive="true">YouTube</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-700">
        <p>&copy; {new Date().getFullYear()} Syntax Studio. Fiction purposes only.</p>
        <p className="tracking-widest">COORDINATES: 45.912, -12.441</p>
      </div>
    </footer>
  );
}
