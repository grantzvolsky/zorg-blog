import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Redirect, RouteComponentProps, Router } from "@reach/router"
import { ArticleData, articleIndex, articles } from './articles/Articles'

const header = <header><Link to='/blog'>zvolsky.org/blog</Link> ~ bits of information I wish were available on the internet</header>

interface PageLayoutProps {}
function AppFrame(props: React.PropsWithChildren<PageLayoutProps>) {
  return <React.Fragment>
    {header}
    <main>{props.children}</main>
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
  return <NotFound {...props} />
}

const app = <React.StrictMode><Router>
  <Redirect noThrow={true} from='/' to={'/blog'} />
  <Redirect noThrow={true} from='/articles/60133f1c-6de5-43d1-904c-6eb1e0f9195d' to={'/blog/do-lb-ingress-nginx-ip'} />
  <Redirect noThrow={true} from='/blog/psa-e590-48gb-ram-upgrade' to={'/blog/e590-48gb-ram-upgrade'} />
  <IndexRoute path='/blog' />
  <ArticleRoute path='/blog/:slug' />
  <DefaultRoute default />
</Router></React.StrictMode>

ReactDOM.render(app, document.getElementById('root'));
