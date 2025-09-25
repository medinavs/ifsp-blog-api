import { Prisma } from "@prisma/client"
import { User } from "better-auth"

export interface CreateUserUseCasePayload extends Prisma.UserCreateInput {
    password: string
}

export interface CreateUserUseCaseReturn {
    user: User
}