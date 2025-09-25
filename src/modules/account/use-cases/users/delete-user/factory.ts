import { PrismaUserRepository } from "@/modules/account/repositories/prisma/prisma-user-repository"
import { DeleteUserUseCase } from "."

export function makeDeleteUser() {
    const useCase = new DeleteUserUseCase()

    return useCase
}