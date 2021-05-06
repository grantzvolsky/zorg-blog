import { _2021_05_06_hello_world } from './2021-05-05-hello-world'
import { _2021_05_06_second_article } from './2021-05-05-second-article'

export interface ArticleData {
  published: number,
  slug: string,
  title: string,
  text: JSX.Element
}

export const articles: ArticleData[] = [
  _2021_05_06_hello_world,
  _2021_05_06_second_article,
]

export const articleIndex = new Map(articles.map(a => [a.slug, a]))