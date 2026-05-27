import { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import BootSequence from './components/BootSequence';
import AudioController from './components/AudioController';
import Navigation from './components/Navigation';
import CinematicHero from './components/CinematicHero';
import LoreArchive from './components/LoreArchive';
import DistrictMap from './components/DistrictMap';
import Devlogs from './components/Devlogs';
import Terminal from './components/Terminal';
import Footer from './components/Footer';
import TransmissionModal from './components/TransmissionModal';

export default function App() {
  const [booted, setBooted] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      {/* Ensures custom cursor works and hides default */}
      <CustomCursor />
      
      {/* Audio controller initialized early to handle user interaction */}
      <AudioController />

      {!booted ? (
        <BootSequence onComplete={() => setBooted(true)} />
      ) : (
        <main className="bg-dark-bg text-white min-h-screen font-sans selection:bg-gold/30 selection:text-white">
          <Navigation />
          
          <CinematicHero onWatchClick={() => setVideoOpen(true)} />
          
          <div className="relative z-10 bg-dark-bg">
            <LoreArchive />
            <div id="districts">
              <DistrictMap />
            </div>
            <div id="devlogs">
              <Devlogs />
            </div>
          </div>
          
          <Terminal />
          <Footer />

          <TransmissionModal 
            isOpen={videoOpen} 
            onClose={() => setVideoOpen(false)} 
          />
        </main>
      )}
    </>
  );
}
