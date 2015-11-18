var gulp = require("gulp");
var babel = require("gulp-babel");
var livereload = require("gulp-livereload");
var merge = require('merge-stream');
var nodemon = require('gulp-nodemon');
var less = require("gulp-less");
var wrap=require("gulp-wrap");

gulp.task("compile-jsx", function (callback) {
    return merge(
        gulp.src(__dirname + "/public/js/jsx_components/**/*.jsx").pipe(babel()).pipe(gulp.dest(__dirname + "/public/js/components"))
        , gulp.src(__dirname + "/public/js/jsx_pages/**/*.jsx").pipe(babel()).pipe(gulp.dest(__dirname + "/public/js/pages"))
    );
});

gulp.task("less", function () {
    return gulp.src(__dirname + "/public/less/**/*.less").pipe(less()).pipe(gulp.dest(__dirname + "/public/css"));
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

gulp.task("wrap-commonjs",function(){
    return gulp.src(__dirname+"/enums/**/*.js")
        .pipe(wrap('define(function(require,exports,module){\n\n<%=contents%>\n\n});'))
        .pipe(gulp.dest(__dirname+"/public/js/dist"))
});

gulp.task("default", ["compile-jsx", "less", "watching"]);