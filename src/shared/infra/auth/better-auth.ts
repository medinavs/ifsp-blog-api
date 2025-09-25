import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma";
import { FIVE_MINUTES_IN_SEC, ONE_WEEK_IN_SEC } from "@/shared/config/constants";
import { admin } from "better-auth/plugins"
import { prisma } from "@/shared/infra/database/client"


export const auth = betterAuth({
    trustedOrigins: ['http://localhost:8080', 'http://localhost:5173'],
    plugins: [admin()],
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
        usePlural: false,
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    session: {
        expiresIn: ONE_WEEK_IN_SEC,
        cookieCache: {
            enabled: true,
            maxAge: FIVE_MINUTES_IN_SEC,
        }
    },
    user: {
        deleteUser: {
            enabled: true,
        }
    },
    logger: {
        level: "debug", // Adicione logs para debug
        disabled: false,
    },
})