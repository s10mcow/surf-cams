const proxy = require("http-proxy-middleware");
module.exports = function(app) {
    app.use(
        proxy("../surf-cams/functions", { target: "http://localhost:9000/" })
    );
};
