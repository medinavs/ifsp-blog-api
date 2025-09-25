import { News } from "@prisma/client"

export interface GetNewsUseCaseReturn {
    news: News
}