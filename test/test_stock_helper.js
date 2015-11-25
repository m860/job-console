/**
 * Created by hai.ma on 2015/11/25 0025.
 */
var test = require("unit.js");
var stockHelper = require("../libs/business/stock_helper");
var stockSymbol = require("../libs/common/db_table")("stock_symbol");

describe("stock_helper", function () {

    it("fetch all stock code of A", function () {

        stockHelper.fetchAllStocks().then(function (data) {
            stockSymbol.insert(data);
        });

    });

    it("fetch history over date", function () {

        stockHelper.fetchHistory({
            symbol: "300371.SZ"
            , from: "1990-1-1"
            , to: "1990-12-1"
        }).then(function (data) {
            console.log(data);
        });

    });

    it("fetch snapshot", function () {

        stockHelper.fetchSnapshot({
            symbol: "300443.SZ"
        }).then(function (data) {
            console.log(data)
        });

    });

});