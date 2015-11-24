/**
 * Created by hai.ma on 2015/10/29 0029.
 */
exports.formatTime = function (ms, fmt) {
    var second = (Math.floor(ms / 1000)) % 60;
    var minute = (Math.floor(ms / (60 * 1000))) % 60;
    var hour = Math.floor(ms / (60 * 60 * 1000));
    return fmt.replace("$h", hour).replace("$m", minute).replace("$s", second);
};

exports.sendMessage = function (socket, messageType, data, isAll) {
    if (socket && messageType) {
        socket.emit(messageType, data);
        if (isAll) {
            socket.broadcast.emit(messageType, data);
        }
    }
};