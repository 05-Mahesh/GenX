
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
          <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Indian Export Excellence
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-8">
            Bringing <span className="text-indigo-600">India's Best</span> to the World
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
            From premium organic spices to cutting-edge electronics, we orchestrate the flow of Indian quality across six continents with unmatched reliability.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all transform hover:-translate-y-1 shadow-xl">
              Explore Products
            </button>
            <button className="bg-white border-2 border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center space-x-2">
              <span>Trade Logistics</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
          
          <div className="mt-16 flex items-center space-x-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://picsum.photos/seed/${i + 15}/40/40`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Client" />
              ))}
            </div>
            <div className="text-sm">
              <p className="font-bold text-slate-900">Trusted by 2,000+ Partners</p>
              <div className="flex items-center text-amber-500">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-slate-500 font-medium">5.0 Trade Rating</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200" 
              alt="Logistics Port" 
              className="w-full h-auto"
            />
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
                <div className="bg-indigo-600 h-full w-[94%]"></div>
              </div>
              <p className="text-xs text-slate-500">94.8% On-time delivery rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
