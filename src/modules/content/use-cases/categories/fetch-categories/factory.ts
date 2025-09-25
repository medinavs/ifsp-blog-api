import { PrismaCategoriesRepository } from "@/modules/content/repositories/prisma/prisma-categories-repository"
import { FetchCategoriesUseCase } from "."

export function makeFetchCategories() {
    const categoriesRepository = new PrismaCategoriesRepository()

    const useCase = new FetchCategoriesUseCase(categoriesRepository)

    return useCase
}