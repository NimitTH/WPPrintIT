import { JWT, DefaultJWT } from "next-auth/jwt"
import { DefaultSession } from "next-auth"
import { User } from "@prisma/client";
export type {
    Account,
    DefaultSession,
    Profile,
    Session,
    User,
} from "@auth/core/types"

declare module "next-auth" {
    interface Session {
        user: User & {
            id: number;
            name: string;
            email: string;
            role: string;
            status: string;
            address: string;
        } & DefaultSession["user"]
    }

    
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: string;
        status: string;
    }
}