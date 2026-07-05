import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { X, Lock, Mail, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface SignInModalProps {
  onClose: () => void;
}

export default function SignInModal({ onClose }: SignInModalProps) {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setIsLoading(false);
        setError(error.message);
        return;
      }

      setIsSubmitted(true);
      setIsLoading(false);
      setTimeout(() => {
        onClose();
        router.push('/dashboard');
        router.refresh();
      }, 1500);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setIsLoading(false);
        setError(error.message);
        return;
      }

      setIsSubmitted(true);
      setIsLoading(false);
      // If email confirmation is ON in Supabase, user isn't logged in yet
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 z-50 backdrop-blur-md"
      />

      {/* Modal dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="bg-[#180a1a] border border-white/10 rounded-3xl p-8 max-w-sm w-full space-y-6 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle graphic background circles */}
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-orange-500/5 rounded-full blur-[60px]" />
          <div className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-purple-500/10 rounded-full blur-[60px]" />

          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center gap-1.5 text-orange-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-mono tracking-wider font-semibold uppercase">Z-Portal Secure</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full border border-white/10 hover:border-white/20 text-white/50 hover:text-white cursor-pointer transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-white">
                  {mode === 'signin' ? 'Authenticated' : 'Account Created'}
                </h3>
                <p className="text-xs text-white/40">
                  {mode === 'signin'
                    ? 'Synchronizing Zubair & Sons device logs...'
                    : 'Check your email to confirm your account...'}
                </p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="space-y-2 text-center">
                <h3 className="font-display font-bold text-2xl text-white">
                  {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                </h3>
                <p className="text-xs text-white/50">Access your custom configurations and active pre-orders</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-2.5 text-red-400 text-[11px]">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-3.5">
                {/* Email field */}
                <div className="space-y-1">
                  <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider font-mono">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/30 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/5 rounded-2xl text-xs text-white focus:outline-none focus:border-orange-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider font-mono">Password</label>
                    {mode === 'signin' && (
                      <a href="#" className="text-[10px] text-orange-500 hover:underline">Forgot?</a>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-white/30 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/5 rounded-2xl text-xs text-white focus:outline-none focus:border-orange-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Please wait...' : mode === 'signin' ? 'Enter Workspace' : 'Create Account'}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="text-center">
                {mode === 'signin' ? (
                  <>
                    <span className="text-[11px] text-white/40">New to Zubair & Sons? </span>
                    <button
                      type="button"
                      onClick={() => { setMode('signup'); setError(null); }}
                      className="text-[11px] text-orange-500 hover:underline font-semibold"
                    >
                      Create account
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-[11px] text-white/40">Already have an account? </span>
                    <button
                      type="button"
                      onClick={() => { setMode('signin'); setError(null); }}
                      className="text-[11px] text-orange-500 hover:underline font-semibold"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </>
  );
}