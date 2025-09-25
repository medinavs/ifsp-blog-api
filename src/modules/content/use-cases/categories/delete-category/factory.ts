import { PrismaCategoriesRepository } from "@/modules/content/repositories/prisma/prisma-categories-repository"
import { DeleteCategoryUseCase } from "."

export function makeDeleteCategory() {
    const categoriesRepository = new PrismaCategoriesRepository()

    const useCase = new DeleteCategoryUseCase(categoriesRepository)

    return useCase
}