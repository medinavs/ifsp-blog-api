import { Prisma, Category } from "@prisma/client"
import { prisma } from "@/shared/infra/database/client"
import { CategoriesRepository } from "../categories-repository"

export class PrismaCategoriesRepository implements CategoriesRepository {
    async delete(categoryId: string): Promise<void> {
        await prisma.category.delete({
            where: {
                id: categoryId
            }
        })
    }

    async findById(categoryId: string): Promise<Category | null> {
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId
            }
        })

        return category
    }

    async create(data: Prisma.CategoryCreateInput): Promise<Category> {
        const category = await prisma.category.create({
            data
        })

        return category
    }

    async save(category: Category): Promise<Category> {
        const updatedCategory = await prisma.category.update({
            where: {
                id: category.id
            },
            data: {
                name: category.name,
                slug: category.slug,
                description: category.description,
                color: category.color,
                updatedAt: new Date()
            }
        })

        return updatedCategory
    }

    async findMany(): Promise<Category[]> {
        const categories = await prisma.category.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return categories
    }
}