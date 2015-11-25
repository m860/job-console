/**
 * Created by hai.ma on 2015/10/21 0021.
 */

var React = require("react");
var ReactDom = require("react-dom");
var classNames = require("classnames");


module.exports = React.createClass({
    displayName: "Modal",
    propTypes: {
        title: React.PropTypes.string
    },
    getInitialState: function () {
        return {
            title: this.props.title
        }
    },
    render: function () {
        return (
            <div className={classNames("modal")}>
                <div className={classNames("modal-dialog")}>
                    <div className={classNames("modal-content")}>
                        <div className={classNames("modal-header")}>
                            <button className={classNames("close")}><span>×</span></button>
                            <h4 className={classNames("modal-title")}>{this.state.title}</h4>
                        </div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});