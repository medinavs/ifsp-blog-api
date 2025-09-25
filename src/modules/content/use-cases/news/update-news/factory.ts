import { PrismaNewsRepository } from "@/modules/content/repositories/prisma/prisma-news-repository";
import { UpdateNewsUseCase } from ".";

export function makeUpdateNewsUseCase() {
    const newsRepository = new PrismaNewsRepository()

    const useCase = new UpdateNewsUseCase(newsRepository)

    return useCase
}