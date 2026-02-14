import React from 'react';
import { LOGO_URL } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#030816] border-t border-white/5 pt-24 pb-12 overflow-hidden relative" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      {/* Dynamic Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start mb-24">
          {/* Brand Identity Section */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-10">
            {/* Professional Logo Placement - No Border, Wider Presence */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-indigo-600/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true"></div>
              <div className="relative w-56 h-auto md:w-64 flex items-center justify-center lg:justify-start transition-transform duration-500 group-hover:scale-[1.01]">
                <img 
                  src={LOGO_URL} 
                  alt="GenX Overseas - Premium Indian Export and Import Brand Logo" 
                  className="w-full h-auto object-contain brightness-110 contrast-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]" 
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                GenX Overseas is a leading Indian trade facilitator empowering local manufacturing with global market access. We ensure seamless logistics and absolute compliance across 50+ trade routes.
              </p>
              
              <nav className="flex justify-center lg:justify-start space-x-4" aria-label="Social links">
                {[1, 2, 3].map(i => (
                  <a key={i} href="#" className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer border border-white/5 group" aria-label={`Follow GenX Overseas on Social Platform ${i}`}>
                    <div className="w-4.5 h-4.5 border-2 border-current rounded-md group-hover:scale-110 transition-transform"></div>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 w-full">
            <div className="space-y-8">
              <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.4em] border-b border-white/5 pb-4 opacity-50">Global Portfolios</h4>
              <ul className="space-y-4">
                <li><a href="#products" className="text-slate-400 hover:text-indigo-400 text-xs font-medium transition-colors">Agro Commodities</a></li>
                <li><a href="#products" className="text-slate-400 hover:text-indigo-400 text-xs font-medium transition-colors">Consumer Tech</a></li>
                <li><a href="#products" className="text-slate-400 hover:text-indigo-400 text-xs font-medium transition-colors">Precision Industrial</a></li>
                <li><a href="#products" className="text-slate-400 hover:text-indigo-400 text-xs font-medium transition-colors">Textile Excellence</a></li>
              </ul>
            </div>
            
            <div className="space-y-8">
              <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.4em] border-b border-white/5 pb-4 opacity-50">Direct Channels</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-indigo-400 text-[9px] font-bold uppercase tracking-widest mb-1.5">Primary Trade Desk</p>
                  <a href="mailto:genxoverseasindia1@gmail.com" className="text-white text-xs font-medium hover:text-indigo-400 transition-colors break-words">
                    genxoverseasindia1@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-1.5">Sourcing Headquarters</p>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed">India Trade Hub, <br/>Global Export Zone (SEZ)</p>
                </div>
              </div>
            </div>

            <div className="space-y-8 col-span-2 md:col-span-1">
              <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.4em] border-b border-white/5 pb-4 opacity-50">Certifications</h4>
              <div className="flex flex-wrap gap-2.5">
                {['APEDA', 'MSME', 'DGFT', 'ISO 9001'].map(cert => (
                  <div key={cert} className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-[9px] font-black text-indigo-400/80 uppercase tracking-widest">
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
             <div className="w-8 h-4 bg-indigo-600/20 rounded flex items-center justify-center">
                <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" aria-hidden="true"></div>
             </div>
             <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] text-center md:text-left">
              © 2024 GenX Overseas India Ltd. All Rights Reserved.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500" aria-label="Legal documents">
            <a href="#" className="hover:text-white transition-colors">Privacy Charter</a>
            <a href="#" className="hover:text-white transition-colors">Trade Terms</a>
            <a href="#" className="hover:text-white transition-colors">Compliance</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;