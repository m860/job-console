/**
 * Created by hai.ma on 2015/10/21 0021.
 */
//var React = require("react");
//var ReactDom = require("react-dom");
var React = require("react");
var ReactDom = require("react-dom");
var classNames = require("classnames");
var JobList=require("libs/common/components/job_list");

module.exports = React.createClass({
    displayName: "JobPanel",
    propTypes: {
        title: React.PropTypes.string
    },
    getInitialState: function () {
        return {
            title: this.props.title
        };
    },
    render: function () {
        return (
            <div class={classNames("panel panel-default")}>
                <div class={classNames("panel-heading clearfix")}>
                    <span>{this.state.title}</span>

                    <div class={classNames("pull-right")}>
                        <button class={classNames("btn")}><i className={classNames("fa fa-upload")}></i> 上传</button>
                    </div>
                </div>
                <div class={classNames("panel-body")}>
                    <JobList/>
                </div>
            </div>
        );
    }
});