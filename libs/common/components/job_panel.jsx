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
    render: function () {
        return (
            <div className={classNames("panel panel-default")}>
                <div className={classNames("panel-heading clearfix")}>
                    <span>Job List</span>

                    <div className={classNames("pull-right")}>
                        <button className={classNames("btn")}><i className={classNames("fa fa-upload")}></i> 上传</button>
                    </div>
                </div>
                <div className={classNames("panel-body")}>
                    <JobList/>
                </div>
            </div>
        );
    }
});