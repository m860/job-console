/**
 * Created by hai.ma on 2015/10/21 0021.
 */
var React = require("react");
var ReactDom = require("react-dom");
var Hello=require("components/hello");

module.exports = React.createClass({
    displayName: "Hello",
    render: function () {
        return (
            <Hello/>
        );
    }
});

