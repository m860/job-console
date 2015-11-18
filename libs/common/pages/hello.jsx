/**
 * Created by hai.ma on 2015/11/16 0016.
 */
var React = require("react");
var ReactDom = require("react-dom");
var Hello = require("libs/common/components/hello_world");
var Header = require("libs/common/components/header");

ReactDom.render(
    <div>
        <Header/>
        <Hello/>
    </div>
    , document.getElementById("view")
);