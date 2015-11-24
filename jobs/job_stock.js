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
    name: "fetch stock data",
    callback: function () {
        return fetchData({
            symbol: 'AAPL',
            from: '2012-01-01',
            to: '2012-12-31'
        }).then(function(quotes){
            console.log(quotes);
        });
    },
    desc: "fetch stock data"
};
