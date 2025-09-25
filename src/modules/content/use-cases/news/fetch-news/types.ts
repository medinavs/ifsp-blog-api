import { News } from "@prisma/client"

export interface FetchNewsUseCaseReturn {
    news: News[]
}