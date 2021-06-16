import { _2020_07_19_do_lb_ingress_nginx_ip } from './2020-07-17-do-lb-ingress-nginx-ip'
import { _2021_06_16_e590_48gb_upgrade } from './2021-06-16-e590-48gb-ram-upgrade'

export interface ArticleData {
  published: number,
  slug: string,
  title: string,
  text: JSX.Element
}

export const articles: ArticleData[] = [
  _2020_07_19_do_lb_ingress_nginx_ip,
  _2021_06_16_e590_48gb_upgrade
]

export const articleIndex = new Map(articles.map(a => [a.slug, a]))