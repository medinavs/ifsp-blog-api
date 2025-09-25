import { PrismaNewsRepository } from "@/modules/content/repositories/prisma/prisma-news-repository";
import { GetNewsUseCase } from ".";

export function makeGetNewsUseCase() {
    const newsRepository = new PrismaNewsRepository()

    const useCase = new GetNewsUseCase(newsRepository)

    return useCase
}