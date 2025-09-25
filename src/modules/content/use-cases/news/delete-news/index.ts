import { NewsRepository } from "@/modules/content/repositories/news-repository";
import { DeleteNewsUseCasePayload, DeleteNewsUseCaseReturn } from "./types";

export class DeleteNewsUseCase {
    constructor(private newsRepository: NewsRepository) { }

    async execute(payload: DeleteNewsUseCasePayload): Promise<DeleteNewsUseCaseReturn> {
        await this.newsRepository.delete(payload.id)
        return { success: true }
    }
}