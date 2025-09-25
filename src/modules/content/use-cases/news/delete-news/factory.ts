import { PrismaNewsRepository } from "@/modules/content/repositories/prisma/prisma-news-repository";
import { DeleteNewsUseCase } from ".";

export function makeDeleteNewsUseCase() {
    const newsRepository = new PrismaNewsRepository()

    const useCase = new DeleteNewsUseCase(newsRepository)

    return useCase
}