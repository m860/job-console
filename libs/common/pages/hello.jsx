/**
 * Created by hai.ma on 2015/11/16 0016.
 */
var React=require("react");
var ReactDom=require("react-dom");
var Hello=require("../../components/hello_world");

ReactDom.render(
    <Hello/>
    , document.getElementById("view")
);