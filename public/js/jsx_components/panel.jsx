/**
 * Created by hai.ma on 2015/10/21 0021.
 */
define(["react", "react-dom","classnames"], function (React,ReactDom,classNames) {
    var classes=classNames("panel panel-default");
    var Panel = React.createClass({
        render: function () {
            return (
                <div className={classes}>{this.props.children}</div>
            );
        }
    });
    return Panel;
});