import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center pt-20 overflow-hidden">
      {/* Background with abstract shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 left-[-10%] w-[400px] h-[400px] bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
            Global Trade Excellence
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-8">
            Bringing <span className="text-indigo-600">India's Best</span> to the World
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-lg leading-relaxed">
            From premium organic spices to precision electronics, we orchestrate the flow of Indian quality across global markets with absolute reliability and transparency.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#products" className="bg-slate-900 text-white px-10 py-5 rounded-xl font-bold hover:bg-indigo-700 transition-all transform hover:-translate-y-1 shadow-xl text-center flex items-center justify-center uppercase tracking-widest text-[11px]">
              Explore Products
            </a>
            <button className="bg-white border-2 border-slate-200 text-slate-900 px-10 py-5 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center space-x-2 uppercase tracking-widest text-[11px]">
              <span>Trade Logistics</span>
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        <div className="md:w-1/2 relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-all duration-700 group">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200" 
              alt="Logistics and Trade" 
              className="w-full h-auto group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-indigo-900/5 mix-blend-multiply"></div>
          </div>
          <div className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden lg:block">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-tight">Compliance Status</p>
                <p className="text-lg font-bold">AEO Certified</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[100%]"></div>
              </div>
              <p className="text-xs text-slate-500 font-medium tracking-tight">Standard Export Quality Protocol</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;