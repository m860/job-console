/**
 * Created by hai.ma on 2015/10/21 0021.
 */
var React = require("react");
var ReactDom = require("react-dom");
var classNames=require("classnames");
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
                    <form>
                        <div className={classNames("form-group")}>
                            <label>Name</label>
                            <input type="text" className={classNames("form-control")}/>
                        </div>
                        <div className={classNames("form-group")}>
                            <label>Role</label>
                            <select className={classNames("form-control")}>
                                <option value="0">Job</option>
                                <option value="1">Function</option>
                            </select>
                        </div>
                        <div className={classNames("form-group")}>
                            <label>Description</label>
                            <textarea className={classNames("form-control")}></textarea>
                        </div>
                        <div className={classNames("form-group")}>
                            <label>File</label>
                            <input type="file" className={classNames("form-control")}/>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className={classNames("btn btn-default")} onClick={this.$hide}>Cancel</button>
                    <button className={classNames("btn btn-primary")}>OK</button>
                </ModalFooter>
            </Modal>
        );
    }
});
