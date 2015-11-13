/**
 * Created by hai.ma on 2015/11/13 0013.
 */
var log4js = require("log4js");
var config = require("../common/config").log4js;
log4js.configure(config);
module.exports = function (category) {
    var logger = log4js.getLogger(category || "default");
    logger.setLevel(config.level);
    return logger;
};