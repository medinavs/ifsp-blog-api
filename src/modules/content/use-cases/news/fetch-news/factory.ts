import { PrismaNewsRepository } from "@/modules/content/repositories/prisma/prisma-news-repository";
import { FetchNewsUseCase } from ".";

export function makeFetchNewsUseCase() {
    const newsRepository = new PrismaNewsRepository()

    const useCase = new FetchNewsUseCase(newsRepository)

    return useCase
}