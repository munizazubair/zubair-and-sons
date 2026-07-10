"use client";

import { useState, FormEvent, useEffect } from "react";

interface AuthPageProps {
  onBack: () => void;
  onSuccess: (name: string) => void;
}

export function AuthPage({ onBack, onSuccess }: AuthPageProps) {
  // Exactly ONE state variable to control toggle
  const [isSignIn, setIsSignIn] = useState(true);

  // Toggle form function
  const toggleForm = () => setIsSignIn(!isSignIn);

  // Sign In inputs
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign Up inputs
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

  // Show/hide password states
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);

  // Form states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset errors and password fields visibility when toggle changes
  useEffect(() => {
    setErrors({});
    setShowSignInPassword(false);
    setShowSignUpPassword(false);
    setShowSignUpConfirmPassword(false);
  }, [isSignIn]);

  // Inline SVGs for Show/Hide Password
  const eyeIcon = (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const eyeOffIcon = (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignInSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const currentErrors: Record<string, string> = {};

    if (!signInEmail) {
      currentErrors.signInEmail = "Email is required";
    } else if (!isValidEmail(signInEmail)) {
      currentErrors.signInEmail = "Please enter a valid email address";
    }

    if (!signInPassword) {
      currentErrors.signInPassword = "Password is required";
    } else if (signInPassword.length < 6) {
      currentErrors.signInPassword = "Password must be at least 6 characters";
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
      setIsSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      onSuccess(signInEmail.split("@")[0]);
    } catch {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const currentErrors: Record<string, string> = {};

    if (!signUpName.trim()) {
      currentErrors.signUpName = "Name is required";
    }

    if (!signUpEmail) {
      currentErrors.signUpEmail = "Email is required";
    } else if (!isValidEmail(signUpEmail)) {
      currentErrors.signUpEmail = "Please enter a valid email address";
    }

    if (!signUpPassword) {
      currentErrors.signUpPassword = "Password is required";
    } else if (signUpPassword.length < 6) {
      currentErrors.signUpPassword = "Password must be at least 6 characters";
    }

    if (signUpPassword !== signUpConfirmPassword) {
      currentErrors.signUpConfirmPassword = "Passwords do not match";
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
      setIsSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      onSuccess(signUpName);
    } catch {
      setIsLoading(false);
    }
  };

  // Circular Social Outline Button Component
  const renderSocials = () => (
    <div className="flex justify-center gap-3.5 mt-4 mb-5">
      {/* Facebook */}
      <button
        type="button"
        onClick={() => alert("Facebook sign-in is currently unavailable.")}
        className="w-11 h-11 rounded-full border border-gray-200 hover:border-brand-orange hover:bg-orange-50/10 text-gray-700 hover:text-brand-orange transition-colors duration-150 flex items-center justify-center cursor-pointer"
        aria-label="Continue with Facebook"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z" />
        </svg>
      </button>

      {/* Google */}
      <button
        type="button"
        onClick={() => alert("Google sign-in is currently unavailable.")}
        className="w-11 h-11 rounded-full border border-gray-200 hover:border-brand-orange hover:bg-orange-50/10 text-gray-700 hover:text-brand-orange transition-colors duration-150 flex items-center justify-center cursor-pointer"
        aria-label="Continue with Google"
      >
        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
      </button>

      {/* LinkedIn */}
      <button
        type="button"
        onClick={() => alert("LinkedIn sign-in is currently unavailable.")}
        className="w-11 h-11 rounded-full border border-gray-200 hover:border-brand-orange hover:bg-orange-50/10 text-gray-700 hover:text-brand-orange transition-colors duration-150 flex items-center justify-center cursor-pointer"
        aria-label="Continue with LinkedIn"
      >
        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 px-4 py-8 select-none">
      
      {/* Back button above card */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors duration-150 focus:outline-none cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Store</span>
      </button>

      {/* Main Container Form Card: AuthCard */}
      <div className="relative w-full max-w-4xl min-h-[580px] md:h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:block">
        
        {/* SUCCESS INTERCEPTOR VIEW */}
        {isSuccess && (
          <div className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center p-8 text-center animate-fade-up">
            <svg
              className="w-16 h-16 text-emerald-500 mb-4 animate-[bounce_1s_infinite]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">Access Approved</h2>
            <p className="text-sm text-gray-500 max-w-xs leading-normal">
              Credentials verified. Synchronizing profile, layouts, and system configurations...
            </p>
          </div>
        )}

        {/* 1. OverlayPanel 
            - desktop: absolute, w-1/2, right-0 or left-0 depending on isSignIn
            - mobile: relative, w-full, simple layout
        */}
        <div 
          className={`w-full md:w-1/2 md:absolute md:top-0 md:h-full transition-transform duration-700 ease-in-out bg-gradient-to-br from-[#0c0d21] via-[#14122d] to-[#2b081c] text-white p-8 md:p-12 flex flex-col justify-center items-center text-center z-20 border-b md:border-b-0 border-white/5
            ${isSignIn 
              ? 'md:right-0 md:translate-x-0' 
              : 'md:right-0 md:-translate-x-full'
            }`}
        >
          {/* Subtle glow orb inside overlay */}
          <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-brand-orange/15 blur-2xl animate-pulse-slow pointer-events-none" />

          {isSignIn ? (
            <div className="relative z-10 transition-opacity duration-300">
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                Hello, Friend!
              </h2>
              <p className="text-sm text-slate-300 mt-4 leading-relaxed max-w-xs mx-auto">
                Enter your personal details and start your journey with us
              </p>
              <button
                type="button"
                onClick={toggleForm}
                className="mt-8 px-12 py-3.5 rounded-full border border-white hover:bg-white/10 text-xs font-bold tracking-widest uppercase transition-colors duration-150 active:scale-95 cursor-pointer focus:outline-none"
              >
                SIGN UP
              </button>
            </div>
          ) : (
            <div className="relative z-10 transition-opacity duration-300">
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                Welcome Back!
              </h2>
              <p className="text-sm text-slate-300 mt-4 leading-relaxed max-w-xs mx-auto">
                Already have an account? Sign in to continue
              </p>
              <button
                type="button"
                onClick={toggleForm}
                className="mt-8 px-12 py-3.5 rounded-full border border-white hover:bg-white/10 text-xs font-bold tracking-widest uppercase transition-colors duration-150 active:scale-95 cursor-pointer focus:outline-none"
              >
                SIGN IN
              </button>
            </div>
          )}
        </div>

        {/* 2. FormPanel 
            - desktop: absolute, w-1/2, left-0 or right-0 depending on isSignIn
            - mobile: relative, w-full, simple layout
        */}
        <div 
          className={`w-full md:w-1/2 md:absolute md:top-0 md:h-full transition-transform duration-700 ease-in-out bg-white z-10 flex flex-col justify-center px-6 py-10 sm:px-12 md:px-16
            ${isSignIn 
              ? 'md:left-0 md:translate-x-0' 
              : 'md:left-0 md:translate-x-full'
            }`}
        >
          {isSignIn ? (
            /* ================== SIGN IN FIELDS ================== */
            <div className="w-full text-center transition-opacity duration-300">
              <h1 className="font-display font-extrabold text-3xl text-gray-900 tracking-tight">
                Sign in
              </h1>
              
              {renderSocials()}
              
              <span className="text-xs text-gray-400 font-medium">or use your account</span>
              
              <form onSubmit={handleSignInSubmit} className="mt-5 space-y-3.5" noValidate>
                <div className="text-left relative">
                  <label htmlFor="signin-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="signin-email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className={`w-full bg-gray-100 text-sm text-gray-800 placeholder-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:bg-white transition-all border ${
                      errors.signInEmail ? "border-red-500" : "border-transparent"
                    }`}
                    aria-invalid={errors.signInEmail ? "true" : "false"}
                    aria-describedby={errors.signInEmail ? "signin-email-error" : undefined}
                  />
                  {errors.signInEmail && (
                    <span 
                      id="signin-email-error" 
                      className="text-xs text-red-500 font-medium block mt-1"
                    >
                      {errors.signInEmail}
                    </span>
                  )}
                </div>

                <div className="text-left">
                  <label htmlFor="signin-password" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="signin-password"
                      type={showSignInPassword ? "text" : "password"}
                      placeholder="Password"
                      autoComplete="current-password"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      className={`w-full bg-gray-100 text-sm text-gray-800 placeholder-gray-400 rounded-lg py-3 pl-4 pr-11 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:bg-white transition-all border ${
                        errors.signInPassword ? "border-red-500" : "border-transparent"
                      }`}
                      aria-invalid={errors.signInPassword ? "true" : "false"}
                      aria-describedby={errors.signInPassword ? "signin-password-error" : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignInPassword(!showSignInPassword)}
                      aria-label={showSignInPassword ? "Hide password" : "Show password"}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-150 focus:outline-none cursor-pointer"
                    >
                      {showSignInPassword ? eyeOffIcon : eyeIcon}
                    </button>
                  </div>
                  {errors.signInPassword && (
                    <span 
                      id="signin-password-error" 
                      className="text-xs text-red-500 font-medium block mt-1"
                    >
                      {errors.signInPassword}
                    </span>
                  )}
                </div>

                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => alert("Password recovery instructions sent.")}
                    className="text-xs text-gray-400 hover:text-gray-900 transition-colors duration-150 focus:outline-none cursor-pointer"
                  >
                    Forgot your password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-44 mx-auto py-3 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold tracking-widest uppercase transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  {isLoading ? "SIGNING IN..." : "SIGN IN"}
                </button>
              </form>
            </div>
          ) : (
            /* ================== SIGN UP FIELDS ================== */
            <div className="w-full text-center transition-opacity duration-300">
              <h1 className="font-display font-extrabold text-3xl text-gray-900 tracking-tight">
                Create Account
              </h1>
              
              {renderSocials()}
              
              <span className="text-xs text-gray-400 font-medium">or use your email for registration</span>
              
              <form onSubmit={handleSignUpSubmit} className="mt-4 space-y-3" noValidate>
                <div className="text-left relative">
                  <label htmlFor="signup-name" className="sr-only">
                    Full Name
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    placeholder="Name"
                    autoComplete="name"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className={`w-full bg-gray-100 text-sm text-gray-800 placeholder-gray-400 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:bg-white transition-all border ${
                      errors.signUpName ? "border-red-500" : "border-transparent"
                    }`}
                    aria-invalid={errors.signUpName ? "true" : "false"}
                    aria-describedby={errors.signUpName ? "signup-name-error" : undefined}
                  />
                  {errors.signUpName && (
                    <span 
                      id="signup-name-error" 
                      className="text-xs text-red-500 font-medium block mt-1"
                    >
                      {errors.signUpName}
                    </span>
                  )}
                </div>

                <div className="text-left relative">
                  <label htmlFor="signup-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className={`w-full bg-gray-100 text-sm text-gray-800 placeholder-gray-400 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:bg-white transition-all border ${
                      errors.signUpEmail ? "border-red-500" : "border-transparent"
                    }`}
                    aria-invalid={errors.signUpEmail ? "true" : "false"}
                    aria-describedby={errors.signUpEmail ? "signup-email-error" : undefined}
                  />
                  {errors.signUpEmail && (
                    <span 
                      id="signup-email-error" 
                      className="text-xs text-red-500 font-medium block mt-1"
                    >
                      {errors.signUpEmail}
                    </span>
                  )}
                </div>

                <div className="text-left">
                  <label htmlFor="signup-password" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="signup-password"
                      type={showSignUpPassword ? "text" : "password"}
                      placeholder="Password"
                      autoComplete="new-password"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      className={`w-full bg-gray-100 text-sm text-gray-800 placeholder-gray-400 rounded-lg py-2.5 pl-4 pr-11 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:bg-white transition-all border ${
                        errors.signUpPassword ? "border-red-500" : "border-transparent"
                      }`}
                      aria-invalid={errors.signUpPassword ? "true" : "false"}
                      aria-describedby={errors.signUpPassword ? "signup-password-error" : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                      aria-label={showSignUpPassword ? "Hide password" : "Show password"}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-150 focus:outline-none cursor-pointer"
                    >
                      {showSignUpPassword ? eyeOffIcon : eyeIcon}
                    </button>
                  </div>
                  {errors.signUpPassword && (
                    <span 
                      id="signup-password-error" 
                      className="text-xs text-red-500 font-medium block mt-1"
                    >
                      {errors.signUpPassword}
                    </span>
                  )}
                </div>

                <div className="text-left">
                  <label htmlFor="signup-confirmpassword" className="sr-only">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="signup-confirmpassword"
                      type={showSignUpConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      value={signUpConfirmPassword}
                      onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                      className={`w-full bg-gray-100 text-sm text-gray-800 placeholder-gray-400 rounded-lg py-2.5 pl-4 pr-11 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:bg-white transition-all border ${
                        errors.signUpConfirmPassword ? "border-red-500" : "border-transparent"
                      }`}
                      aria-invalid={errors.signUpConfirmPassword ? "true" : "false"}
                      aria-describedby={errors.signUpConfirmPassword ? "signup-confirmpassword-error" : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignUpConfirmPassword(!showSignUpConfirmPassword)}
                      aria-label={showSignUpConfirmPassword ? "Hide password" : "Show password"}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-150 focus:outline-none cursor-pointer"
                    >
                      {showSignUpConfirmPassword ? eyeOffIcon : eyeIcon}
                    </button>
                  </div>
                  {errors.signUpConfirmPassword && (
                    <span 
                      id="signup-confirmpassword-error" 
                      className="text-xs text-red-500 font-medium block mt-1"
                    >
                      {errors.signUpConfirmPassword}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-44 mx-auto py-3 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold tracking-widest uppercase transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  {isLoading ? "CREATING..." : "SIGN UP"}
                </button>
              </form>
            </div>
          )}
        </div>

      </div>

      {/* Switch Form Footer Toggle Helper on Mobile */}
      <div className="mt-6 text-center text-xs text-gray-400">
        <span>By continuing, you agree to Device Collection&apos;s standard terms &amp; licenses.</span>
      </div>

    </div>
  );
}
