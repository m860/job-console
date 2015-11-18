/**
 * Created by hai.ma on 2015/11/16 0016.
 */
var React = require("react");
var ReactDom = require("react-dom");
var Hello = require("libs/common/components/hello_world");
var Header = require("libs/common/components/header");
var helper = require("libs/common/helper");

var Page = React.createClass({
    displayName: "Page",
    render: function () {
        return (
            <div>
                <Header/>
                <Hello/>
            </div>
        );
    }
});
if (helper.isNode()) {
    module.exports = Page;
}
else {
    ReactDom.render(
        <Page/>
        , document.getElementById("view")
    );
}
