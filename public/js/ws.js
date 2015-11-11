/**
 * Created by hai.ma on 2015/10/22 0022.
 */
define(["io"], function (io) {
    var ws = io();
    ws.off = ws.removeListener;
    //ws.on("session_change", function (data) {
    //    console.log(data);
    //});
    return ws;
});