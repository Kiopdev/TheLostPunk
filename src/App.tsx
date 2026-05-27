import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Background3D } from './components/3d/Background3D';
import { CustomCursor } from './components/ui/CustomCursor';
import { useAudioHover } from './hooks/useAudioHover';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './sections/Hero';
import { ProjectShowcase } from './sections/ProjectShowcase';
import { GameplayShowcase } from './sections/GameplayShowcase';
import { MediaShowcase } from './sections/MediaShowcase';
import { LoreShowcase } from './sections/LoreShowcase';
import { Foundation } from './sections/Foundation';
import { StudioSnapshot } from './sections/StudioSnapshot';
import { FutureUpdates } from './sections/FutureUpdates';
import { BehindTheVision } from './sections/BehindTheVision';
import { TerminalOverlay } from './components/ui/TerminalOverlay';
import { MusicSystem } from './components/audio/MusicSystem';
import { Discover } from './pages/Discover';

function Footer() {
  const [socials, setSocials] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/config/socials.json')
      .then(res => res.json())
      .then(data => setSocials(data))
      .catch(console.error);
  }, []);

  return (
    <footer className="relative z-10 bg-darker py-16 px-8 lg:px-24 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 text-xs font-sans text-gray-500">
        
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 group cursor-pointer mb-6">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-gold/40 rotate-45" />
              <span className="font-serif text-lg font-bold text-gold">X</span>
            </div>
            <div className="flex flex-col uppercase tracking-[0.2em] text-[10px] leading-tight">
              <span className="font-bold text-white">Syntax</span>
              <span className="text-gray-500">Studio</span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3 font-mono text-[10px] tracking-widest uppercase">
          <div className="text-white mb-2">Explore</div>
          <a href="/" className="hover:text-gold transition-colors">Home</a>
          <a href="#about" className="hover:text-gold transition-colors">About</a>
          <a href="/discover" className="hover:text-gold transition-colors">Our Project</a>
          <a href="/discover" className="hover:text-gold transition-colors">Journey</a>
        </div>

        <div className="flex flex-col gap-3 font-mono text-[10px] tracking-widest uppercase">
          <div className="text-white mb-2">Studio</div>
          <a href="#" className="hover:text-gold transition-colors">Team</a>
          <a href="#" className="hover:text-gold transition-colors">Careers</a>
          <a href="#" className="hover:text-gold transition-colors">Press Kit</a>
        </div>

        <div className="flex flex-col gap-3 font-mono text-[10px] tracking-widest uppercase">
          <div className="text-white mb-2">Connect</div>
          {Object.entries(socials).map(([key, url]) => (
            <a key={key} href={url} target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">
              {key}
            </a>
          ))}
        </div>

      </div>

      <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-serif text-gray-400 italic text-sm text-center md:text-left">
          "Games are how we tell stories. <br className="md:hidden" />Stories are how we leave a mark."
          <div className="font-signature mt-2 text-gold">Syntax Studio</div>
        </div>
        
        {/* Legal */}
        <div className="font-mono text-[9px] uppercase tracking-widest text-gray-600">
          © {new Date().getFullYear()} Syntax Studio. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <ProjectShowcase />
      <MediaShowcase />
      <GameplayShowcase />
      <LoreShowcase />
      <Foundation />
      <BehindTheVision />
      <FutureUpdates />
      <StudioSnapshot />
    </>
  );
}

export default function App() {
  useAudioHover();
  
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SmoothScroll>
        <CustomCursor />
        
        {/* 3D Atmosphere Layer */}
        <Background3D />
        
        {/* Global OS Elements */}
        <div className="scanline" />
        <div className="noise-overlay" />
        
        <MusicSystem />
        <TerminalOverlay />

        <Navbar />

        <main className="relative selection:bg-gold/30 selection:text-white min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/discover" element={<Discover />} />
          </Routes>
        </main>

        <Footer />
      </SmoothScroll>
    </BrowserRouter>
  );
}
