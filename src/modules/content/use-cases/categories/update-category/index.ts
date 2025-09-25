import { CategoriesRepository } from "@/modules/content/repositories/categories-repository";
import { UpdateCategoryUseCasePayload, UpdateCategoryUseCaseReturn } from "./types";

export class UpdateCategoryUseCase {
    constructor(private categoriesRepository: CategoriesRepository) { }

    async execute(payload: UpdateCategoryUseCasePayload): Promise<UpdateCategoryUseCaseReturn> {
        const category = await this.categoriesRepository.findById(payload.id as string)

        if (!category) {
            throw new Error("Category not found")
        }

        const categoryUpdated = await this.categoriesRepository.save({
            id: category.id,
            name: String(payload.name) ?? category.name,
            slug: String(payload.slug) ?? category.slug,
            description: String(payload.description) ?? category.description,
            color: String(payload.color) ?? category.color,
            createdAt: category.createdAt,
            updatedAt: new Date(),
        })

        if (!categoryUpdated) {
            throw new Error('Error updating category')
        }

        return { category: categoryUpdated }
    }
}