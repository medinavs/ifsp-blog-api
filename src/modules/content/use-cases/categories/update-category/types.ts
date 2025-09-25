import { Category, Prisma } from "@prisma/client"

export interface UpdateCategoryUseCasePayload extends Prisma.CategoryUpdateInput {

}

export interface UpdateCategoryUseCaseReturn {
    category: Category
}