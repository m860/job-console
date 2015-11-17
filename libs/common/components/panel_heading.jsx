/**
 * Created by hai.ma on 2015/10/21 0021.
 */
//var React = require("react");
//var ReactDom = require("react-dom");
var React = require("react");
var ReactDom = require("react-dom");
var classNames = require("classnames");
var classes = classNames("panel panel-default");
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

                <div className={classNames("pull-right")}>
                    <button className={classNames("btn")}><i className={classNames("fa fa-upload")}></i> 上传</button>
                </div>
            </div>
        );
    }
});