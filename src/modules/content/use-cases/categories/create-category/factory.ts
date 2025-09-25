import { PrismaCategoriesRepository } from "@/modules/content/repositories/prisma/prisma-categories-repository"
import { CreateCategoryUseCase } from "."

export function makeCreateCategory() {
    const categoriesRepository = new PrismaCategoriesRepository()

    const useCase = new CreateCategoryUseCase(categoriesRepository)

    return useCase
}