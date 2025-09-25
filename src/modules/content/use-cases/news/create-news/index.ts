import { NewsRepository } from "@/modules/content/repositories/news-repository";
import { CreateNewsUseCasePayload, CreateNewsUseCaseReturn } from "./types";

export class CreateNewsUseCase {
    constructor(private newsRepository: NewsRepository) { }

    async execute(payload: CreateNewsUseCasePayload): Promise<CreateNewsUseCaseReturn> {
        const createdNews = await this.newsRepository.create(payload)

        if (!createdNews) {
            throw new Error('Error creating news')
        }

        return { news: createdNews }
    }
}