import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import AIAssistant from './components/AIAssistant';
import CaseStudies from './components/CaseStudies';
import QuoteModal from './components/QuoteModal';
import GlobalReach from './components/GlobalReach';
import Footer from './components/Footer';
import { PRODUCTS } from './constants';
import { Product } from './types';

const App: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(PRODUCTS.map(p => p.category))];
    return cats;
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleOpenQuote = (product: Product | null) => {
    setSelectedProduct(product);
    setIsQuoteModalOpen(true);
  };

  const handleGeneralInquiry = () => {
    handleOpenQuote(null);
  };

  return (
    <div className="min-h-screen">
      <Navbar onInquiryClick={handleGeneralInquiry} />
      
      <main>
        <Hero />

        {/* Product Showcase Section */}
        <section id="products" className="py-24 bg-white" aria-labelledby="products-title">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-6 md:space-y-0">
              <div className="md:w-1/2">
                <h2 id="products-title" className="text-4xl font-serif font-bold mb-4">Premium Indian Trade Catalog</h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                  Directly sourced from Indian heartlands. We provide certified high-grade agricultural produce, precision electronics, and industrial parts for global distributors.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-end" role="tablist">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    role="tab"
                    aria-selected={activeCategory === cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all border ${
                      activeCategory === cat 
                      ? 'bg-slate-900 text-white border-slate-900' 
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onInquire={handleOpenQuote}
                />
              ))}
            </div>
          </div>
        </section>

        <GlobalReach />
        <CaseStudies />
        <AIAssistant />

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white relative overflow-hidden" aria-labelledby="contact-title">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto bg-slate-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden shadow-3xl">
              <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
                <div className="lg:w-1/2">
                  <h2 id="contact-title" className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
                    Partner with India's <span className="text-indigo-400">Export Hub.</span>
                  </h2>
                  <div className="space-y-6 text-left">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm font-medium">Export Inquiries</p>
                        <a href="mailto:genxoverseasindia1@gmail.com" className="text-white font-bold hover:text-indigo-400 transition-colors">genxoverseasindia1@gmail.com</a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm font-medium">Global Headquarters</p>
                        <p className="text-white font-bold">India Trade Hub, International Trade Zone</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 w-full">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleGeneralInquiry();
                    }}
                    className="bg-white p-8 lg:p-10 rounded-[2rem] space-y-4 shadow-2xl"
                  >
                    <p className="text-slate-900 font-bold mb-2">Request Trade Consultation</p>
                    <input aria-label="Full Name" type="text" placeholder="Full Name" className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all outline-none" required />
                    <textarea aria-label="Message" rows={4} placeholder="Describe your sourcing requirements (e.g., volume, specifications, destination port)..." className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none" required></textarea>
                    <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-xl hover:bg-indigo-700 transition-all">
                      Connect with Trade Experts
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
        selectedProduct={selectedProduct} 
      />
    </div>
  );
};

export default App;