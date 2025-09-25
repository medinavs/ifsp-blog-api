import { Prisma } from "@prisma/client"
import { User } from "better-auth"

export interface UpdateUserUseCasePayload extends Prisma.UserCreateInput {
    userId: string
    headers: Record<string, string>
}

export interface UpdateUserUseCaseReturn {
    user: User
}