import { News } from "@prisma/client"

interface NewsCreateInput {
    title: string
    excerpt: string
    content?: string
    author: string
    image: string
    categoryId: string
    status?: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED'
    featured?: boolean
}

export interface NewsRepository {
    delete(newsId: string): Promise<void>
    findById(newsId: string): Promise<News | null>
    create(data: NewsCreateInput): Promise<News>
    save(news: News): Promise<News>
    findMany(): Promise<News[]>
}