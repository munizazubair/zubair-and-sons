import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

// simple in-memory rate limit (resets on server restart — fine for now, swap for Upstash later if needed)
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_ATTEMPTS = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  if (entry.count > MAX_ATTEMPTS) return true;
  return false;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many attempts. Please try again in a minute.' },
      { status: 429 }
    );
  }

  const { cnic } = await request.json();

  if (!cnic || !/^\d{5}-\d{7}-\d{1}$/.test(cnic)) {
    return NextResponse.json({ error: 'Invalid CNIC or password' }, { status: 400 });
  }

  const supabaseAdmin = createAdminClient();
  const { data: email, error } = await supabaseAdmin.rpc('get_email_by_cnic', {
    cnic_input: cnic,
  });

  if (error || !email) {
    // deliberately vague — don't reveal whether CNIC exists
    return NextResponse.json({ error: 'Invalid CNIC or password' }, { status: 400 });
  }

  return NextResponse.json({ email });
}