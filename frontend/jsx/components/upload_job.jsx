/**
 * Created by hai.ma on 2015/10/21 0021.
 */
var React = require("react");
var ReactDom = require("react-dom");
var Modal = require("bootstrap/modal");
var ModalBody = require("bootstrap/modal_body");
var ModalFooter = require("bootstrap/modal_footer");

module.exports = React.createClass({
    displayName: "UploadJob",
    $show: function () {
        this.refs["modal"].$show();
    },
    $hide: function () {
        this.refs["modal"].$hide();
    },
    render: function () {
        return (
            <Modal ref="modal" title="Upload Form">
                <ModalBody>
                    hello
                </ModalBody>
                <ModalFooter>
                    world
                </ModalFooter>
            </Modal>
        );
    }
});