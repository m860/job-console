/**
 * Created by hai.ma on 2015/10/21 0021.
 */
var React = require("react");
var ReactDom = require("react-dom");
var classNames = require("classnames");
var ws = require("web_socket");
var Header = require("components/header");
var JobsPanel = require("components/jobs_panel");


module.exports = React.createClass({
    displayName: "Index",
    render: function () {
        return (
            <div>
                <Header/>
                <JobsPanel/>
            </div>
        );
    }
});

