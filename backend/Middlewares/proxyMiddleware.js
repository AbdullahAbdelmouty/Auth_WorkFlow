const { createProxyMiddleware } = require('http-proxy-middleware');
const options = {
    target:"https://auth-workflow-kls5.onrender.com",
    changeOrigin: true,
}

const proxyMiddleware = createProxyMiddleware(options)

module.exports = proxyMiddleware