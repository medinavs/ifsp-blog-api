import { NewsRepository } from "@/modules/content/repositories/news-repository";
import { UpdateNewsUseCasePayload, UpdateNewsUseCaseReturn } from "./types";

export class UpdateNewsUseCase {
    constructor(private newsRepository: NewsRepository) { }

    async execute(payload: UpdateNewsUseCasePayload): Promise<UpdateNewsUseCaseReturn> {
        const news = await this.newsRepository.findById(payload.id as string)

        if (!news) {
            throw new Error("News not found")
        }

        const updatedNews = await this.newsRepository.save({
            author: String(payload.author) ?? news.author,
            content: String(payload.content) ?? news.content,
            categoryId: news.categoryId,
            title: String(payload.title) ?? news.title,
            id: news.id,
            createdAt: news.createdAt,
            updatedAt: new Date(),
            date: news.date,
            image: news.image,
            excerpt: String(payload.excerpt) ?? news.excerpt,
            featured: news.featured,
            status: news.status,
            views: news.views,
        })

        return { news: updatedNews }
    }
}