import { _2020_07_19_do_lb_ingress_nginx_ip } from './2020-07-17-do-lb-ingress-nginx-ip'

export interface ArticleData {
  published: number,
  slug: string,
  title: string,
  text: JSX.Element
}

export const articles: ArticleData[] = [
  _2020_07_19_do_lb_ingress_nginx_ip
]

export const articleIndex = new Map(articles.map(a => [a.slug, a]))