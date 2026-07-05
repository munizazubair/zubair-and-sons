import { createServerClient } from '@supabase/ssr';

export async function createClient() {
  const { cookies } = await import('next/headers');
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(async ({ name, value, options }) =>
              (await cookieStore).set(name, value, options)
            );
          } catch {
            // called from a Server Component — safe to ignore, middleware refreshes it
          }
        },
      },
    }
  );
}