import { Route } from "@/shared/infra/http/decorators/route-decorator";
import { verifyAuthentication } from "@/shared/infra/http/middlewares/verify-authentication";
import type { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchNewsUseCase } from "../../use-cases/news/fetch-news/factory";
import { makeCreateNewsUseCase } from "../../use-cases/news/create-news/factory";
import { Prisma } from "@prisma/client";
import { makeDeleteNewsUseCase } from "../../use-cases/news/delete-news/factory";
import { makeUpdateNewsUseCase } from "../../use-cases/news/update-news/factory";
import { makeGetNewsUseCase } from "../../use-cases/news/get-news/factory";

export class NewsController {
    constructor() { }

    @Route('GET', '/news')
    async fetchNews(request: FastifyRequest, reply: FastifyReply) {
        const useCase = makeFetchNewsUseCase()

        const news = await useCase.execute()

        return reply.send(news);
    }

    @Route('GET', '/news/:id')
    async getNews(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string }

        const useCase = makeGetNewsUseCase()

        const news = await useCase.execute(id)

        return reply.send(news);
    }

    @Route('POST', '/news', {
        middlewares: [verifyAuthentication]
    })
    async createNews(request: FastifyRequest, reply: FastifyReply) {
        const { title, content, author, categoryId, excerpt, image } = request.body as {
            title: string,
            content: string,
            author: string,
            categoryId: string,
            excerpt: string,
            image: string
        }

        const useCase = makeCreateNewsUseCase()

        const result = await useCase.execute({
            title,
            content,
            author,
            excerpt,
            categoryId,
            image,
        })

        return reply.status(201).send(result.news)
    }

    @Route('PUT', '/news/:id', {
        middlewares: [verifyAuthentication]
    })
    async updateNews(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string }
        const { title, content, author, category, excerpt, image } = request.body as {
            title?: string,
            content?: string,
            author?: string,
            category?: Prisma.CategoryCreateNestedOneWithoutNewsInput,
            excerpt?: string,
            image?: string
        }

        const useCase = makeUpdateNewsUseCase()

        const result = await useCase.execute({ id, title, content, author, category, excerpt, image })

        return reply.status(200).send({ news: result.news })
    }

    @Route('DELETE', '/news/:id', {
        middlewares: [verifyAuthentication]
    })
    async deleteNews(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string }

        const useCase = makeDeleteNewsUseCase()

        await useCase.execute({ id })

        return reply.status(204).send()
    }
}