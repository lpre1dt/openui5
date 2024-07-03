const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/odata",
    createProxyMiddleware({
      target: "https://services.odata.org",
      changeOrigin: true,
      pathRewrite: {
        "^/odata": "/V2/Northwind/Northwind.svc/",
      },
    })
  );
};
