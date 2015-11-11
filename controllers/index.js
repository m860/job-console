/**
 * Created by hai.ma on 2015/10/21 0021.
 */
var express = require('express');
var router = express.Router();

module.exports = function (app) {
    app.use('/', router);
};

router.get("/",function(req,res,next){
    res.render("pages/index");
});