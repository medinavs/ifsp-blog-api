import { News } from "@prisma/client"

export interface CreateNewsUseCasePayload {
    title: string
    excerpt: string
    content?: string
    author: string
    image: string
    categoryId: string
    status?: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED'
    featured?: boolean
}

export interface CreateNewsUseCaseReturn {
    news: News
}