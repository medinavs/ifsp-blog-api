import { Prisma, Category, News } from "@prisma/client"
import { prisma } from "@/shared/infra/database/client"
import { NewsRepository } from "../news-repository"

export class PrismaNewsRepository implements NewsRepository {
    async delete(newsId: string): Promise<void> {
        await prisma.news.delete({
            where: {
                id: newsId
            }
        })
    }

    async findById(newsId: string): Promise<News | null> {
        const news = await prisma.news.findUnique({
            where: {
                id: newsId
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        color: true
                    }
                }
            }
        })

        return news;
    }

    async create(data: {
        title: string
        excerpt: string
        content?: string
        author: string
        image: string
        categoryId: string
        status?: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED'
        featured?: boolean
    }): Promise<News> {
        const news = await prisma.news.create({
            data: {
                title: data.title,
                excerpt: data.excerpt,
                content: data.content,
                author: data.author,
                image: data.image,
                status: data.status || 'DRAFT',
                featured: data.featured || false,
                category: {
                    connect: { id: data.categoryId }
                }
            }
        })

        return news
    }

    async save(news: News): Promise<News> {
        const updatedNews = await prisma.news.update({
            where: {
                id: news.id
            },
            data: {
                title: news.title,
                content: news.content,
                author: news.author,
                updatedAt: new Date()
            }
        })

        return updatedNews
    }

    async findMany(): Promise<News[]> {
        const news = await prisma.news.findMany({
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        color: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return news
    }
}