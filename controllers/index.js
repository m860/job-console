/**
 * Created by hai.ma on 2015/10/21 0021.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var uploadStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/../jobs/");
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    }
});
var upload = multer({
    storage: uploadStorage,
    fileFilter: function (req, file, cb) {
        var index = file.originalname.lastIndexOf(".js");
        cb(null, index < 0);
    }
});

module.exports = function (app) {
    app.use('/', router);
};

router.get("/", function (req, res, next) {
    res.render("pages/index");
});

router.post("/upload", upload.any(), function (req, res, next) {
    //console.log(req.file, req.files, req.body);
    res.send("");
});