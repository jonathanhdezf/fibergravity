import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // Admin paths protection
    if (pathname.startsWith("/admin")) {
        if (!token) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }
        if ((token as any).role !== "ADMIN") {
            // If user but not admin, maybe redirect to user dashboard or unauthorized
            return NextResponse.redirect(new URL("/", req.url)); // For now, redirect home
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
