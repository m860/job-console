var gulp = require("gulp");
var babel = require("gulp-babel");
var livereload = require("gulp-livereload");
var merge = require('merge-stream');
var nodemon = require('gulp-nodemon');
var less = require("gulp-less");
var browserify = require("gulp-browserify");

gulp.task("compile-jsx", function (callback) {
    return merge(
        gulp.src(__dirname + "/public/js/jsx_components/**/*.jsx").pipe(babel()).pipe(gulp.dest(__dirname + "/public/js/components"))
        , gulp.src(__dirname + "/public/js/jsx_pages/**/*.jsx").pipe(babel()).pipe(gulp.dest(__dirname + "/public/js/pages"))
    );
});

gulp.task("less", function () {
    return gulp.src(__dirname + "/public/less/**/*.less").pipe(less()).pipe(gulp.dest(__dirname + "/public/css"));
});

gulp.task("browserify", function () {
    return gulp.src(__dirname + "/react/**/*.jsx").pipe(babel())
        .pipe(gulp.dest(__dirname + "/react"))
        .on("end", function () {
            return gulp.src(__dirname + "/public/js/test/**/*.jsx")
                .pipe(babel())
                .pipe(browserify())
                .pipe(gulp.dest(__dirname + "/public/js/browserify"));
        });
});

gulp.task("watching", function (callback) {

    livereload.listen();

    nodemon({
        script: 'app.js'
        , ext: 'js'
        , ignore: ["node_modules/**", "public/**", "views/**"]
        , env: {'NODE_ENV': 'development'}
    });

    gulp.watch(__dirname + "/public/js/jsx_components/**/*.jsx", function (event) {
        gulp.src(event.path)
            .pipe(babel())
            .pipe(gulp.dest(__dirname + "/public/js/components"))
            .pipe(livereload());
    });

    gulp.watch(__dirname + "/public/js/jsx_pages/**/*.jsx", function (event) {
        gulp.src(event.path)
            .pipe(babel())
            .pipe(gulp.dest(__dirname + "/public/js/pages"))
            .pipe(livereload());
    });

    gulp.watch(__dirname + "/public/less/**/*.less", function (event) {
        gulp.src(event.path).pipe(less()).pipe(gulp.dest(__dirname + "/public/css")).pipe(livereload());
    });

    gulp.watch(__dirname + "/views/**/*.handlebars", function (event) {
        gulp.src(event.path).pipe(livereload());
    });
});

gulp.task("default", ["compile-jsx", "less", "browserify", "watching"]);