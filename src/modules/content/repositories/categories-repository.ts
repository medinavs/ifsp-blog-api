import { Prisma, Category } from "@prisma/client"

export interface CategoriesRepository {
    delete(categoryId: string): Promise<void>
    findById(categoryId: string): Promise<Category | null>
    create(data: Prisma.CategoryCreateInput): Promise<Category>
    save(category: Category): Promise<Category>
    findMany(): Promise<Category[]>
}