import { NewsRepository } from "@/modules/content/repositories/news-repository";
import { FetchNewsUseCaseReturn } from "./types";

export class FetchNewsUseCase {
    constructor(private newsRepository: NewsRepository) { }

    async execute(): Promise<FetchNewsUseCaseReturn> {
        const news = await this.newsRepository.findMany()
        return { news }
    }
}