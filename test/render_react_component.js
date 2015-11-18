/**
 * Created by hai.ma on 2015/11/18 0018.
 */

var test = require("unit.js");
var ReactAddons = require("react/addons");
var ReactDOMServer = require("react-dom/server");
var Header = ReactAddons.createFactory(require("libs/common/components/header"));
var HelloWorld = ReactAddons.createFactory(require("libs/common/components/hello_world"));

describe("render react component", function () {

    it("render hello world", function () {
        console.log(ReactDOMServer.renderToString(HelloWorld()));
    });

    it("render header", function () {
        console.log(ReactDOMServer.renderToString(Header()));
    });
});