/**
 * Created by hai.ma on 2015/10/21 0021.
 */

var React = require("react");
var ReactDom = require("react-dom");
var classNames = require("classnames");


module.exports = React.createClass({
    displayName: "Modal",
    propTypes: {
        title: React.PropTypes.string,
        isShow: React.PropTypes.bool
    },
    getInitialState: function () {
        return {
            title: this.props.title
            , isShow: false
        }
    },
    $show: function () {
        this.setState({isShow: true});
    },
    $hide: function () {
        this.setState({isShow: false});
    },
    render: function () {
        return (
            <div className={classNames("modal")} style={{display:this.state.isShow?"block":"none"}}>
                <div className={classNames("modal-dialog")}>
                    <div className={classNames("modal-content")}>
                        <div className={classNames("modal-header")}>
                            <button className={classNames("close")} onClick={this.$hide}><span>×</span></button>
                            <h4 className={classNames("modal-title")}>{this.state.title}</h4>
                        </div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});