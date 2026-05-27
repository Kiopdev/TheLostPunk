import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { SocialLinks } from '../types';
import { Disc, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [socials, setSocials] = useState<SocialLinks>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  const blur = useTransform(scrollY, [0, 100], [0, 8]);

  useEffect(() => {
    fetch('/config/socials.json')
      .then(res => res.json())
      .then(data => setSocials(data));
  }, []);

  const links = ['Home', 'Archive', 'Districts', 'Devlogs'];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if(id === 'Home') window.scrollTo({ top: 0, behavior: 'smooth' });
    else document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-[80] flex justify-between items-center px-6 py-6 border-b border-transparent transition-all duration-300"
        style={{
          backgroundColor: useTransform(bgOpacity, v => `rgba(3, 3, 3, ${v})`),
          backdropFilter: useTransform(blur, v => `blur(${v}px)`),
          borderBottomColor: useTransform(scrollY, [0, 100], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.05)'])
        }}
      >
        <div className="font-serif text-xl tracking-widest text-white group cursor-pointer" onClick={() => scrollTo('Home')} data-interactive="true">
          SYN<span className="text-gold group-hover:text-white transition-colors">T</span>AX
        </div>

        <div className="hidden md:flex gap-8 items-center">
          {links.map(link => (
            <button 
              key={link} 
              onClick={() => scrollTo(link)}
              className="font-mono text-xs uppercase text-white/50 hover:text-gold transition-colors tracking-[0.2em]"
              data-interactive="true"
            >
              {link}
            </button>
          ))}
          
          <div className="w-px h-4 bg-white/20 mx-2"></div>
          
          <button className="flex items-center gap-2 font-mono text-xs uppercase text-white border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors" data-interactive="true">
            Join Discord <Disc size={14} />
          </button>
        </div>

        <button 
          className="md:hidden text-white" 
          onClick={() => setMenuOpen(true)}
          data-interactive="true"
        >
          <Menu />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div 
        className={`fixed inset-0 z-[90] bg-dark-bg flex flex-col justify-center items-center gap-8 ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <button className="absolute top-8 right-8 text-white" onClick={() => setMenuOpen(false)}>
          <X size={32} />
        </button>
        {links.map(link => (
          <button 
            key={link} 
            onClick={() => scrollTo(link)}
            className="font-serif text-4xl text-white hover:text-gold transition-colors"
          >
            {link}
          </button>
        ))}
      </motion.div>
    </>
  );
}
