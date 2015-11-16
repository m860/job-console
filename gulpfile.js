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

//gulp.task("compile-jsx", function (callback) {
//    return merge(
//        gulp.src(__dirname + "/public/js/jsx_components/**/*.jsx").pipe(babel()).pipe(gulp.dest(__dirname + "/public/js/components"))
//        , gulp.src(__dirname + "/public/js/jsx_pages/**/*.jsx").pipe(babel()).pipe(gulp.dest(__dirname + "/public/js/pages"))
//    );
//});

gulp.task("less", function () {
    return gulp.src(__dirname + "/public/less/**/*.less").pipe(less()).pipe(gulp.dest(__dirname + "/public/css"));
});


//gulp.task("build-react", function () {
//    return gulp.src(__dirname + "/react/**/*.jsx")
//        .pipe(babel())
//        .pipe(gulp.dest(__dirname + "/react"));
//});

gulp.task("watching", ["less"], function (callback) {

    livereload.listen();

    nodemon({
        script: 'app.js'
        , ext: 'js'
        , ignore: ["node_modules/**", "public/**", "views/**", "react/**/*.*"]
        , env: {'NODE_ENV': 'development'}
    });

    //gulp.watch(__dirname + "/public/js/jsx_components/**/*.jsx", function (event) {
    //    gulp.src(event.path)
    //        .pipe(babel())
    //        .pipe(gulp.dest(__dirname + "/public/js/components"))
    //        .pipe(livereload());
    //});

    //gulp.watch(__dirname + "/public/js/jsx_pages/**/*.jsx", function (event) {
    //    gulp.src(event.path)
    //        .pipe(babel())
    //        .pipe(gulp.dest(__dirname + "/public/js/pages"))
    //        .pipe(livereload());
    //});

    gulp.watch(__dirname + "/public/less/**/*.less", function (event) {
        gulp.src(event.path).pipe(less()).pipe(gulp.dest(__dirname + "/public/css")).pipe(livereload());
    });

    gulp.watch(__dirname + "/views/**/*.handlebars", function (event) {
        gulp.src(event.path).pipe(livereload());
    });

    //watch react jsx
    //gulp.watch(__dirname + "/react/**/*.jsx", function (event) {
    //    gulp.src(event.path)
    //        .pipe(babel())
    //        .pipe(gulp.dest(__dirname + "/react"));
    //});
});

gulp.task("babel", function () {
    return merge([
        gulp.src(__dirname + "/libs/common/components/**/*.jsx").pipe(babel()).pipe(gulp.dest(__dirname + "/libs/common/components"))
        , gulp.src(__dirname + "/libs/common/pages/**/*.jsx").pipe(babel()).pipe(gulp.dest(__dirname + "/libs/common/pages"))
        , gulp.src(__dirname + "/public/js/test/**/*.jsx").pipe(babel()).pipe(gulp.dest(__dirname + "/public/js/test"))
    ])
});
//
gulp.task("browserify", ["babel", "browserify-libs"], function (cb) {

    var files = glob.sync(__dirname + "/libs/common/pages/**/*.js");
    files.map(function (file) {
        var b = browserify(file, {
            insertGlobals: false
            //, paths: [__dirname + "/libs"]
        });
        config.external.forEach(function (ex) {
            b.external(ex);
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

gulp.task("default", ["watching"]);