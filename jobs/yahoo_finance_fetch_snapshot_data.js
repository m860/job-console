var finance = require("yahoo-finance");
var q = require("q");

function fetchData(ops) {
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
}


module.exports = {
    name: "[Yahoo-finance] snapshot",
    callback: function () {
        return fetchData({
            //symbol: '600000.SS',
            symbol: '000861.SZ',
            from: '2015-01-01',
            to: '2015-9-31'
        }).then(function(quotes){
            console.log(quotes);
        });
    },
    desc: "fetch stock data"
};
