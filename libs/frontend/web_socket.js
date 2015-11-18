/**
 * Created by hai.ma on 2015/11/17 0017.
 */
var io = require("socket.io-client");
var helper = require("libs/common/helper");

var ws;
if (helper.isNode()) {
    var noop = new Function();
    ws = {
        on: noop,
        off: noop
    };
}
else {
    ws = io();
    ws.off = ws.removeListener;
}


module.exports = ws;