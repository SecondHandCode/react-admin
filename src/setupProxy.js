const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        proxy("/api", {
            target: "http://192.168.124.7:8777/",
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/' //target后面的文件夹名字
            }
        })
    );
};
