import { Route } from "@/shared/infra/http/decorators/route-decorator";
import { verifyAuthentication } from "@/shared/infra/http/middlewares/verify-authentication";
import type { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchCategories } from "../../use-cases/categories/fetch-categories/factory";
import { makeCreateCategory } from "../../use-cases/categories/create-category/factory";
import { makeUpdateCategory } from "../../use-cases/categories/update-category/factory";
import { makeDeleteCategory } from "../../use-cases/categories/delete-category/factory";

export class CategoriesController {
    constructor() { }

    @Route('GET', '/categories')
    async fetchCategories(request: FastifyRequest, reply: FastifyReply) {
        const useCase = makeFetchCategories()

        const categories = await useCase.execute()

        return reply.send(categories);
    }

    @Route('POST', '/categories', {
        middlewares: [verifyAuthentication]
    })
    async createCategory(request: FastifyRequest, reply: FastifyReply) {
        const { name, slug, description, color, createdAt, updatedAt } = request.body as { name: string, slug: string, description?: string, color?: string, createdAt?: Date, updatedAt?: Date }

        const useCase = makeCreateCategory()

        const result = await useCase.execute({ name, slug, description, color, createdAt, updatedAt })

        return reply.status(201).send({ category: result.category })
    }

    @Route('PUT', '/categories/:id', {
        middlewares: [verifyAuthentication]
    })
    async updateCategory(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string }
        const { name, slug, description, color, createdAt, updatedAt } = request.body as { name?: string, slug?: string, description?: string, color?: string, createdAt?: Date, updatedAt?: Date }

        const useCase = makeUpdateCategory()

        const result = await useCase.execute({ id, name, slug, description, color, createdAt, updatedAt })

        return reply.status(200).send({ category: result.category })
    }

    @Route('DELETE', '/categories/:id', {
        middlewares: [verifyAuthentication]
    })
    async deleteCategory(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string }

        const useCase = makeDeleteCategory()

        await useCase.execute({ categoryId: id })

        return reply.status(204).send()
    }
}