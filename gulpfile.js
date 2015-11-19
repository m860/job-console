var gulp = require("gulp");
var babel = require("gulp-babel");
var livereload = require("gulp-livereload");
var merge = require('merge-stream');
var nodemon = require('gulp-nodemon');
var less = require("gulp-less");
var wrap = require("gulp-wrap");
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var fs = require("fs");
var walk = require("walk");

var requirejsWraper = "define(function(require,exports,module){\n\n<%=contents%>\n\n});";

function compileJSX(stream) {
    return stream.pipe(babel())
        .pipe(wrap(requirejsWraper))
        .pipe(gulp.dest(__dirname + "/public/js"));
}
function wrapCommonJS(stream, dest) {
    return stream.pipe(wrap(requirejsWraper))
        .pipe(gulp.dest(dest || __dirname + "/public/js"));
}

gulp.task("compile-jsx", function (callback) {
    return compileJSX(gulp.src(__dirname + "/frontend/jsx/**/*.jsx"));
});

gulp.task("gen-requirejs-main", function () {
    var mainConfig = require(__dirname + "/frontend/main.json");
    mainConfig.packages = fs.readdirSync(__dirname + "/frontend/jsx");
    if (!mainConfig.paths) {
        mainConfig.paths = {};
    }

    var rootPath = __dirname + "/frontend";

    var walker = walk.walk(rootPath, {
        filters: ["jsx"]
    });

    function isJS(fileName) {
        return /\.js$/i.test(fileName);
    }

    function getFileName(fileName) {
        var lastIndex = fileName.lastIndexOf(".");
        return fileName.substring(0, lastIndex);
    }

    walker.on("file", function (root, stat, next) {
        if (isJS(stat.name)) {
            mainConfig.paths[getFileName(stat.name)] = (root.replace(rootPath, "") + "/" + stat.name).replace("\\", "/").substring(1);
        }
        next();
    });

    walker.on("end", function () {
        fs.writeFileSync(__dirname + "/public/js/main.js", "requirejs.config(" + JSON.stringify(mainConfig) + ");");
    });

});

gulp.task("gen-js", function () {
    return merge(
        wrapCommonJS(gulp.src(__dirname + "/frontend/**/*.js"))
        , wrapCommonJS(gulp.src(__dirname + "/enums/**/*.js"), __dirname + "/public/js/enums")
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

    gulp.watch(__dirname + "/public/less/**/*.less", function (event) {
        gulp.src(event.path).pipe(less()).pipe(gulp.dest(__dirname + "/public/css")).pipe(livereload());
    });

    gulp.watch(__dirname + "/views/**/*.handlebars", function (event) {
        gulp.src(event.path).pipe(livereload());
    });

    //watch main.json
    gulp.watch([
        __dirname + "/frontend/main.json"
        , __dirname + "/frontend/**/*.js"
    ], function (event) {
        gulp.run("gen-requirejs-main");
    });

    //watch jsx
    gulp.watch(__dirname + "/frontend/**/*.jsx", function (event) {
        compileJSX(gulp.src(event.path));
    });

    //watch js
    gulp.watch(__dirname + "/frontend/**/*.js", function (event) {
        wrapCommonJS(gulp.src(event.path));
    });
    gulp.watch(__dirname + "/enums/**/*.js", function (evnet) {
        wrapCommonJS(gulp.src(event.path), __dirname + "/public/js/enums");
    });


});

gulp.task("default", ["compile-jsx", "gen-requirejs-main", "gen-js", "less", "watching"]);