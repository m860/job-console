/**
 * Created by hai.ma on 2015/10/22 0022.
 */

var messageType = require("../enums/message_type");
var guid = require("guid");
var sessionCount = 0;
module.exports = function (io) {


    io.on("connect", function (socket) {
        socket.$id = guid.raw();
        sessionCount++;
        socket.emit(messageType.SessionChange, {
            count: sessionCount,
            id: socket.$id
        });
        socket.broadcast.emit(messageType.SessionChange, {count: sessionCount});

        socket.on("disconnect", function () {
            sessionCount--;
            socket.broadcast.emit(messageType.SessionChange, {count: sessionCount});
        });

    });
};