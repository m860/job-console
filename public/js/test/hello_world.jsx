/**
 * Created by hai.ma on 2015/10/21 0021.
 */
var React = require("react");
var ReactDom = require("react-dom");
var Hello = require("../../../react/hello_world");

ReactDom.render(
    <Hello/>
    , document.getElementById("view")
);