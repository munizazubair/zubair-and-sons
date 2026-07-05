"use client";
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Diamond, ShoppingBag, Sliders, Headset, ChevronRight, X, 
  ArrowRight, Info, Star, Plus, Minus, Cpu, Shield, Leaf, Zap, Layers, Volume2
} from 'lucide-react';

// Import our shared product models and data
import { Product, PRODUCTS } from '@/data/products';
import ProductDetailModal from '@/components/ProductDetailModal';
import SignInModal from '@/SignInModal';
import ProductCatalog from '@/components/ProductCatalog';
import TechFeatures from '@/components/TechFeatures';
import SupportPanel from '@/components/SupportPanel';

export default function App() {
  const [activeOverlay, setActiveOverlay] = useState<'products' | 'features' | 'support' | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [cart, setCart] = useState<{ product: Product; quantity: number; selectedColor: string }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Path to our beautifully generated high-resolution 3D device collection image
  const heroImageSrc = '/src/assets/images/device_collection_1783242967563.jpg';

  const handleAddToCart = (product: Product, quantity: number, color: string) => {
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.selectedColor === color
    );

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, quantity, selectedColor: color }]);
    }
  };

  const handleQuickAdd = (product: Product) => {
    const defaultColor = product.colors[0]?.hex || '#111111';
    handleAddToCart(product, 1, defaultColor);
    // Open cart automatically to show success
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(cart.filter((_, idx) => idx !== index));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-gradient-to-br from-[#120516] via-[#1e0a22] to-[#34112e] text-white min-h-screen selection:bg-orange-500/20 selection:text-white font-sans overflow-x-hidden relative flex flex-col justify-between antialiased">
      
      {/* Absolute top glowing background ambient mesh mimicking luxury studio light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(241,105,40,0.1)_0%,rgba(147,51,234,0.05)_40%,transparent_80%)] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* FIXED NAVIGATION HEADER */}
      <header className="w-full max-w-7xl mx-auto px-6 lg:px-12 h-24 flex items-center justify-between relative z-30 shrink-0">
        {/* Logo and Brand Name */}
        <div 
          onClick={() => setActiveOverlay(null)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Tilted solid diamond logo to match image exactly */}
          <div className="w-5 h-5 bg-white rotate-45 transform transition-transform duration-500 group-hover:rotate-135" />
          <span className="font-display font-semibold text-lg text-white tracking-tight leading-none ml-1 select-none">
            Zubair & Sons
          </span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-10">
          {(['products', 'features', 'support'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveOverlay(tab)}
              className={`font-sans text-[13px] tracking-wide font-medium transition-colors cursor-pointer capitalize ${
                activeOverlay === tab 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-4">
          {/* Shopping Cart button if cart has items */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full border border-white/10 hover:border-white/20 text-white hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Sign In Button with pill border matching screenshot exactly */}
          <button
            onClick={() => setIsSignInOpen(true)}
            className="px-5 py-1.5 rounded-full border border-white/20 hover:border-white text-xs text-white/90 font-medium hover:bg-white/5 transition-all cursor-pointer"
          >
            Sign in
          </button>
        </div>
      </header>

      {/* HERO SECTION / DYNAMIC MAIN STAGE */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 flex flex-col justify-center relative z-10 py-8 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Core Brand Messaging */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-7 flex flex-col justify-center"
          >
            <div className="space-y-4">
              <h1 className="font-sans font-bold text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
                Zubair & Sons<br />
              </h1>
              <p className="text-sm sm:text-base text-white/70 max-w-md leading-relaxed font-sans">
                Devices set containing smartphone, tablet, computer, TV, camera, speaker, smartwatch, microphone, headphones and more.
              </p>
            </div>

            {/* Shop now button styled exactly as warm orange pill with chevron */}
            <button
              onClick={() => setActiveOverlay('products')}
              className="group px-7 py-3 bg-[#e25c1d] hover:bg-[#eb6a2b] text-white rounded-full font-medium text-sm flex items-center gap-1.5 w-fit shadow-xl shadow-orange-500/10 active:scale-95 transition-all cursor-pointer"
            >
              <span>Shop now</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Right Column: Pristine 3D Devices Showcase Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.05 }}
            className="lg:col-span-7 flex justify-center relative"
          >
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden relative shadow-2xl group border border-white/5 bg-[#150917]/20 p-1">
              <img
                src={heroImageSrc}
                alt="Zubair & Sons Device Collection Showcase"
                className="w-full h-full object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
              {/* Subtle visual gradient edge masks */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#120516]/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </main>

      {/* THREE INTERACTIVE NAVIGATION CARDS AT THE BOTTOM (FOOTER FEATURES) */}
      <footer className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-10 relative z-20 shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-white/5">
          
          {/* Card 1: Products */}
          <div 
            onClick={() => setActiveOverlay('products')}
            className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer hover:bg-white/[0.03] transition-all group ${
              activeOverlay === 'products' ? 'bg-white/5 border border-white/10' : ''
            }`}
          >
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/80 group-hover:text-orange-400 group-hover:border-orange-500/20 transition-all">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-semibold text-sm text-white flex items-center gap-1.5">
                Products
                {activeOverlay === 'products' && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
              </h3>
              <p className="text-xs text-white/50 leading-normal">
                Browse our selection of devices.
              </p>
            </div>
          </div>

          {/* Card 2: Features */}
          <div 
            onClick={() => setActiveOverlay('features')}
            className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer hover:bg-white/[0.03] transition-all group ${
              activeOverlay === 'features' ? 'bg-white/5 border border-white/10' : ''
            }`}
          >
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/80 group-hover:text-purple-400 group-hover:border-purple-500/20 transition-all">
              <Sliders className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-semibold text-sm text-white flex items-center gap-1.5">
                Features
                {activeOverlay === 'features' && <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
              </h3>
              <p className="text-xs text-white/50 leading-normal">
                Discover the latest innovations.
              </p>
            </div>
          </div>

          {/* Card 3: Support */}
          <div 
            onClick={() => setActiveOverlay('support')}
            className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer hover:bg-white/[0.03] transition-all group ${
              activeOverlay === 'support' ? 'bg-white/5 border border-white/10' : ''
            }`}
          >
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/80 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all">
              <Headset className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-semibold text-sm text-white flex items-center gap-1.5">
                Support
                {activeOverlay === 'support' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
              </h3>
              <p className="text-xs text-white/50 leading-normal">
                Get help and find answers.
              </p>
            </div>
          </div>

        </div>

        {/* Muted Copy and Credit line */}
        <div className="mt-8 text-center text-[10px] text-white/30 font-mono flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© {new Date().getFullYear()} Zubair & Sons. Premium Consumer Electronics.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Warranty</a>
            <a href="#" className="hover:text-white transition-colors">Ecosystem</a>
          </div>
        </div>
      </footer>

      {/* IMMERSIVE FULL-SCREEN GLASSMORPHISM INTERACTIVE OVERLAYS */}
      <AnimatePresence>
        {activeOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 z-40 backdrop-blur-md overflow-y-auto flex justify-center items-start pt-12 pb-16 px-4"
          >
            {/* Close Overlay Handle */}
            <button
              onClick={() => setActiveOverlay(null)}
              className="fixed top-6 right-6 p-2 rounded-full border border-white/15 text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer z-50 bg-[#120516]/80 backdrop-blur-md"
              title="Close Panel"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Inner Content Body Wrapper */}
            <motion.div
              initial={{ y: 30, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 30, scale: 0.98 }}
              transition={{ type: 'spring', damping: 25 }}
              className="w-full max-w-5xl bg-[#120516]/95 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative mt-4"
            >
              {/* Back branding tag in overlay */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 bg-white rotate-45" />
                  <span className="text-xs font-semibold text-white/40 tracking-wider uppercase font-mono">
                    Zubair & Sons / {activeOverlay}
                  </span>
                </div>
                <button
                  onClick={() => setActiveOverlay(null)}
                  className="text-xs text-white/50 hover:text-white font-medium underline uppercase font-mono cursor-pointer"
                >
                  Return to main
                </button>
              </div>

              {activeOverlay === 'products' && (
                <ProductCatalog
                  onSelectProduct={setSelectedProduct}
                  onQuickAdd={handleQuickAdd}
                />
              )}

              {activeOverlay === 'features' && (
                <TechFeatures />
              )}

              {activeOverlay === 'support' && (
                <SupportPanel />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHOPPING PRE-ORDERS DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#180a1a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-orange-500" />
                  <h3 className="font-display font-semibold text-lg text-white">Your Pre-orders</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full border border-white/10 hover:border-white/20 text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/30">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Your selection is empty</p>
                      <p className="text-white/40 text-xs mt-1">Configure and add devices from our list to build your custom ecosystem.</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setActiveOverlay('products');
                      }}
                      className="px-5 py-2.5 bg-[#e25c1d] hover:bg-[#eb6a2b] text-white text-xs rounded-full font-medium transition-all"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 relative group">
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-sm text-white">{item.product.name}</h4>
                          <span className="font-mono text-sm text-orange-400">${item.product.price}</span>
                        </div>
                        <p className="text-xs text-white/50 mt-1">{item.product.tagline}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded text-white/70 font-semibold font-mono">
                            Qty: {item.quantity}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-white/50">Finish:</span>
                            <span 
                              className="w-2.5 h-2.5 rounded-full border border-white/20" 
                              style={{ backgroundColor: item.selectedColor }} 
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(index)}
                        className="text-xs text-red-400 hover:text-red-300 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-black/20 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Estimated Delivery</span>
                    <span className="text-white font-medium font-mono">3-5 Business Days</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-white font-medium">Subtotal</span>
                    <span className="text-orange-500 font-bold font-mono">${cartTotal.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => {
                      alert(`Thank you for choosing Zubair & Sons! Simulated order for ${cartItemCount} items ($${cartTotal.toLocaleString()}) received.`);
                      setIsCartOpen(false);
                    }}
                    className="w-full py-3.5 bg-[#e25c1d] hover:bg-[#eb6a2b] text-white font-medium rounded-full flex items-center justify-center gap-2 shadow-lg shadow-orange-500/15 cursor-pointer"
                  >
                    Proceed with Pre-Order
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* OVERLAY MODALS */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}

        {isSignInOpen && (
          <SignInModal 
            onClose={() => setIsSignInOpen(false)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}
