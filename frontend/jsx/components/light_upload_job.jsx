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
var InputFile = require("bootstrap/input_file");

var helper = require("helper");


module.exports = React.createClass({
    displayName: "LightUploadJob",
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
        var formData = helper.cloneObject(this.state);
        helper.request("post", config.uploadUrl, formData).then(function(){
            this.$hide();
        }.bind(this));
    },
    getInitialState: function () {
        return {
            file: null
        };
    },
    render: function () {
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
