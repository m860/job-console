/**
 * Created by hai.ma on 2015/10/21 0021.
 */
define(["react", "react-dom", "classnames"], function (React, ReactDom, classNames) {
    var PanelHeading = React.createClass({
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
    return PanelHeading;
});