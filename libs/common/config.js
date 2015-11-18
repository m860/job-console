/**
 * Created by hai.ma on 2015/11/13 0013.
 */
var env = process.env.NODE_ENV || "development";
module.exports = require("../../config/" + env);