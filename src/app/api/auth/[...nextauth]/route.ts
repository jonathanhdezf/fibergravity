import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Check if user is admin
                if (credentials?.username === "admin" && credentials?.password === "fiberadmin2026") {
                    return { id: "1", name: "Admin FiberGravity", email: "admin@fibergravity.mx", role: "ADMIN" };
                }

                // Allow user login (placeholder for now, can be extended to DB)
                if (credentials?.username === "user" && credentials?.password === "user123") {
                    return { id: "2", name: "Usuario Demo", email: "user@fibergravity.mx", role: "USER" };
                }

                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                (session.user as any).role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/login',
    }
});

export { handler as GET, handler as POST };
