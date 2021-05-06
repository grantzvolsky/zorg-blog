import React from "react";
import { ArticleData } from "./Articles";

import "./article.css"

function Text() {
  return <React.Fragment>

    <h3>SSL-terminating LB</h3>

    <p>First we need to know whether our load balancer terminates TLS traffic, or whether traffic just passes through encrypted. This is important because if the LB terminates TLS traffic, it automatically adds the original, pre-proxy source IP to the request's <a href="https://www.digitalocean.com/docs/networking/load-balancers/#http">http headers</a>.</p>

    <p>I'd like to focus on the SSL-passthrough case, so without any testing, here's the configuration that should suffice to log real IP when using an SSL-terminating LB.</p>

    <pre style={{overflow: 'auto', width: '100%', background: '#ddd'}}>{
    `kind: ConfigMap
    apiVersion: v1
    metadata:
      name: nginx-configuration
      namespace: ingress-nginx
      labels:
        app.kubernetes.io/name: ingress-nginx
        app.kubernetes.io/part-of: ingress-nginx
    data:
      log-format-upstream: '$http_x_forwarded_for $remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent" $request_length $request_time [$proxy_upstream_name] [$proxy_alternative_upstream_name] $upstream_addr $upstream_response_length $upstream_response_time $upstream_status $req_id'`
    }</pre>

    <h3>SSL-passthrough LB</h3>

    <p>The SSL-passthrough is different because the load balancer can't add headers to the request. To preserve the original IP, we need to use the [PROXY Protocol](https://www.haproxy.com/blog/haproxy/proxy-protocol/). To minimize downtime we'll turn it on simultaneously in the load balancer and the ingress controller.</p>

    <p>The load balancer's Proxy Protocol flag is in its settings at https://cloud.digitalocean.com/networking/load_balancers/&lt;UUID&gt;/settings. It can also be set via an [annotation](https://www.digitalocean.com/docs/kubernetes/how-to/configure-load-balancers/#proxy-protocol).</p>

    Ingress-nginx exposes the `use-proxy-protocol` flag.

    <pre style={{overflow: 'auto', width: '100%', background: '#ddd'}}>{
    `kind: ConfigMap
    apiVersion: v1
    metadata:
      name: nginx-configuration
      namespace: ingress-nginx
      labels:
        app.kubernetes.io/name: ingress-nginx
        app.kubernetes.io/part-of: ingress-nginx
    data:
      use-proxy-protocol: "true"`
    }</pre>

    <p>The resource name `nginx-configuration` is not random; it is passed as an argument to the ingress controller, see <a href="#ingress-nginx-configuration">ingress-nginx-configuration</a>.</p>

    <p>
    When you apply the above configuration, ingress-nginx automatically configures nginx realip module so changing the log format to include a custom header isn't necessary.
    </p>

    <h3>References</h3>

    * SSH into <b>nginx-ingress-controller</b> to view current configuration
    <pre style={{overflow: 'auto', width: '100%', background: '#ddd'}}>
    $ kubectl exec -itn ingress-nginx deployment/nginx-ingress-controller -- /bin/bash<br />
    bash-5.0$ cat /etc/nginx/nginx.conf | less
    </pre>

    * The controller's nginx configuration is generated from <a href="https://github.com/kubernetes/ingress-nginx/blob/nginx-0.30.0/rootfs/etc/nginx/template/nginx.tmpl#L266">/rootfs/etc/nginx/template/nginx.tmpl</a> in the source repository.<br />

    * Default values come from <a href="https://github.com/kubernetes/ingress-nginx/blob/nginx-0.30.0/internal/ingress/controller/config/config.go#L57">internal/ingress/controller/config/config.go</a>).<br />

    * Ingress-nginx configmap documentation: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/<br />

    * Ingress-nginx configuration <a id="ingress-nginx-configuration" href="https://github.com/kubernetes/ingress-nginx/blob/nginx-0.30.0/deploy/static/mandatory.yaml#L223">kubernetes/ingress-nginx/blob/nginx-0.30.0/deploy/static/mandatory.yaml#L223</a><br />

    * [DigitalOcean Load Balancer docs](https://www.digitalocean.com/docs/networking/load-balancers/#http).<br />

  </React.Fragment>
}

export const _2020_07_19_do_lb_ingress_nginx_ip: ArticleData = {
  published: 1595182749,
  slug: 'do-lb-ingress-nginx-ip',
  title: 'Log client ip with ingress-nginx behind DO load balancer',
  text: Text()
}
