import { Category, Prisma } from "@prisma/client"

export interface CreateCategoryUseCasePayload extends Prisma.CategoryCreateInput {

}

export interface CreateCategoryUseCaseReturn {
    category: Category
}