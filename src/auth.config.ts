import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import { prisma } from "./lib/prisma"
import bcryptjs from "bcryptjs"


export default {
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jb@gmail.com" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    console.log(
                        "Authorize function called with credentials:",
                        credentials
                    );

                    if (!credentials?.email || !credentials?.password) {
                        throw { error: "No Inputs Found", status: 401 };
                    }
                    console.log("Pass 1 checked ");

                    const existingUser = await prisma.user.findUnique({
                        where: { email: credentials.email as string },
                    });

                    if (!existingUser) {
                        console.log("No user found");
                        throw { error: "No user found", status: 401 };
                    }

                    console.log("Pass 2 Checked");
                    console.log(existingUser);
                    let passwordMatch: boolean = false;

                    if (existingUser && existingUser.password) {

                        passwordMatch = await bcryptjs.compare(credentials.password as string, existingUser.password);
                        console.log(passwordMatch);
                        
                    }
                    if (!passwordMatch) {
                        console.log("Password incorrect");
                        throw { error: "Password Incorrect", status: 401, };
                    }
                    console.log("Pass 3 Checked");
                    const user = {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.email,
                        role: existingUser.role,
                    };

                    console.log("User Compiled");
                    console.log(user);
                    return user;
                } catch (error) {
                    console.log("ALL Failed");
                    console.log(error);
                    throw { error: "Something went wrong", status: 401 };
                }
            }
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: 'openid profile email',
                },
            },
            profile(profile) {
                return {
                    id: profile.sub, // Map Google sub to user_id
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                };
            },
        }),
        Facebook({
            clientId: process.env.AUTH_FACEBOOK_ID,
            clientSecret: process.env.AUTH_FACEBOOK_SECRET,
            authorization: {
                params: {   
                    scope: "email", // ตรวจสอบว่า scope นี้ถูกต้อง
                },
            },
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                };
            },
        }),
    ]
} satisfies NextAuthConfig

