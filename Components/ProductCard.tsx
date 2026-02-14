
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onInquire: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onInquire }) => {
  const [imgSrc, setImgSrc] = useState(product.image);
  const [isImgLoading, setIsImgLoading] = useState(true);

  // Keep imgSrc in sync with product.image prop
  useEffect(() => {
    setImgSrc(product.image);
    setIsImgLoading(true);
  }, [product.image]);

  const handleImgError = () => {
    setImgSrc(`https://images.unsplash.com/photo-1594488687196-035111a0a4ca?auto=format&fit=crop&q=80&w=1200&text=${encodeURIComponent(product.name)}`);
  };

  return (
    // Fixed: Corrected microdata attributes to React camelCase (itemScope, itemType)
    <article className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full" itemScope itemType="https://schema.org/Product">
      <div className="relative h-72 overflow-hidden bg-slate-100">
        {isImgLoading && (
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={imgSrc} 
          alt={`${product.name} - Premium Indian Export Grade ${product.category}`} 
          onLoad={() => setIsImgLoading(false)}
          onError={handleImgError}
          loading="lazy"
          decoding="async"
          // Fixed: Corrected itemprop to itemProp
          itemProp="image"
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${isImgLoading ? 'opacity-0' : 'opacity-100'}`}
        />
        <div className="absolute top-4 left-4">
          {/* Fixed: Corrected itemprop to itemProp */}
          <span className="bg-white/90 backdrop-blur-sm text-indigo-600 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider" itemProp="category">
            {product.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
          <button 
            onClick={() => onInquire(product)}
            className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold text-sm hover:bg-indigo-600 hover:text-white transition-all shadow-lg"
            aria-label={`Get instant quote for ${product.name}`}
          >
            Instant Quote
          </button>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          {/* Fixed: Corrected itemprop to itemProp */}
          <h3 className="text-xl font-bold text-slate-900" itemProp="name">{product.name}</h3>
          {/* Fixed: Corrected itemprop to itemProp */}
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md" itemProp="countryOfOrigin">Source: {product.origin}</span>
        </div>
        {/* Fixed: Corrected itemprop to itemProp */}
        <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed" itemProp="description">
          {product.description}
        </p>
        
        <div className="space-y-2.5 mt-auto">
          {product.specifications.map((spec, idx) => (
            <div key={idx} className="flex items-center text-[11px] text-slate-600 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2.5" aria-hidden="true"></div>
              {spec}
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => onInquire(product)}
          className="mt-6 w-full py-3 rounded-xl border border-slate-200 text-slate-900 text-xs font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-[0.98]"
          aria-label={`Request technical data sheet for ${product.name} exports`}
        >
          Request Technical Sheet
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
