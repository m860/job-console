/**
 * Created by hai.ma on 2015/11/13 0013.
 */
var env = process.env.NODE_ENV || "development";

var util = require("util");
var path = require("path");

//var configPath = path.normalize(__dirname + util.format("../../../config/%s", env));

module.exports = require("libs/config/"+env);