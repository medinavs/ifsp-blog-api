import { NewsRepository } from "@/modules/content/repositories/news-repository";
import { GetNewsUseCaseReturn } from "./types";

export class GetNewsUseCase {
    constructor(private newsRepository: NewsRepository) { }

    async execute(
        newsId: string
    ): Promise<GetNewsUseCaseReturn> {
        const news = await this.newsRepository.findById(newsId)
        return { news: news! }
    }
}