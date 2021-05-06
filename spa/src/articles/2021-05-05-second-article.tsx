import React from "react"
import { ArticleData } from "./Articles"

function Text() {
  return <React.Fragment>This is the second article.</React.Fragment>
}

export const _2021_05_06_second_article: ArticleData = {
  published: 1620300371,
  slug: 'second',
  title: 'Second article',
  text: Text()
}