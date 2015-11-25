/**
 * Created by hai.ma on 2015/11/25 0025.
 */
var nedb = require("nedb");

module.exports = function (tableName) {
    return new nedb({filename: __dirname + "/../../../data/" + tableName, autoload: true});
};