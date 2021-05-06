import React from 'react'
import ReactDOM from 'react-dom'
import { Link, navigate, RouteComponentProps, Router, useLocation } from "@reach/router"

const header = <React.Fragment><h1><Link to='/'>zvolsky.org</Link> ~ Grant Zvolsky</h1></React.Fragment>

function IndexRoute(props: RouteComponentProps) {
  return <React.Fragment>
    {header}
    <ul>
      <li><Link to='/hello-world'>Hello World</Link></li>
    </ul>

  </React.Fragment>
}

function ArticleRoute(props: RouteComponentProps) {
  return <React.Fragment>
    {header}
    <h2>{props.path}</h2>
  </React.Fragment>
}

const app = <React.StrictMode><Router>
  <IndexRoute path='/' />
  <ArticleRoute path='/hello-world' />
</Router></React.StrictMode>

ReactDOM.render(app, document.getElementById('root'));
