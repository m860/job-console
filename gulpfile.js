var gulp = require("gulp");
var babel = require("gulp-babel");
var livereload = require("gulp-livereload");
var merge = require('merge-stream');
var nodemon = require('gulp-nodemon');
var less = require("gulp-less");

var browserify = require('browserify');
var source = require('vinyl-source-stream');

var glob = require("glob-all");

var path = require("path");

var config = require(__dirname + "/browserify.json");

var mocha = require('gulp-mocha');

gulp.task("less", function () {
    return gulp.src(__dirname + "/public/less/**/*.less").pipe(less()).pipe(gulp.dest(__dirname + "/public/css"));
});

gulp.task("watching", ["browserify", "less"], function (callback) {

    livereload.listen();

    nodemon({
        script: 'app.js'
        , ext: 'js'
        , ignore: ["node_modules/**", "public/**", "views/**", "react/**/*.*", "test/**", "gulpfile.js", "*.json"]
        , env: {'NODE_ENV': 'development'}
    });

    //watch less
    gulp.watch(__dirname + "/public/less/**/*.less", function (event) {
        gulp.src(event.path).pipe(less()).pipe(gulp.dest(__dirname + "/public/css")).pipe(livereload());
    });

    //watch .handlebars
    gulp.watch(__dirname + "/views/**/*.handlebars", function (event) {
        gulp.src(event.path).pipe(livereload());
    });

    //watch libs
    gulp.watch(__dirname + "/libs/**/*.js", function (event) {
        gulp.run("browserify");
    });
    gulp.watch(__dirname + "/libs/**/*.jsx", function (event) {
        gulp.run("browserify");
    });

});

gulp.task("test", function () {
    if (!global.watchTest) {
        global.watchTest = gulp.watch(__dirname + "/test/**/*.js", function () {
            setTimeout(function () {
                gulp.run("test");
            }, 1000);
        });
    }
    return gulp.src(__dirname + "/test/**/*.js").pipe(mocha({reporter: 'spec'}));
});

gulp.task("gen-libs", function () {
    return merge([
        gulp.src(__dirname + "/libs/**/*.jsx").pipe(babel()).pipe(gulp.dest(__dirname + "/node_modules/libs"))
        , gulp.src(__dirname + "/libs/**/*.jsx").pipe(babel()).pipe(gulp.dest(__dirname + "/node_modules/libs"))
        , gulp.src(__dirname + "/libs/**/*.js").pipe(gulp.dest(__dirname + "/node_modules/libs"))
    ])
});
//
gulp.task("browserify", ["gen-libs"], function (cb) {

    var files = glob.sync(__dirname + "/node_modules/libs/common/pages/**/*.js");
    files.map(function (file) {
        var b = browserify(file, {
            insertGlobals: false
        });
        config.external.forEach(function (ex) {
            b.external(ex);
        });
        config.ignore.forEach(function (ig) {
            b.ignore(ig);
        });
        return b.bundle().pipe(source(path.basename(file))).pipe(gulp.dest(__dirname + "/public/js/browserify/pages"));
    });
    return cb();

});

gulp.task("browserify-libs", function () {
    var b = browserify();
    config.external.forEach(function (lib) {
        b.require(lib);
    });

    return b.bundle().pipe(source("lib.js")).pipe(gulp.dest(__dirname + "/public/js/browserify"));
});

gulp.task("default", ["gen-libs", "browserify-libs"], function () {
    gulp.run("watching");
});