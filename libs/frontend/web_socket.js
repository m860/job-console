/**
 * Created by hai.ma on 2015/11/17 0017.
 */
var io = require("socket.io-client");

var ws = io();
ws.off = ws.removeListener;

module.exports = ws;