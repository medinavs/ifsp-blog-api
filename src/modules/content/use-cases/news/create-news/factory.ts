import { PrismaNewsRepository } from "@/modules/content/repositories/prisma/prisma-news-repository";
import { CreateNewsUseCase } from ".";

export function makeCreateNewsUseCase() {
    const newsRepository = new PrismaNewsRepository()

    const useCase = new CreateNewsUseCase(newsRepository)

    return useCase
}