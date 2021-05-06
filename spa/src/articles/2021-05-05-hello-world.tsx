import React from "react"
import { ArticleData } from "./Articles"

function Text() {
  return <React.Fragment>This is the first article.</React.Fragment>
}

export const _2021_05_06_hello_world: ArticleData = {
  published: 1620300369,
  slug: 'hello-world',
  title: 'Hello World',
  text: Text()
}