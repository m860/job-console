/**
 * Created by hai.ma on 2015/10/21 0021.
 */

var React = require("react");
var ReactDom = require("react-dom");
var classNames = require("classnames");

module.exports = React.createClass({
    displayName:"PanelBody",
    render: function () {
        return (
            <div className={classNames("panel-body")}>{this.props.children}</div>
        );
    }
});