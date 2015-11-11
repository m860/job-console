/**
 * Created by hai.ma on 2015/10/21 0021.
 */
define(["react", "react-dom", "classnames"], function (React, ReactDom, classNames) {
    var PanelBody = React.createClass({
        render: function () {
            return (
                <div className={classNames("panel-body")}>{this.props.children}</div>
            );
        }
    });
    return PanelBody;
});