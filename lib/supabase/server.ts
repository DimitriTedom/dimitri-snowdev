import { createServerClient, type SetAllCookies } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    global: {
      fetch: (input: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) => {
        return fetch(input, {
          ...init,
          signal: init?.signal ?? AbortSignal.timeout(1000),
        });
      },
    },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: Parameters<SetAllCookies>[0]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components can't set cookies directly.
        }
      },
    },
  });
}
