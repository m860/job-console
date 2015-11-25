/**
 * Created by hai.ma on 2015/11/25 0025.
 */
var finance = require("yahoo-finance");
var q = require("q");
var request = require("request-promise");

exports.fetchHistory = function (ops) {
    var deferred = q.defer();
    finance.historical(ops, function (err, quotes) {
        if (err) {
            deferred.reject(err);
        }
        else {
            deferred.resolve(quotes);
        }
    });
    return deferred.promise;
};

exports.fetchSnapshot = function (ops) {
    var deferred = q.defer();
    finance.snapshot(ops, function (err, snapshots) {
        if (err) {
            deferred.reject(err);
        }
        else {
            deferred.resolve(snapshots);
        }
    });
    return deferred.promise;
};

//get all stock code of A
exports.fetchAllStocks = function () {
    return request({
        uri: "http://ctxalgo.com/api/stocks"
        , json: true
    }).then(function (data) {
        function toYahooSymbol(code) {
            if (/^sh[0-9]*$/i.test(code)) {
                return code.replace("sh", "") + ".SS";
            }
            else if (/^sz[0-9]*$/i.test(code)) {
                return code.replace("sz", "") + ".SZ";
            }
            else {
                return code;
            }
        }

        var result = [];
        for (var code in data) {
            result.push({
                symbol: toYahooSymbol(code)
                , name: data[code]
            });
        }

        return result;
    });
};