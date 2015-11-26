/**
 * Created by hai.ma on 2015/10/21 0021.
 */
var React = require("react");
var ReactDom = require("react-dom");
var classNames = require("classnames");

var Panel = require("bootstrap/panel");
var PanelHeading = require("bootstrap/panel_heading");
var PanelBody = require("bootstrap/panel_body");
var Jobs = require("components/jobs");

var helper = require("helper");
var UploadJob = require("components/upload_job");

module.exports = React.createClass({
    displayName: "JobsPanel",
    componentWillUnmount: function () {
        if (this._btnUpload) {
            this._btnUpload.removeEventListener("click", this.$showUpload);
        }
    },
    $showUpload: function () {
        this.refs["uploadJob"].$show();
    },
    $hideUpload: function () {
        this.refs["uploadJob"].$hide();
    },
    componentDidMount: function () {
        if (!this._btnUpload) {
            this._btnUpload = ReactDom.findDOMNode(this).querySelector("#btnUpload");
        }
        this._btnUpload.addEventListener("click", this.$showUpload);
    },
    render: function () {
        return (
            <section>
                <Panel>
                    <PanelHeading title="Jobs">
                        <button id="btnUpload" className={classNames("pull-right btn")}><i
                            className={classNames("fa fa-upload")}></i>
                            Upload Job
                        </button>
                    </PanelHeading>
                    <PanelBody>
                        <Jobs/>
                    </PanelBody>
                </Panel>
                <UploadJob ref="uploadJob"/>
            </section>
        );
    }
});