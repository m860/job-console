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

module.exports = React.createClass({
    displayName: "JobsPanel",
    render: function () {
        return (
            <Panel>
                <PanelHeading title="Jobs"/>
                <PanelBody>
                    <Jobs/>
                </PanelBody>
            </Panel>
        );
    }
});