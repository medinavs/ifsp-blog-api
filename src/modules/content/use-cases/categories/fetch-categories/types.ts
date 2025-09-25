import { Category } from "@prisma/client"


export interface FetchCategoryUseCaseReturn {
    categories: Category[]
}