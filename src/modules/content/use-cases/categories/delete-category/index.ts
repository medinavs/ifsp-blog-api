import { CategoriesRepository } from "@/modules/content/repositories/categories-repository";
import { DeleteCategoryUseCasePayload, DeleteCategoryUseCaseReturn } from "./types";

export class DeleteCategoryUseCase {
    constructor(private categoriesRepository: CategoriesRepository) { }

    async execute(payload: DeleteCategoryUseCasePayload): Promise<DeleteCategoryUseCaseReturn> {
        const { categoryId } = payload

        await this.categoriesRepository.delete(categoryId)

        return { success: true }
    }
}