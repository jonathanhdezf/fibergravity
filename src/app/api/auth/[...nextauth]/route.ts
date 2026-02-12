import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";

// Cliente de Supabase para autenticación del servidor
const supabaseAuth = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Usuario", type: "text", placeholder: "admin" },
                password: { label: "Contraseña", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    if (!credentials?.username || !credentials?.password) {
                        return null;
                    }

                    // Verificar credenciales contra Supabase
                    const { data, error } = await supabaseAuth.rpc('verify_admin_login', {
                        p_username: credentials.username,
                        p_password: credentials.password
                    });

                    if (error) {
                        console.error("Error de Supabase al verificar login:", error.message);
                        return null;
                    }

                    // Si la función retorna un resultado, las credenciales son válidas
                    if (data && data.length > 0) {
                        const user = data[0];
                        return {
                            id: user.id,
                            name: user.full_name,
                            email: user.email,
                            role: user.role
                        };
                    }

                    // Credenciales inválidas
                    return null;
                } catch (error) {
                    console.error("Error en authorize:", error);
                    return null;
                }
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
