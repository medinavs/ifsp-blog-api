import { PrismaCategoriesRepository } from "@/modules/content/repositories/prisma/prisma-categories-repository"
import { UpdateCategoryUseCase } from "."

export function makeUpdateCategory() {
    const categoriesRepository = new PrismaCategoriesRepository()

    const useCase = new UpdateCategoryUseCase(categoriesRepository)

    return useCase
}