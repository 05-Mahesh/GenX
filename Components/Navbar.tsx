import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  onInquiryClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onInquiryClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-md py-4' : 'bg-transparent py-7'
    }`}>
      <nav className="container mx-auto px-6 flex justify-between items-center" aria-label="Main Navigation">
        <a href="#home" className="flex items-center group relative" aria-label="GenX Overseas Home">
          <div className="flex flex-col leading-none transition-all duration-500 transform group-hover:scale-[1.02]">
            <span className={`font-serif text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-500 ${
              isScrolled ? 'text-slate-900' : 'text-slate-900'
            }`}>
              GenX <span className="text-indigo-600 font-sans font-light tracking-[0.1em] uppercase ml-1">Overseas</span>
              <span className="inline-block w-1.5 h-1.5 bg-indigo-600 rounded-full ml-1"></span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.45em] font-bold text-slate-400 mt-1.5">
              Indian Export Excellence
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {NAV_LINKS.map(link => (
            <a 
              key={link.label} 
              href={link.href}
              aria-current={activeSection === link.href.substring(1) ? 'page' : undefined}
              className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative py-2 ${
                activeSection === link.href.substring(1) 
                ? 'text-indigo-600' 
                : isScrolled ? 'text-slate-600 hover:text-indigo-600' : 'text-slate-900 hover:text-indigo-600'
              }`}
            >
              {link.label}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-indigo-600 rounded-full transition-all duration-300 ${
                activeSection === link.href.substring(1) ? 'w-full' : 'w-0'
              }`}></span>
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button 
            onClick={onInquiryClick}
            className="bg-slate-900 hover:bg-indigo-600 text-white px-8 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-xl hover:shadow-indigo-200 block active:scale-95"
            aria-label="Request a Trade Quote"
          >
            Request Quote
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-3 text-slate-900 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle Mobile Menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl shadow-2xl transition-all duration-500 ease-in-out overflow-hidden ${
        isMobileMenuOpen ? 'max-h-screen opacity-100 py-10 border-t border-slate-50' : 'max-h-0 opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center space-y-10">
          {NAV_LINKS.map(link => (
            <a 
              key={link.label} 
              href={link.href}
              className={`text-lg font-bold uppercase tracking-[0.2em] px-8 py-2 ${
                activeSection === link.href.substring(1) ? 'text-indigo-600' : 'text-slate-600'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onInquiryClick();
            }}
            className="bg-indigo-600 text-white px-14 py-5 rounded-2xl text-sm font-bold uppercase tracking-widest shadow-lg shadow-indigo-100"
          >
            Inquiry Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;