const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/', {
            target:'https://pure-reaches-08614-283f2e14249d.herokuapp.com',
            // target: 'http://localhost:8000',
            changeOrigin: true,
        })
    );
};
