/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
'use client';
import { useState, useEffect, useRef, MouseEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowRight,
  Menu,
  X,
  Monitor,
  Tablet,
  Camera,
  Headphones,
  Mic,
  Sparkles,
  LifeBuoy,
  Layers,
  ChevronRight,
  CheckCircle,
  HelpCircle,
  ShoppingBag,
  Zap,
  Cpu,
  Tv,
  Smartphone,
  Info
} from "lucide-react";

// Types
interface Hotspot {
  id: string;
  name: string;
  desc: string;
  specs: string[];
  x: string;
  y: string;
  icon: any;
}

// Scroll Reveal Wrapper Component
function ScrollReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const router = useRouter();
  const supabase = createClient();

  // Real Supabase auth session (replaces the old fake loggedInUser toggle).
  // This is what makes "logged in" state persist correctly across page
  // loads and after returning from /auth.
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Welcome Toast/Banner message
  const [welcomeToast, setWelcomeToast] = useState<string | null>(null);

  // Mobile navigation open state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active hover nav link state (for track outline effects)
  const [activeLink, setActiveLink] = useState<string | null>(null);

  // Parallax Tilt State
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const heroRightRef = useRef<HTMLDivElement>(null);

  // Interactive Hotspot popup states
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Shop Now / Checkout Success Modal
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Interactive Brand Product list (for Products drawer/modal)
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  // Load the current Supabase session on mount, and keep it in sync
  // whenever the auth state changes (sign in, sign out, token refresh).
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close the avatar dropdown when clicking anywhere else on the page
  useEffect(() => {
    if (!showUserMenu) return;
    const closeMenu = () => setShowUserMenu(false);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, [showUserMenu]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowUserMenu(false);
    setWelcomeToast("Signed out successfully.");
    setTimeout(() => setWelcomeToast(null), 3000);
  };

  const displayName =
    user?.user_metadata?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "Account";
  const avatarLetter =
    (user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || "U").toUpperCase();

  // Hotspots definitions placed around the 3D cluster image
  const hotspots: Hotspot[] = [
    {
      id: "display",
      name: "Sons Ultra-Slim 4K Monitor",
      desc: "An ultra-thin bezel 32\" curved IPS screen with a high refresh rate.",
      specs: ["3840 x 2160 native res", "144Hz Refresh Rate", "HDR600 Support"],
      x: "82%",
      y: "18%",
      icon: Monitor,
    },
    {
      id: "audio",
      name: "Zubair Pro-Studio Mic",
      desc: "A condenser broadcast microphone with pristine noise-gate filters.",
      specs: ["Cardioid & Omnidirectional", "24-bit/96kHz recording", "Integrated Pop Shield"],
      x: "15%",
      y: "48%",
      icon: Mic,
    },
    {
      id: "headphones",
      name: "Sons ANC-Max Headphones",
      desc: "Over-ear headphones with custom spatial acoustic profiles.",
      specs: ["40dB Hybrid ANC", "65 Hours Battery Life", "Hi-Res Wireless Audio"],
      x: "62%",
      y: "78%",
      icon: Headphones,
    }
  ];

  // Mouse move handler for Parallax Tilt
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!heroRightRef.current) return;
    const rect = heroRightRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Coordinates relative to center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Normalized values (-1 to 1)
    const normX = x / (width / 2);
    const normY = y / (height / 2);

    // Limit rotation to a subtle 8 degrees
    const rotY = Number((normX * 8).toFixed(2));
    const rotX = Number((normY * -8).toFixed(2));

    setTilt({ rotX, rotY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotX: 0, rotY: 0 });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden selection:bg-brand-orange selection:text-white bg-gradient-to-br from-[#0c0d21] via-[#14122d] to-[#2b081c]">

      {/* Dynamic Authentication Notification Toast */}
      {welcomeToast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-fade-up w-[90%] max-w-md">
          <div className="bg-[#0f1025]/90 backdrop-blur-md border border-brand-orange/40 rounded-full px-5 py-3 shadow-2xl flex items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-ping" />
              <span className="text-xs font-semibold tracking-wide text-slate-100">{welcomeToast}</span>
            </div>
            <button
              onClick={() => setWelcomeToast(null)}
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-blue-600/10 blur-[100px] md:blur-[160px] animate-pulse-glow" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[20%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-pink-600/10 blur-[90px] md:blur-[140px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[40%] right-[30%] w-[250px] md:w-[450px] h-[250px] md:h-[450px] rounded-full bg-purple-600/5 blur-[80px] md:blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Full-width Navbar */}
      <nav id="navbar" className="relative z-50 w-full px-6 py-5 md:px-12 lg:px-16 border-b border-white/5 bg-[#0b0c1e]/40 backdrop-blur-md animate-fade-up">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 rounded-lg px-2 py-1 transition-all">
            {/* Diamond Shaped Logo */}
            <div className="relative w-8 h-8 flex items-center justify-center transform rotate-45 border-2 border-brand-orange bg-brand-orange/10 shadow-[0_0_15px_rgba(232,121,44,0.3)] transition-all duration-300 hover:rotate-135">
              <div className="w-3 h-3 bg-white rounded-sm transform -rotate-45" />
            </div>
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-white">
              Zubair <span className="text-brand-orange font-light">&amp; Sons</span>
            </span>
          </a>

          {/* Center Navigation Links (Hidden on Mobile) */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-12">
            <li>
              <button
                onClick={() => setShowProductsModal(true)}
                className="font-sans text-sm font-medium tracking-wide text-slate-300 hover:text-white transition-colors hover-underline-slide cursor-pointer py-1"
              >
                Products
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowFeaturesModal(true)}
                className="font-sans text-sm font-medium tracking-wide text-slate-300 hover:text-white transition-colors hover-underline-slide cursor-pointer py-1"
              >
                Features
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowSupportModal(true)}
                className="font-sans text-sm font-medium tracking-wide text-slate-300 hover:text-white transition-colors hover-underline-slide cursor-pointer py-1"
              >
                Support
              </button>
            </li>
          </ul>

          {/* Right Action Area (Hidden on Mobile) */}
          <div className="hidden md:block">
            {user ? (
              /* LOGGED IN: just the avatar/logo — click to reveal a small sign-out dropdown */
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setShowUserMenu((v) => !v)}
                  className="w-10 h-10 rounded-full bg-brand-orange text-white font-display font-bold text-sm flex items-center justify-center shadow-[0_0_15px_rgba(232,121,44,0.3)] hover:scale-105 active:scale-95 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-orange/50"
                  aria-label="Account menu"
                >
                  {avatarLetter}
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2.5 w-48 rounded-xl border border-white/10 bg-[#0f1025] shadow-2xl py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-white/5">
                      <p className="text-xs font-semibold text-white truncate">{displayName}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-brand-orange transition-colors cursor-pointer"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* LOGGED OUT: both Sign In and Sign Up buttons */
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push("/auth?mode=signin")}
                  className="px-6 py-2.5 rounded-full border border-white/20 text-sm font-medium text-white tracking-wide transition-all duration-300 hover:bg-white/5 hover:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/50 active:scale-95 cursor-pointer"
                >
                  Sign in
                </button>
                <button
                  onClick={() => router.push("/auth?mode=signup")}
                  className="px-6 py-2.5 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-sm font-semibold text-white tracking-wide transition-all duration-300 shadow-[0_4px_15px_rgba(232,121,44,0.35)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 active:scale-95 cursor-pointer"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Navigation Toggle (Hamburger Button) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Slide-Down Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-[#0b0c1e]/95 backdrop-blur-xl transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full pt-28 px-8 pb-12 justify-between">
          <ul className="flex flex-col gap-6 text-center">
            <li className="transform translate-y-4 opacity-0 transition-all duration-500 delay-100" style={isMobileMenuOpen ? { transform: 'translateY(0)', opacity: 1 } : {}}>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowProductsModal(true);
                }}
                className="text-2xl font-display font-semibold tracking-wide text-slate-200 hover:text-brand-orange focus:text-brand-orange transition-colors"
              >
                Products
              </button>
            </li>
            <li className="transform translate-y-4 opacity-0 transition-all duration-500 delay-200" style={isMobileMenuOpen ? { transform: 'translateY(0)', opacity: 1 } : {}}>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowFeaturesModal(true);
                }}
                className="text-2xl font-display font-semibold tracking-wide text-slate-200 hover:text-brand-orange focus:text-brand-orange transition-colors"
              >
                Features
              </button>
            </li>
            <li className="transform translate-y-4 opacity-0 transition-all duration-500 delay-300" style={isMobileMenuOpen ? { transform: 'translateY(0)', opacity: 1 } : {}}>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowSupportModal(true);
                }}
                className="text-2xl font-display font-semibold tracking-wide text-slate-200 hover:text-brand-orange focus:text-brand-orange transition-colors"
              >
                Support
              </button>
            </li>
          </ul>

          {/* Mobile Bottom Panel Action */}
          <div className="flex flex-col gap-4 items-center w-full">
            {user ? (
              /* LOGGED IN: just the avatar/logo, tap to sign out */
              <div className="flex flex-col gap-3 items-center w-full">
                <div className="w-12 h-12 rounded-full bg-brand-orange text-white font-display font-bold text-base flex items-center justify-center shadow-[0_0_15px_rgba(232,121,44,0.3)]">
                  {avatarLetter}
                </div>
                <p className="text-xs text-slate-400">{displayName}</p>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full py-3 rounded-full border border-brand-orange text-center text-sm font-semibold uppercase tracking-wider text-brand-orange bg-brand-orange/5 active:scale-95"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push("/auth?mode=signin");
                  }}
                  className="w-full py-3.5 rounded-full border border-white/20 text-center text-base font-medium text-white transition-all hover:bg-white/5 hover:border-brand-orange active:scale-95 cursor-pointer"
                >
                  Sign in
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push("/auth?mode=signup");
                  }}
                  className="w-full py-3.5 rounded-full bg-brand-orange text-center text-base font-semibold text-white transition-all active:scale-95 cursor-pointer"
                >
                  Sign up
                </button>
              </div>
            )}
            <p className="text-xs text-slate-500 mt-2">© 2026 Zubair & Sons. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Hero Section Container */}
      <main className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center py-12 lg:py-16">

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column (Headline & Context text) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left">

            {/* Tagline Accent Badge */}
            <div className="mx-auto lg:mx-0 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-xs font-semibold text-brand-orange tracking-widest uppercase mb-6 animate-fade-up delay-100 max-w-max">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <span>THE 2026 AUDIO &amp; VISUAL LINEUP</span>
            </div>

            {/* Title (Large bold headline 2 lines) */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.05] tracking-tight text-white mb-6 animate-fade-up delay-200">
              Device <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-orange-light to-[#FFC394] drop-shadow-sm">
                Collection
              </span>
            </h1>

            {/* Description (3-line descriptive paragraph) */}
            <p className="font-sans text-base md:text-lg text-slate-300/95 font-light leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-up delay-300">
              Explore an ultra-premium suite of consumer electronics built for creators. Designed with high-fidelity acoustics, pixel-perfect curved optics, and ergonomic feedback for an absolute studio standard.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-fade-up delay-400">

              {/* Primary CTA Shop Now */}
              <button
                onClick={() => setShowCheckoutModal(true)}
                className="group relative w-full sm:w-auto px-8 py-4 rounded-full bg-brand-orange text-white text-base font-semibold tracking-wide shadow-[0_4px_20px_rgba(232,121,44,0.4)] transition-all duration-300 hover:bg-brand-orange-hover hover:scale-105 hover:shadow-[0_8px_25px_rgba(232,121,44,0.6)] focus:outline-none focus:ring-4 focus:ring-brand-orange/40 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Shop now</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA Interactive Tour */}
              <button
                onClick={() => setShowFeaturesModal(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-base font-medium focus:outline-none focus:ring-2 focus:ring-white/30 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Tech</span>
              </button>
            </div>
          </div>

          {/* Right Column (3D-Style cluster image with interactive detail popups & parallax tilt) */}
          <div className="lg:col-span-7 flex items-center justify-center relative select-none animate-scale-up delay-200">

            {/* Glassmorphism Glowing Backdrop Behind Cluster */}
            <div className="absolute inset-0 m-auto w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-brand-orange/15 to-purple-600/10 blur-[50px] md:blur-[80px] z-0 animate-pulse-slow pointer-events-none" />

            <div
              ref={heroRightRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[500px] lg:max-w-none aspect-square flex items-center justify-center z-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: isHovered
                  ? `perspective(1200px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale(1.03)`
                  : 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)',
              }}
            >
              {/* Product Cluster Main Image (Bobbing Floating Motion) */}
              <div className="relative w-full h-full p-4 md:p-8 animate-float-slow">

                {/* Real-time Shadows / Soft Reflection Layer */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-6 bg-black/40 blur-xl rounded-full scale-y-50 z-0 pointer-events-none" />

                {/* Primary Render Image */}
                <img
                  src="\device_cluster_1783278093763 (1).jpg"
                  alt="Zubair & Sons 3D Device Collection cluster, including monitor, tablet, camera, and headphones"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain rounded-2xl border border-white/5 shadow-2xl relative z-10"
                />

                {/* Interactive Tech Hotspots */}
                {hotspots.map((h) => {
                  const HotspotIcon = h.icon;
                  return (
                    <div
                      key={h.id}
                      className="absolute z-20 group"
                      style={{ left: h.x, top: h.y }}
                    >
                      {/* Pulse Ring */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspot(activeHotspot === h.id ? null : h.id);
                        }}
                        className={`relative w-8 h-8 flex items-center justify-center rounded-full border border-brand-orange/50 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all duration-300 ${
                          activeHotspot === h.id
                            ? "bg-brand-orange scale-110 shadow-[0_0_15px_#E8792C]"
                            : "bg-[#0b0c1e]/90 hover:bg-brand-orange/30 hover:scale-110"
                        }`}
                        aria-label={`Show specifications for ${h.name}`}
                      >
                        <span className="absolute -inset-1 rounded-full bg-brand-orange/30 animate-ping opacity-70 group-hover:opacity-100" />
                        <HotspotIcon className="w-4 h-4" />
                      </button>

                      {/* Hotspot Hover/Click Detail Panel */}
                      <div
                        className={`absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 p-4 rounded-xl glass-panel transition-all duration-300 pointer-events-auto z-30 ${
                          activeHotspot === h.id
                            ? "opacity-100 translate-y-0 scale-100 visible"
                            : "opacity-0 translate-y-2 scale-95 invisible"
                        }`}
                      >
                        {/* Triangle anchor */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#0b0c1e]/40 backdrop-blur-md" />

                        <div className="flex items-center gap-2 mb-1.5 border-b border-white/10 pb-1.5">
                          <h4 className="font-display font-bold text-xs text-brand-orange tracking-wide uppercase">
                            {h.name}
                          </h4>
                        </div>
                        <p className="font-sans text-xs text-slate-300 leading-normal mb-2">
                          {h.desc}
                        </p>
                        <ul className="space-y-1">
                          {h.specs.map((spec, i) => (
                            <li key={i} className="flex items-center gap-1.5 font-sans text-[10px] text-slate-400">
                              <CheckCircle className="w-3 h-3 text-brand-orange shrink-0" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Float Accent Cards (Aesthetic floating metadata badges) */}
              <div className="absolute top-[8%] left-[2%] z-20 animate-float-delayed px-3 py-1.5 rounded-lg border border-white/10 bg-black/40 backdrop-blur-md text-[10px] md:text-xs font-medium text-slate-200 shadow-lg flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Lossless Spatial Audio Active</span>
              </div>

              <div className="absolute bottom-[8%] right-[2%] z-20 animate-float-slow px-3 py-1.5 rounded-lg border border-white/10 bg-black/40 backdrop-blur-md text-[10px] md:text-xs font-medium text-slate-200 shadow-lg flex items-center gap-1.5" style={{ animationDelay: '1.5s' }}>
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span>4K curved 144Hz calibrated</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Strip with 3 Interactive Columns */}
      <footer className="relative z-10 w-full mt-auto border-t border-white/5 bg-[#08091a]/80 backdrop-blur-lg py-10 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

              {/* Products Column */}
              <button
                onClick={() => setShowProductsModal(true)}
                className="group p-6 rounded-2xl glass-panel glass-panel-hover text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white group-hover:shadow-[0_0_15px_rgba(232,121,44,0.4)]">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-base text-white tracking-wide flex items-center gap-1">
                      <span>Products</span>
                      <ChevronRight className="w-4 h-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                    </h3>
                    <p className="font-sans text-xs text-slate-400 font-light mt-1.5 leading-normal">
                      Browse our selection of devices
                    </p>
                  </div>
                </div>
              </button>

              {/* Features Column */}
              <button
                onClick={() => setShowFeaturesModal(true)}
                className="group p-6 rounded-2xl glass-panel glass-panel-hover text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white group-hover:shadow-[0_0_15px_rgba(232,121,44,0.4)]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-base text-white tracking-wide flex items-center gap-1">
                      <span>Features</span>
                      <ChevronRight className="w-4 h-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                    </h3>
                    <p className="font-sans text-xs text-slate-400 font-light mt-1.5 leading-normal">
                      Discover the latest innovations
                    </p>
                  </div>
                </div>
              </button>

              {/* Support Column */}
              <button
                onClick={() => setShowSupportModal(true)}
                className="group p-6 rounded-2xl glass-panel glass-panel-hover text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white group-hover:shadow-[0_0_15px_rgba(232,121,44,0.4)]">
                    <LifeBuoy className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-base text-white tracking-wide flex items-center gap-1">
                      <span>Support</span>
                      <ChevronRight className="w-4 h-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                    </h3>
                    <p className="font-sans text-xs text-slate-400 font-light mt-1.5 leading-normal">
                      Get help and find answers
                    </p>
                  </div>
                </div>
              </button>

            </div>

            {/* Sub-footer Copyright strip */}
            <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
              <p>Designed with absolute sensory precision for modern visionaries.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
              <p>© 2026 Zubair &amp; Sons. All rights reserved.</p>
            </div>
          </ScrollReveal>
        </div>
      </footer>


      {/* ==================== INTERACTIVE MODALS / DRAWERS ==================== */}

      {/* 1. SHOP NOW / PRODUCT CATALOG MODAL */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0f1025] p-6 md:p-8 shadow-2xl animate-scale-up text-left">

            {/* Close Button */}
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg md:text-xl text-white">Secure Checkout</h3>
                <p className="text-xs text-slate-400">Experience premium retail fulfillment</p>
              </div>
            </div>

            <p className="font-sans text-sm text-slate-300 mb-6 leading-relaxed">
              Our 2026 Collection includes custom tailored setups. Select a tier below to request priority delivery.
            </p>

            {/* Tier selectors */}
            <div className="space-y-3 mb-6">
              <div className="p-4 rounded-xl border border-brand-orange/40 bg-brand-orange/5 flex items-center justify-between cursor-pointer hover:border-brand-orange transition-all">
                <div>
                  <h4 className="font-display font-semibold text-sm text-white">Creative Studio Bundle</h4>
                  <p className="text-[11px] text-slate-400">Curved monitor + Studio Mic + Pro Over-Ears</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 line-through mr-1.5">$1,899</span>
                  <span className="font-display font-bold text-sm text-brand-orange">$1,499</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-white/5 flex items-center justify-between cursor-pointer hover:border-brand-orange/55 transition-all">
                <div>
                  <h4 className="font-display font-semibold text-sm text-white">Audiophile Package</h4>
                  <p className="text-[11px] text-slate-400">Sons ANC-Max Headphones + Studio Mic</p>
                </div>
                <div className="text-right">
                  <span className="font-display font-bold text-sm text-white">$699</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  alert("Tier selected! Thank you for choosing Zubair & Sons. A priority specialist has been assigned to coordinate your shipping.");
                  setShowCheckoutModal(false);
                }}
                className="flex-grow py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(232,121,44,0.3)] active:scale-95 cursor-pointer text-center"
              >
                Proceed to Priority Shipping
              </button>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCTS DIALOG */}
      {showProductsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0f1025] p-6 md:p-8 shadow-2xl animate-scale-up text-left">
            <button
              onClick={() => setShowProductsModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg md:text-xl text-white">Browse the Collection</h3>
                <p className="text-xs text-slate-400">Exclusive Zubair &amp; Sons electronics lineup</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 mb-6">
              {[
                { name: "Sons Ultra-Slim 4K Monitor", category: "Optics / Displays", spec: "32\" UHD 144Hz curved screen", price: "$999" },
                { name: "Zubair Pro-Studio Mic", category: "Acoustics / Inputs", spec: "Triple condenser studio capsule", price: "$299" },
                { name: "Sons ANC-Max Headphones", category: "Acoustics / Output", spec: "Custom titanium drivers", price: "$499" },
                { name: "Sons Audio Smart Speaker", category: "Home Acoustics", spec: "360-degree cylindrical spatial array", price: "$199" },
                { name: "Sons Active Smartwatch", category: "Wearables", spec: "Retina display with telemetry sensors", price: "$349" },
                { name: "Sons Pods Active Earbuds", category: "Acoustics / Ultra-Portable", spec: "In-ear with custom pressure seals", price: "$149" }
              ].map((prod, index) => (
                <div key={index} className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-brand-orange/30 transition-all flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-semibold text-brand-orange tracking-wider uppercase">{prod.category}</span>
                    <h4 className="font-display font-bold text-sm text-white mt-1">{prod.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">{prod.spec}</p>
                  </div>
                  <span className="font-display font-bold text-sm text-white">{prod.price}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowProductsModal(false);
                  setShowCheckoutModal(true);
                }}
                className="px-6 py-2.5 rounded-full bg-brand-orange text-white text-xs font-semibold tracking-wide hover:bg-brand-orange-hover transition-all cursor-pointer"
              >
                Inquire About a Device
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. FEATURES DIALOG */}
      {showFeaturesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#0f1025] p-6 md:p-8 shadow-2xl animate-scale-up text-left">
            <button
              onClick={() => setShowFeaturesModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg md:text-xl text-white">Technical Innovations</h3>
                <p className="text-xs text-slate-400">Uncompromising specs designed for performance</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex gap-4 items-start p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="p-2.5 rounded-lg bg-brand-orange/10 text-brand-orange shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Quantum Core DAC/DSP</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-normal">
                    Proprietary digital-to-analog signals optimized with intelligent soundstaging. Reduces raw distortion by up to 99.8%.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="p-2.5 rounded-lg bg-brand-orange/10 text-brand-orange shrink-0">
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Sub-Nanometer Optical Coating</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-normal">
                    Advanced layered panels filtering blue fatigue without modifying native color accuracy. Anti-reflective properties at all viewing angles.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="p-2.5 rounded-lg bg-brand-orange/10 text-brand-orange shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Synchronic Wireless Link</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-normal">
                    Zero-latency proprietary transmission protocol allowing simultaneous cross-channel recording and audio output sync.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowFeaturesModal(false)}
                className="px-6 py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/15 transition-all cursor-pointer"
              >
                Close Specifications
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. SUPPORT DIALOG */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0f1025] p-6 md:p-8 shadow-2xl animate-scale-up text-left">
            <button
              onClick={() => setShowSupportModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                <LifeBuoy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg md:text-xl text-white">Premium Client Support</h3>
                <p className="text-xs text-slate-400">Assisting you around the clock with care</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                At Zubair &amp; Sons, client relationship is paramount. All products include premium concierge servicing and extended 3-year mechanical warranties.
              </p>

              <div className="p-3 rounded-lg border border-white/5 bg-white/5">
                <h4 className="font-display font-bold text-xs text-white">Instant Documentation</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Access user manuals, diagnostic software, and driver installations online.</p>
              </div>

              <div className="p-3 rounded-lg border border-white/5 bg-white/5">
                <h4 className="font-display font-bold text-xs text-white">Concierge Hotline</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Premium tier buyers receive dedicated 1-on-1 audio engineering support lines.</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  alert("Opening Support Portal: Our client coordinator has been alerted to your session. We'll assist you momentarily.");
                  setShowSupportModal(false);
                }}
                className="flex-grow py-2.5 rounded-full bg-brand-orange text-white text-xs font-semibold hover:bg-brand-orange-hover transition-all cursor-pointer text-center"
              >
                Access Concierge Helpdesk
              </button>
              <button
                onClick={() => setShowSupportModal(false)}
                className="px-5 py-2.5 rounded-full bg-white/10 text-white text-xs font-medium hover:bg-white/15 transition-all"
              >
                Close Help
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}