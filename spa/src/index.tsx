import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Redirect, RouteComponentProps, Router } from "@reach/router"
import { ArticleData, articleIndex, articles } from './articles/Articles'

const header = <React.Fragment><h1><Link to='/blog'>zvolsky.org/blog</Link> ~ bits of information I wish were available on the internet</h1></React.Fragment>

interface PageLayoutProps {}
function AppFrame(props: React.PropsWithChildren<PageLayoutProps>) {
  return <React.Fragment>
    {header}
    {props.children}
  </React.Fragment>
}

function IndexRoute(props: RouteComponentProps) {
  const index = articles.sort((a, b) => a.published < b.published ? 1 : -1).map((a) => {
    return <li key={a.slug}><Link to={`/blog/${a.slug}`}>{a.title}</Link></li>
  })

  return <AppFrame>
    <ul>{index}</ul>
  </AppFrame>
}

function ArticleView(props: {data: ArticleData}) {
  const a = props.data
  return <React.Fragment>
    <h1>{a.title}</h1>
    {a.text}
  </React.Fragment>
}

function NotFound(props: RouteComponentProps) {
  // TODO navigate to the index and flash a not found message
  return <p>404 Not Found</p>
}

function ArticleRoute(props: RouteComponentProps & {slug?: string}) {
  if (!props?.slug) return <NotFound />
  const a = articleIndex.get(props.slug)
  if (!a) return <NotFound />
  return a && <AppFrame><ArticleView data={a} /></AppFrame>
}

function DefaultRoute(props: RouteComponentProps) {
  switch (props.uri) {
    case '/':
      return <Redirect noThrow={true} to={'/blog'} />
    case '/articles/60133f1c-6de5-43d1-904c-6eb1e0f9195d':
      return <Redirect noThrow={true} to={'/blog/do-lb-ingress-nginx-ip'} />
  }
  return <NotFound {...props} />
}

const app = <React.StrictMode><Router>
  <IndexRoute path='/blog' />
  <ArticleRoute path='/blog/:slug' />
  <DefaultRoute default />
</Router></React.StrictMode>

ReactDOM.render(app, document.getElementById('root'));
