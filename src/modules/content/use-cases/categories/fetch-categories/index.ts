import { CategoriesRepository } from "@/modules/content/repositories/categories-repository";
import { FetchCategoryUseCaseReturn } from "./types";

export class FetchCategoriesUseCase {
    constructor(private categoriesRepository: CategoriesRepository) { }

    async execute(): Promise<FetchCategoryUseCaseReturn> {
        const categories = await this.categoriesRepository.findMany()
        return { categories }
    }
}