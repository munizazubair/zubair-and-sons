"use client";
import { useState } from 'react';
import { Diamond, ShoppingBag, Menu, X, ArrowRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '@/data/products';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: { product: Product; quantity: number; selectedColor: string }[];
  removeFromCart: (index: number) => void;
  onOpenSignIn: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  cart,
  removeFromCart,
  onOpenSignIn,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navItems = [
    { label: 'Products', id: 'products' },
    { label: 'Features', id: 'features' },
    { label: 'Support', id: 'support' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#1c0c1e]/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/10 group-hover:rotate-12 transition-transform duration-300">
              <Diamond className="w-4 w-4 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-white tracking-tight leading-none">
                Zubair & Sons
              </span>
              <span className="text-[10px] text-orange-500 font-mono tracking-wider uppercase font-semibold">
                Device Collection
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-sans text-sm tracking-wide font-medium relative py-2 transition-colors cursor-pointer ${
                  activeTab === item.id 
                    ? 'text-white font-semibold' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full border border-white/10 hover:border-white/20 text-white hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center"
              title="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse border border-[#1c0c1e]">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Sign In Button */}
            <button
              onClick={onOpenSignIn}
              className="px-6 py-2 rounded-full border border-white/20 hover:border-white text-white text-sm font-medium hover:bg-white/5 transition-all cursor-pointer flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Sign in
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full border border-white/10 text-white hover:bg-white/5 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full border border-white/10 text-white hover:bg-white/5 transition-all"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 z-30 md:hidden bg-[#1c0c1e]/95 backdrop-blur-lg border-b border-white/5 p-6 space-y-4"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-3 text-base font-medium border-b border-white/5 ${
                    activeTab === item.id ? 'text-orange-500' : 'text-white/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenSignIn();
                }}
                className="w-full text-center py-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full text-white font-medium hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                Sign in to Account
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shopping Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
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
                      <p className="text-white/40 text-xs mt-1">Add devices from the Zubair & Sons catalog to start customizing.</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        handleNavClick('products');
                      }}
                      className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 text-xs rounded-full font-medium transition-all"
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
                          <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded text-white/70">
                            Qty: {item.quantity}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-white/50">Color:</span>
                            <span 
                              className="w-2.5 h-2.5 rounded-full border border-white/20" 
                              style={{ backgroundColor: item.selectedColor }} 
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
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
                    className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium rounded-full flex items-center justify-center gap-2 shadow-lg shadow-orange-500/15"
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
    </>
  );
}
