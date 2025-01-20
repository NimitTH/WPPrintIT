import NextAuth, { type Session, type User } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "./auth.config"
import { type JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    session: { strategy: "jwt" },
    ...authConfig,
    pages: {
        signIn: "/signin",
        signOut: "/",
        error: '/auth/error'
    },
    callbacks: {
        authorized: async ({ auth }) => {
            return auth?.user.role === "USER"
        },
        async signIn({ user, account, profile }) {
            // if (account?.provider === "facebook") {
            //     const imageUrl = profile?.picture?.data?.url || null;
            //     user.image = imageUrl; // แทนที่ Object เดิมด้วย URL
            // }
            // return true;

            // อัปเดตรูปภาพของผู้ใช้หากมีการเข้าสู่ระบบผ่าน Google หรือ Facebook

            // if (account?.provider === "google") {
            //     await prisma.user.update({
            //         where: { email: profile?.email ?? "" },
            //         data: { image: profile?.picture },
            //     });
            // } else if (account?.provider === "facebook") {
            //     const facebookImage = `https://graph.facebook.com/${profile?.id}/picture?type=large`;
            //     await prisma.user.update({
            //         where: { email: profile?.email ?? "" },
            //         data: { image: facebookImage },
            //     });
            // }

            if (account?.provider === "facebook" || account?.provider === "google" || account?.provider === "credentials") {
                const existingUser = await prisma.user.findUnique({
                    where: { email: profile?.email ?? "" },
                });

                if (existingUser && String(existingUser.id) !== user.id) {

                    await prisma.account.update({
                        where: { userId: existingUser.id },
                        data: { provider: account.provider, providerAccountId: account.providerAccountId },
                    });
                    return true;
                }
            }
            return true;
        },

        async jwt({ token, user }: { token: JWT; user: User }) {
            const dbUser = await prisma.user.findFirst({
                where: { email: token?.email ?? "" },
            });

            if (!dbUser) {
                token.id = user!.id;
                return token;
            }

            return {
                id: dbUser.id as number,
                username: dbUser.username as string,
                name: dbUser.name as string,
                email: dbUser.email as string,
                tel: dbUser.tel as string,
                password: dbUser.password as string,
                address: dbUser.address as string,
                picture: dbUser.image as string,
                role: dbUser.role as string,
                status: dbUser.status as string,
                updatedAt: dbUser.updatedAt as any,
            };

        },

        session({ session, token }: { session: Session; token: JWT }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.tel = token.tel;
                session.user.password = token.password;
                session.user.address = token.address;
                session.user.image = token.picture;
                session.user.role = token.role;
                session.user.status = token.status;
            }
            return session;
        },

        async redirect({ url, baseUrl }) {
            const isAuthPage = url.startsWith(baseUrl + '/signin');
            
            if (isAuthPage) return baseUrl + '/products';
            console.log(isAuthPage);
            return url;
        },
    },
    debug: true
})