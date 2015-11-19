/**
 * Created by hai.ma on 2015/11/18 0018.
 */
var io = require("socket.io");
var ws = io();
ws.off = ws.removeListener;

module.exports = ws;