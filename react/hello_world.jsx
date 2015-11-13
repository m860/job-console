/**
 * Created by hai.ma on 2015/10/21 0021.
 */
//var React = require("react");
//var ReactDom = require("react-dom");
require("../react/main");

module.exports = global.React.createClass({
    displayName: "Hello",
    render: function () {
        return (
            <div>hello world !</div>
        );
    }
});