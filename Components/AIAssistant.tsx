
import React, { useState, useRef, useEffect } from 'react';
import { getTradeAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm your GenX Trade Researcher. How can I assist you today with Indian market insights, sourcing, or logistics?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOpenKeySelection = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      // Assume success and refresh state
      setErrorOccurred(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setErrorOccurred(false);

    try {
      const advice = await getTradeAdvice(input, messages);
      setMessages(prev => [...prev, { role: 'model', text: advice }]);
    } catch (err) {
      setErrorOccurred(true);
      setMessages(prev => [...prev, { role: 'model', text: "Connection error: aistudio.google.com refused to connect. Please check your API key settings." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai" className="py-24 bg-indigo-50/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Indian Trade Consultant</h2>
            <p className="text-slate-600">Real-time intelligence for Indian sourcing and global logistics.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 h-[650px] flex flex-col">
            {/* Chat Header */}
            <div className="bg-slate-900 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold leading-none">GenX Research Bot</h3>
                  <p className="text-indigo-400 text-xs mt-1 font-medium tracking-wide uppercase">Active - Gemini 3 Powered</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {errorOccurred && (
                  <button 
                    onClick={handleOpenKeySelection}
                    className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-all font-bold uppercase tracking-wider"
                  >
                    Fix Connection
                  </button>
                )}
                <span className="hidden sm:block text-slate-400 text-xs">v4.0 Enterprise</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-2xl shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 p-5 rounded-2xl rounded-tl-none flex space-x-1 shadow-sm">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-8 border-t border-slate-100 bg-white">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Indian turmeric market research or mobile logistics..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4.5 pl-6 pr-16 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all outline-none"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className={`absolute right-3 p-3 rounded-xl transition-all shadow-md ${
                    isLoading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-indigo-600'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <div className="flex justify-between items-center mt-4 px-2">
                <p className="text-[10px] text-slate-400">
                  Powered by Gemini 3 Flash. Global Trade Analysis Engine.
                </p>
                {errorOccurred && (
                  <p className="text-[10px] text-red-500 font-bold animate-pulse">
                    Connection Refused. Try resetting key.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
