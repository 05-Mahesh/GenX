
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

const FloatingChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm the GenX Trade Assistant. How can I help you with Indian export research or market pricing today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch("/api/trade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input, history: messages })
      });

      if (!res.ok) throw new Error("API Network Error");

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'model', text: data.reply || "Synchronization successful." }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "Service currently restricted. Please contact us at genxoverseasindia1@gmail.com for live support." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[400px] h-[600px] bg-white rounded-[2.5rem] shadow-3xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-12 duration-500">
          <div className="bg-slate-900 p-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white text-sm font-bold">Trade Desk</h3>
                <div className="flex items-center space-x-1.5">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                  <p className="text-emerald-400 text-[8px] font-bold uppercase tracking-widest">Secure Connect</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-5 rounded-[1.5rem] rounded-tl-none flex items-center space-x-2 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.1s]"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-6 bg-white border-t border-slate-100">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Secure market research..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-5 pr-14 text-sm focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-2 p-3 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-slate-900 text-white rounded-full shadow-3xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative border-2 border-white"
      >
        <div className="absolute inset-0 bg-indigo-600 rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default FloatingChatBot;
