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

    return merge(
        gulp.src(__dirname + "/public/js/test/**/*.jsx")
            .pipe(babel())
            .pipe(browserify({
                nobuiltins:"events",
                shim: {
                    "react": {
                        path: __dirname + "/public/js/libs/react/react.js",
                        exports: "React"
                    }/*,
                     "react-dom": {
                     path: __dirname + "/public/js/libs/react/react-dom.js",
                     exports: "ReactDom"
                     }*/
                }
            }))
            .on('prebundle', function (bundle) {
                bundle.external('react');
                //bundle.external('react-dom');
            })
            .pipe(gulp.dest(__dirname + "/public/js/browserify"))
    );

});

gulp.task("build-react", function () {
    return gulp.src(__dirname + "/react/**/*.jsx")
        .pipe(babel())
        .pipe(gulp.dest(__dirname + "/react"));
});

gulp.task("watching", ["build-react", "less"], function (callback) {

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
    gulp.watch(__dirname + "/react/**/*.jsx", function (event) {
        console.log(event.path)
        gulp.src(event.path)
            .pipe(babel())
            .pipe(gulp.dest(__dirname + "/react"));
    });
});

gulp.task("default", ["watching"]);