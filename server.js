const http = require("http");
const https = require("https");
const httpProxy = require("http-proxy");
const url = require("url");

const PORT = 5001;

function enableCors(req, res) {
  res.setHeader("access-control-allow-origin", "*");
}

const proxy = httpProxy.createProxyServer({});

const server = http.createServer(function (req, res, next) {
  const queryObject = url.parse(req.url, true).query;
  const qurl = queryObject.url;
  if (qurl) {
    const parsedUrl = url.parse(qurl, true);
    req.url = queryObject.url;
    proxy.web(req, res, {
      target: parsedUrl.protocol + "//" + parsedUrl.host,
      agent: https.globalAgent,
      changeOrigin: true,
    });
    return;
  }
  res.statusCode = 404;
  res.end();
});

proxy.on("proxyRes", function (proxyRes, req, res) {
  enableCors(req, res);
});

server.listen(PORT);
