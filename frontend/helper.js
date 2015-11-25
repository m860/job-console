/**
 * Created by hai.ma on 2015/11/25 0025.
 */

var q = require("q");

exports.uploadFile = function (url, file, headers) {
    var deferred = q.defer();

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState == 4 && this.status == 200) {
            deferred.resolve(this.responseText);
        }
    }, false);

    xhr.addEventListener("error", function () {
        if (this.readyState == 4 && this.status == 200) {
            deferred.reject(this, file);
        }
    }, false);

    var formData = new FormData();
    xhr.open("POST", url, true);
    if (headers) {
        for (var key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }
    }
    formData.append("file", file);
    xhr.send(formData);

    return deferred.promise;
};