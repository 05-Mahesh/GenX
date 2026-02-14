import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const VISION_DATA = [
  { metric: 'Phase 1', value: 40 },
  { metric: 'Phase 2', value: 65 },
  { metric: 'Phase 3', value: 85 },
  { metric: 'Phase 4', value: 100 },
];

const GlobalReach: React.FC = () => {
  return (
    <section id="reach" className="py-24 bg-slate-900 text-white overflow-hidden" aria-labelledby="reach-title">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center mb-16 gap-16">
          <div className="lg:w-1/2">
            <span className="text-indigo-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">International Trade Logistics</span>
            <h2 id="reach-title" className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
              Export Reach Across <br />
              <span className="text-indigo-400">Global Hubs</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
              GenX Overseas orchestrates high-volume trade routes connecting Indian heartlands to major global markets including <strong>North America, Europe, the Middle East, and Southeast Asia.</strong> Our direct-sourcing model empowers small-holder farmers while ensuring export-grade quality.
            </p>
            
            <div className="grid grid-cols-2 gap-y-12 gap-x-8">
              <div>
                <p className="text-4xl font-bold mb-2 text-white">EU/US</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Major Markets Served</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2 text-indigo-400">GCC</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Middle East Operations</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2 text-white">100%</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Trade Compliance</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2 text-indigo-400">Zero</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Supply Chain Leakage</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="bg-slate-800/40 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <div className="bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-indigo-500/30">
                  Global Trade Roadmap
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-8 flex items-center">
                Strategic Export Growth Vision
              </h3>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={VISION_DATA}>
                    <defs>
                      <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis 
                      dataKey="metric" 
                      stroke="#475569" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                      itemStyle={{ fontSize: '11px', color: '#818cf8' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#6366f1" 
                      fillOpacity={1} 
                      fill="url(#colorImpact)" 
                      strokeWidth={4}
                      name="Export Capacity"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mt-6">
                {['Source', 'Certify', 'Logistics', 'Deliver'].map(step => (
                  <div key={step} className="text-center">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mx-auto mb-2"></div>
                    <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalReach;