import { PrismaUserRepository } from "@/modules/account/repositories/prisma/prisma-user-repository";
import { FetchUsersUseCase } from ".";

export function makeFetchUsers() {
    const useCase = new FetchUsersUseCase()

    return useCase
}