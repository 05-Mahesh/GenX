import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import emailjs from 'https://esm.sh/@emailjs/browser';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, selectedProduct }) => {
  const [step, setStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    productId: '',
    quantity: '',
    requirements: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (selectedProduct) {
        setFormData(prev => ({ ...prev, productId: selectedProduct.id }));
      } else {
        setFormData(prev => ({ ...prev, productId: 'none' }));
      }
    }
  }, [selectedProduct, isOpen]);

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const currentProduct = PRODUCTS.find(p => p.id === formData.productId) || selectedProduct;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);

    const templateParams = {
      product_name: currentProduct ? currentProduct.name : 'General Business Consultation',
      from_name: formData.fullName,
      from_email: formData.email,
      quantity: formData.quantity || 'N/A',
      message: formData.requirements,
      to_email: 'genxoverseasindia1@gmail.com'
    };

    try {
      const serviceId = 'service_qa14vmm';
      const templateId = 'template_an37l2o';
      const publicKey = '2CywtC_SZgoC5qxwD';

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setIsSubmitted(true);
      
      setTimeout(() => {
        onClose();
        setTimeout(() => {
          setIsSubmitted(false);
          setStep(1);
          setIsSending(false);
          setFormData({
            fullName: '',
            email: '',
            productId: '',
            quantity: '',
            requirements: ''
          });
        }, 500);
      }, 5000);
    } catch (err: any) {
      console.error("EmailJS Error:", err);
      setError("Failed to send enquiry. Please try again or email us directly at genxoverseasindia1@gmail.com");
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#030816]/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-[2.5rem] w-full max-w-4xl overflow-hidden shadow-3xl animate-in fade-in zoom-in duration-500 flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Sidebar: Context */}
        <div className="md:w-1/3 bg-[#030816] p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold mb-8 leading-tight">Export <br/>Consultation</h2>
            <div className="space-y-10">
              <div className="flex items-start space-x-5">
                <div className="mt-1 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5">Direct Response</p>
                  <p className="text-xs font-medium text-slate-200">genxoverseasindia1@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-5">
                <div className="mt-1 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5">Global HQ</p>
                  <p className="text-sm font-medium text-slate-200 leading-relaxed">India Trade Hub</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/10 relative z-10">
            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.3em] leading-loose mb-2">Verified Standards</p>
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
              We ensure 100% quality compliance through direct farm-to-port logistics for every shipment.
            </p>
          </div>
        </div>

        {/* Right Area: Interactive Form */}
        <div className="flex-1 p-12 relative bg-white flex flex-col">
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-colors p-2 hover:bg-slate-50 rounded-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {isSubmitted ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-4xl font-serif font-bold text-slate-900 mb-4">Inquiry Sent</h3>
              <p className="text-slate-500 mb-10 max-w-sm text-lg leading-relaxed">
                Thank you for reaching out. We will review your requirements and provide a technical trade quote within 24 business hours.
              </p>
              <button 
                onClick={onClose}
                className="text-indigo-600 font-bold uppercase tracking-widest text-xs border-b-2 border-indigo-100 hover:border-indigo-600 transition-all pb-1"
              >
                Return to Portal
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="mb-12">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
                  <div className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
                </div>
                <h2 className="text-4xl font-serif font-bold text-slate-900 leading-tight">
                  {step === 1 ? 'Trade Requirements' : 'Company Details'}
                </h2>
              </div>

              {step === 1 && (
                <form onSubmit={handleNext} className="space-y-8 flex-1 flex flex-col animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="space-y-4">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] block">Inquiry Type</label>
                    <div className="flex flex-wrap gap-3">
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, productId: 'none'})}
                        className={`px-6 py-3 rounded-xl text-xs font-bold transition-all border-2 ${formData.productId === 'none' ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'}`}
                      >
                        General Trade
                      </button>
                      {PRODUCTS.slice(0, 3).map(p => (
                        <button 
                          key={p.id}
                          type="button"
                          onClick={() => setFormData({...formData, productId: p.id})}
                          className={`px-6 py-3 rounded-xl text-xs font-bold transition-all border-2 ${formData.productId === p.id ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'}`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="animate-in slide-in-from-top-4 duration-500">
                       <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] block mb-3">Quantity / Units</label>
                       <input 
                        required
                        type="text" 
                        placeholder="e.g. 50 MT / 2 Containers"
                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-indigo-600 outline-none transition-all placeholder:text-slate-300"
                        value={formData.quantity}
                        onChange={e => setFormData({...formData, quantity: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-h-[140px]">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] block mb-3">Message / Specifications</label>
                    <textarea 
                      required
                      className="w-full h-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-indigo-600 outline-none transition-all resize-none placeholder:text-slate-300"
                      placeholder="Detail your quality requirements or specific packing needs..."
                      value={formData.requirements}
                      onChange={e => setFormData({...formData, requirements: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-slate-900 text-white py-6 rounded-[1.25rem] font-bold shadow-2xl hover:bg-indigo-600 transition-all transform active:scale-[0.98] uppercase tracking-[0.2em] text-xs"
                  >
                    Next Step
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-8 flex-1 flex flex-col animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="space-y-6">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] block mb-3">Full Legal Name</label>
                      <input 
                        required
                        autoFocus
                        type="text" 
                        placeholder="Authorized Representative Name"
                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-indigo-600 outline-none transition-all placeholder:text-slate-300"
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] block mb-3">Professional Email</label>
                      <input 
                        required
                        type="email" 
                        placeholder="office@company.com"
                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-indigo-600 outline-none transition-all placeholder:text-slate-300"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 flex items-center space-x-3">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="flex-1 flex flex-col justify-end">
                    <div className="flex space-x-4">
                      <button 
                        type="button"
                        onClick={handleBack}
                        className="px-8 bg-slate-50 text-slate-400 rounded-2xl font-bold hover:bg-slate-100 hover:text-slate-600 transition-all text-[10px] uppercase tracking-widest"
                      >
                        Back
                      </button>
                      <button 
                        type="submit"
                        disabled={isSending}
                        className={`flex-1 py-6 rounded-[1.25rem] font-bold shadow-2xl transition-all transform active:scale-[0.98] uppercase tracking-[0.2em] text-xs flex items-center justify-center space-x-3 ${
                          isSending ? 'bg-slate-200 text-slate-400 cursor-wait' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {isSending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin"></div>
                            <span>Securing Transmission...</span>
                          </>
                        ) : (
                          <span>Submit Trade Inquiry</span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;