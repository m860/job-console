/**
 * Created by hai.ma on 2015/11/25 0025.
 */

var q = require("q");

exports.request = function (type, url, data, headers) {
    var deferred = q.defer();

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState == 4 && this.status == 200) {
            deferred.resolve(this.responseText, this);
        }
    }, false);

    xhr.addEventListener("error", function () {
        deferred.reject(this);
    }, false);

    var formData = new FormData();
    xhr.open(type.toUpperCase(), url, true);
    if (headers) {
        for (var key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }
    }

    if (data) {
        for (var key in data) {
            formData.append(key, data[key]);
        }
    }

    xhr.send(formData);

    return deferred.promise;
};

exports.cloneObject = function (obj) {
    var copy;

    if(obj instanceof File) return obj;
    if(obj instanceof FileList) return obj;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = exports.cloneObject(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = exports.cloneObject(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};