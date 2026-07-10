'use client';

import SignInModal from '@/SignInModal';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const justConfirmed = searchParams.get('confirmed') === 'true';

  return (
    <div>
      {justConfirmed && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-2xl px-4 py-3 text-center mb-4">
          Your email is confirmed! Please sign in with your CNIC and password.
        </div>
      )}
      <SignInModal onClose={() => {}} />
      {/* your existing SignInModal or login UI */}
    </div>
  );
}