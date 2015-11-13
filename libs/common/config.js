/**
 * Created by hai.ma on 2015/11/13 0013.
 */
var env = process.env.NODE_ENV || "develop";

var util = require("util");

module.exports = require(util.format("../../config/%s", env));