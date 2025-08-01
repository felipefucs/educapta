import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value
  const { pathname } = request.nextUrl

  // Rotas protegidas
  const protectedRoutes = ["/dashboard"]
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Rotas públicas (login, forgot-password)
  const publicRoutes = ["/login", "/forgot-password"]
  const isPublicRoute = publicRoutes.includes(pathname)

  // Se não tem token e está tentando acessar rota protegida
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Se tem token e está tentando acessar rota pública
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
