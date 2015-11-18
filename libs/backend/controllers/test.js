/**
 * Created by hai.ma on 2015/10/21 0021.
 */
var express = require('express');
var router = express.Router();
var addons = require("react/addons");
var HelloPage = addons.createFactory(require("libs/common/pages/hello"));
var reactDOMServer = require("react-dom/server");

module.exports = function (app) {
    app.use('/test', router);
};

router.get("/", function (req, res, next) {
    res.render("pages/test");
});
router.get("/browserify", function (req, res, next) {
    res.render("pages/browserify_test", {
        layout: "browserify"
    });
});

router.get("/render/hello", function (req, res, next) {
    res.send(reactDOMServer.renderToString(HelloPage()));
});
