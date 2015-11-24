/**
 * Created by hai.ma on 2015/11/18 0018.
 */
var io = require("socket.io");
var ws = io();
ws.off = ws.removeListener;
var messageType = require("enums/message_type");

ws.$execJob = function (method, fileName) {
    ws.emit(messageType.JobDirective, {
        name: method,
        args: [fileName]
    });
};


module.exports = ws;