/**
 * Created by hai.ma on 2015/10/22 0022.
 */

var messageType = require("../enums/message_type");
var fs = require("fs");

function onJobChange(data) {
    console.log("job change : ", data);
    if (data) {
        switch (data.action) {
            case "del":
                fs.unlink(__dirname + "/../jobs/" + data.fileName + ".js", function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
                break;
        }
    }
}

module.exports = function (io) {
    io.on("connect", function (socket) {

        //register delete event
        socket.on(messageType.JobChange, onJobChange);

        socket.on("disconnect", function () {
            socket.removeListener(messageType.JobChange, onJobChange);
        });

    });
};