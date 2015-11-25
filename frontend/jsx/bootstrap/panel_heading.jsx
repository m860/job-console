/**
 * Created by hai.ma on 2015/10/21 0021.
 */

var React = require("react");
var ReactDom = require("react-dom");
var classNames = require("classnames");

module.exports = React.createClass({
    displayName: "PanelHeading",
    propTypes: {
        title: React.PropTypes.string
    },
    getInitialState: function () {
        return {
            title: this.props.title
        }
    },
    render: function () {
        var classes = classNames("panel-heading clearfix");
        return (
            <div className={classes}>
                <span>{this.state.title}</span>
                {this.props.children}
            </div>
        );
    }
});