/**
 * Created by hai.ma on 2015/10/21 0021.
 */
var React = require("react");
var ReactDom = require("react-dom");
var ReactAddons = require("react-addons");
var classNames = require("classnames");
var config = require("config");


var Modal = require("bootstrap/modal");
var ModalBody = require("bootstrap/modal_body");
var ModalFooter = require("bootstrap/modal_footer");
var TaskTrigger = require("components/task_trigger");
var InputFile = require("bootstrap/input_file");

var helper = require("helper");


module.exports = React.createClass({
    displayName: "UploadJob",
    mixins: [ReactAddons.addons.LinkedStateMixin],
    $show: function () {
        this.refs["modal"].$show();
    },
    $hide: function () {
        this.refs["modal"].$hide();
    },
    $updateTrigger: function (newValue) {
        this.setState({trigger: newValue});
    },
    $submit: function () {
        var fd = helper.cloneObject(this.state);
        helper.request("post", config.uploadUrl, fd);
    },
    getInitialState: function () {
        return {
            name: "",
            trigger: {},
            role: 0,
            description: "",
            file: null
        };
    },
    render: function () {
        var triggerLink = {
            value: this.state.trigger || {
                hour: [],
                minute: [],
                second: []
            },
            requestChange: this.$updateTrigger
        };
        var fileLink = {
            value: null,
            requestChange: function (newValue) {
                if (newValue.length > 0) {
                    this.setState({file: newValue[0]});
                }
            }.bind(this)
        };
        return (
            <Modal ref="modal" title="Upload Job">
                <ModalBody>
                    <form>
                        <div className={classNames("form-group")}>
                            <label>Name</label>
                            <input type="text" valueLink={this.linkState("name")}
                                   className={classNames("form-control")}/>
                        </div>
                        <div className={classNames("form-group")}>
                            <label>Role</label>
                            <select className={classNames("form-control")} valueLink={this.linkState("role")}>
                                <option value="0">Job</option>
                                <option value="1">Function</option>
                            </select>
                        </div>
                        <div className={classNames("form-group")}>
                            <label>Trigger</label>
                            <TaskTrigger valueLink={triggerLink}/>
                        </div>
                        <div className={classNames("form-group")}>
                            <label>Description</label>
                            <textarea className={classNames("form-control")}
                                      valueLink={this.linkState("description")}></textarea>
                        </div>
                        <div className={classNames("form-group")}>
                            <label>File</label>
                            <InputFile valueLink={fileLink}></InputFile>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className={classNames("btn btn-default")} onClick={this.$hide}>Cancel</button>
                    <button className={classNames("btn btn-primary")} onClick={this.$submit}>OK</button>
                </ModalFooter>
            </Modal>
        );
    }
});
