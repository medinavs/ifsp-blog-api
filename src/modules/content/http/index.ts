import { CategoriesController } from "./controllers/categories-controller";
import { NewsController } from "./controllers/news-controller";

export const controllers = [
    new CategoriesController(),
    new NewsController(),
]