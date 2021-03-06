/**
 * Created by hai.ma on 2015/10/20 0020.
 */
var express = require('express');
var exphbs = require('express-handlebars');
var requireDir = require('require-dir');
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var util = require("util");
var env = process.env.NODE_ENV || "development";
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

var config = require("./libs/common/config");

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/public", {
    maxAge: env === "production" ? 0 : 30 * 24 * 3600 * 1000,
    etag: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

//register controller
var controllers = requireDir("./controllers");
for (var controller in controllers) {
    controllers[controller](app);
}

//register io handler
var ioHandlers = requireDir("./socket_handlers");
for (var handler in ioHandlers) {
    ioHandlers[handler](io);
}
//start
http.listen(config.port, function () {
    console.log("please access http://127.0.0.1:" + config.port + " in browser");
});