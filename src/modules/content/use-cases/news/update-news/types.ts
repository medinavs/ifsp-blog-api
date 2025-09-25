import { News, Prisma } from "@prisma/client"

export interface UpdateNewsUseCasePayload extends Prisma.NewsUpdateInput {

}

export interface UpdateNewsUseCaseReturn {
    news: News
}