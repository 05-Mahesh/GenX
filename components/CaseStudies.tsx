import React from 'react';
import { CASE_STUDIES } from '../constants';

const CaseStudies: React.FC = () => {
  return (
    <section id="case-studies" className="py-24 bg-slate-50" aria-labelledby="case-studies-heading">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs">Trade Research & Intelligence</span>
          <h2 id="case-studies-heading" className="text-4xl font-serif font-bold mt-4 mb-6 text-slate-900">Indian Market Intelligence Reports</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            We pioneer data-driven trade bridges. Explore our latest findings on Indian export optimization, supply chain sustainability, and global logistics efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {CASE_STUDIES.map((cs) => (
            <article key={cs.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={cs.image} 
                  alt={`Case Study: ${cs.title} - Indian Trade Research`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {cs.stats}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {cs.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {cs.title}
                </h3>
                <p className="text-indigo-600 text-sm font-semibold mb-4">{cs.subtitle}</p>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  {cs.description}
                </p>
                
                <button 
                  className="flex items-center text-slate-900 font-bold text-sm hover:space-x-3 space-x-2 transition-all"
                  aria-label={`Read full research report on ${cs.title}`}
                >
                  <span>Read Full Report</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;