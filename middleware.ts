// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { NextResponse } from "next/server";

// import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({ req, res });

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   // if user is signed in and the current path is / redirect the user to /account
//   if (user && req.nextUrl.pathname === "/") {
//     return NextResponse.redirect(new URL("/account", req.url));
//   }

//   // if user is not signed in and the current path is not / redirect the user to /
//   if (!user && req.nextUrl.pathname !== "/") {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   return res;
// }

// export const config = {
//   matcher: ["/", "/account"],
// };
// ==================================================
// When using the Supabase client on the server, you must perform extra steps to ensure the user's auth session remains active.
// Since the user's session is tracked in a cookie, we need to read this cookie and update it if necessary.

// Next.js Server Components allow you to read a cookie but not write back to it.
// Middleware on the other hand allow you to both read and write to cookies.

// Next.js Middleware runs immediately before each route is rendered.
// We'll use Middleware to refresh the user's session before loading Server Component routes.

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/types/supabase";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res });

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession();

  return res;
}
