"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Monitor, Smartphone, Tablet, Camera, Headphones, 
  Volume2, Mic, Watch, Disc, Sparkles, Star, Plus, Eye 
} from 'lucide-react';
import { Product, PRODUCTS } from '@/data/products';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export default function ProductCatalog({ onSelectProduct, onQuickAdd }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Displays', 'Mobile', 'Audio', 'Capture', 'Wearables'];

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  // Helper to render specific device icons
  const getProductIcon = (id: string, size = 28) => {
    switch (id) {
      case 'display-32': return <Monitor size={size} />;
      case 'tablet-11': return <Tablet size={size} />;
      case 'phone-apex': return <Smartphone size={size} />;
      case 'camera-dslr': return <Camera size={size} />;
      case 'headphones-pro': return <Headphones size={size} />;
      case 'speaker-cylinder': return <Volume2 size={size} />;
      case 'micro-studio': return <Mic size={size} />;
      case 'watch-chrono': return <Watch size={size} />;
      case 'buds-pro': return <Headphones size={size} />; // earbuds
      case 'ring-aura': return <Disc size={size} />; // ring
      default: return <Sparkles size={size} />;
    }
  };

  return (
    <section id="products" className="py-24 max-w-7xl mx-auto px-6 space-y-16 scroll-mt-20">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full text-[11px] font-mono tracking-wider font-semibold uppercase">
            Product Catalog
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
            Explore the Device Collection
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-xl">
            Satin obsidian finishes combined with state-of-the-art hardware. Select a device below to customize specifications and colors.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all relative cursor-pointer ${
                selectedCategory === cat 
                  ? 'text-white' 
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {cat}
              {selectedCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-white/10 rounded-xl border border-white/10"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid listing */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={product.id}
              className="group bg-[#150917]/40 border border-white/5 rounded-2xl p-5 hover:border-white/20 hover:bg-[#150917]/70 transition-all duration-300 flex flex-col justify-between h-[420px] relative"
            >
              <div>
                {/* Visual Icon Header Card */}
                <div className="w-full h-36 rounded-xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 flex items-center justify-center relative overflow-hidden mb-6">
                  {/* Subtle radial glow background */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Vector Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-[#1c0c1e] border border-white/10 group-hover:border-orange-500/30 text-white/70 group-hover:text-orange-400 group-hover:scale-110 flex items-center justify-center shadow-lg transition-all duration-500">
                    {getProductIcon(product.id, 28)}
                  </div>

                  {/* Stock tag */}
                  <div className="absolute top-3 right-3 text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-white/60">
                    {product.isAvailable ? 'In Stock' : 'On Backorder'}
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-1.5 mb-2.5">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-xs font-semibold text-white/80">{product.rating}</span>
                  <span className="text-white/30 text-[10px]">({product.reviews} reviews)</span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg text-white group-hover:text-orange-400 transition-colors">
                  {product.name}
                </h3>

                {/* Tagline */}
                <p className="text-xs text-white/50 font-medium line-clamp-1 mt-1">
                  {product.tagline}
                </p>
              </div>

              {/* Price and CTAs */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/40 block font-mono uppercase tracking-wider">Start pre-order</span>
                  <span className="text-xl font-bold text-white font-mono leading-none">${product.price}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Configure View Details */}
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="p-2.5 rounded-xl border border-white/10 hover:border-white/20 text-white/70 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Quick Add */}
                  <button
                    onClick={() => onQuickAdd(product)}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-md shadow-orange-500/5 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                    title="Quick Add to Pre-order"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
