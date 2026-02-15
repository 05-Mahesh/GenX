
import React, { useState, useRef, useEffect } from 'react';
import { getTradeAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to the GenX Overseas Trade Intelligence Desk. I am equipped with real-time Indian market data and global shipping protocols. How can I assist with your sourcing requirements today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getTradeAdvice(input, messages);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "The trade intelligence service is currently undergoing routine maintenance. For immediate business inquiries, please reach out to genxoverseasindia1@gmail.com." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-indigo-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">Trade Intelligence Division</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Export Research Desk</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Access real-time Indian Mandi prices, quality standards, and logistics intelligence for your global supply chain.</p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 h-[700px] flex flex-col relative">
            {/* Header: Pure Professional */}
            <div className="bg-slate-900 p-6 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg tracking-tight">Trade Strategist</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    <p className="text-emerald-400 text-[9px] font-bold uppercase tracking-[0.2em]">Verified Market Feed</p>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                  <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest block mb-0.5">Desk Identity</span>
                  <span className="text-white text-[10px] font-medium opacity-80">GX-INDIA-7204</span>
                </div>
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] p-6 rounded-3xl shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    {msg.role === 'model' && idx === 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-50 flex gap-2">
                        {['Turmeric Prices', 'Shipping to Dubai', 'HS Codes'].map(tag => (
                          <button 
                            key={tag}
                            onClick={() => setInput(`What are the current ${tag}?`)}
                            className="text-[9px] font-bold uppercase tracking-wider bg-slate-50 text-slate-400 px-3 py-1.5 rounded-lg border border-slate-100 hover:border-indigo-200 hover:text-indigo-600 transition-all"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 p-6 rounded-3xl rounded-tl-none flex items-center space-x-2 shadow-sm">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.1s]"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-2">Synchronizing Market Data...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-8 bg-white border-t border-slate-100">
              <div className="relative group">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Inquire about commodity prices, logistics, or quality standards..."
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-5 pl-8 pr-20 text-sm focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all outline-none"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className={`absolute right-3 top-2.5 p-4 rounded-xl shadow-lg transition-all ${
                    isLoading ? 'bg-slate-200 text-slate-400' : 'bg-slate-900 text-white hover:bg-indigo-600'
                  }`}
                  aria-label="Send Trade Inquiry"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
              <p className="text-[9px] text-center text-slate-400 mt-4 uppercase tracking-[0.2em] font-medium">
                Official Trade Intelligence Feed • Powered by GenX Overseas India
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
