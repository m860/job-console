/**
 * Created by hai.ma on 2015/11/13 0013.
 */
var env = process.env.NODE_ENV || "development";

var commonConfig = require("../../config/common");

var envConfig = require("../../config/" + env);

for (var property in commonConfig) {

    envConfig[property] = commonConfig[property];

}

module.exports = envConfig;