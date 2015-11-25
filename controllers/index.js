/**
 * Created by hai.ma on 2015/10/21 0021.
 */
var express = require('express');
var router = express.Router();

module.exports = function (app) {
    app.use('/', router);
};

router.get("/", function (req, res, next) {
    res.render("pages/index");
});

router.post("/upload", function (req, res, next) {
    console.log(req.file, req.files);
    res.send("");
});