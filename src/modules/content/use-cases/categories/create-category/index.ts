import { CategoriesRepository } from "@/modules/content/repositories/categories-repository";
import { CreateCategoryUseCasePayload, CreateCategoryUseCaseReturn } from "./types";

export class CreateCategoryUseCase {
    constructor(private categoriesRepository: CategoriesRepository) { }

    async execute(payload: CreateCategoryUseCasePayload): Promise<CreateCategoryUseCaseReturn> {
        const categoryCreated = await this.categoriesRepository.create(payload)

        if (!categoryCreated) {
            throw new Error('Error creating category')
        }

        return { category: categoryCreated }
    }
}