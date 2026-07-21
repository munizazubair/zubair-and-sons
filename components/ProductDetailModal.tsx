"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Check, Star, ShoppingBag, Plus, Minus, Info } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color: string) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.hex || '#111111');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features'>('specs');

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedColor);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/70 z-50 backdrop-blur-md"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="bg-[#180a1a] border border-white/10 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
        >
          {/* Left Side: Dynamic Visual Showcase */}
          <div className="bg-[#1c0c1e] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px]" />

            {/* Back button (Mobile) */}
            <button
              onClick={onClose}
              className="absolute top-6 left-6 md:hidden text-white/50 hover:text-white p-2 bg-white/5 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center py-8 space-y-4 flex-1 flex flex-col justify-center items-center relative z-10">
              <span className="text-[11px] font-mono tracking-wider text-orange-400 font-semibold uppercase bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
                {product.category}
              </span>
              <h3 className="font-display font-bold text-2xl text-white tracking-tight mt-3">
                {product.name}
              </h3>
              <p className="text-xs text-white/40 max-w-xs">{product.tagline}</p>

              {/* Big central decorative glow matching the selected color */}
              <div className="w-48 h-48 rounded-full border border-white/10 bg-black/40 shadow-2xl flex items-center justify-center relative my-8 group">
                <div 
                  className="absolute inset-4 rounded-full blur-xl opacity-30 transition-all duration-500"
                  style={{ backgroundColor: selectedColor }}
                />
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 text-white relative z-10 shadow-lg"
                  style={{ backgroundColor: `${selectedColor}40`, borderColor: selectedColor }}
                >
                  <ShoppingBag className="w-8 h-8" />
                </div>
              </div>

              {/* Color Swatch Selector */}
              <div className="space-y-2">
                <span className="text-xs text-white/50 font-medium block">Select Matte Finish</span>
                <div className="flex gap-3 justify-center items-center">
                  {product.colors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color.hex)}
                      className="p-1 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center"
                      style={{ 
                        borderColor: selectedColor === color.hex ? color.hex : 'transparent'
                      }}
                      title={color.name}
                    >
                      <div 
                        className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center"
                        style={{ backgroundColor: color.hex }}
                      >
                        {selectedColor === color.hex && (
                          <Check className="w-3 h-3 text-white stroke-[3px]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center text-[10px] text-white/30 font-mono mt-6">
              Zubair & Sons Electronics Customization Module
            </div>
          </div>

          {/* Right Side: Product Details & Configurator */}
          <div className="p-8 md:p-10 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 space-y-8">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5 text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold text-white/90">{product.rating}</span>
                    <span className="text-white/40 text-xs">({product.reviews} reviews)</span>
                  </div>
                  <h2 className="font-display font-bold text-2xl text-white">{product.name}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all cursor-pointer hidden md:block"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-white/70 leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Specs & Features Tabs */}
              <div className="space-y-4">
                <div className="flex border-b border-white/10 gap-4">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2.5 text-xs font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                      activeTab === 'specs' ? 'text-white' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    Technical Specifications
                    {activeTab === 'specs' && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 rounded-full" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('features')}
                    className={`pb-2.5 text-xs font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                      activeTab === 'features' ? 'text-white' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    Core Features
                    {activeTab === 'features' && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 rounded-full" />
                    )}
                  </button>
                </div>

                {activeTab === 'specs' ? (
                  <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="space-y-0.5">
                        <span className="text-[10px] text-white/40 uppercase tracking-wide block font-semibold">{key}</span>
                        <span className="text-xs text-white/80 font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start">
                        <div className="p-0.5 rounded bg-emerald-500/10 text-emerald-400 mt-0.5 border border-emerald-500/20">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-xs text-white/80 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Price and Configurator Buttons */}
            <div className="pt-6 border-t border-white/10 space-y-5">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Product Price</span>
                  <div className="text-3xl font-bold text-white font-mono leading-none mt-1">
                    ${(product.price * quantity).toLocaleString()}
                  </div>
                </div>

                {/* Quantity selector */}
                <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-full border border-white/10">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-all cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold font-mono text-white w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium rounded-full flex items-center justify-center gap-2.5 shadow-xl shadow-orange-500/10 active:scale-[0.98] transition-all cursor-pointer text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Secure Pre-order
                </button>
              </div>

              <div className="flex gap-2 items-center text-[10px] text-white/30 justify-center">
                <Info className="w-3 h-3" />
                <span>Zero pre-order holding fees. Cancel anytime.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
