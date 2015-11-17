/**
 * Created by hai.ma on 2015/10/21 0021.
 */
//var React = require("react");
//var ReactDom = require("react-dom");
var React = require("react");
var ReactDom = require("react-dom");
var ws = require("libs/frontend/web_socket");

module.exports = React.createClass({
    displayName: "SocketSessionCounter",
    componentWillUnmount: function () {
        ws.off("session_change", this.$sessionChange);
    },
    $sessionChange: function (data) {
        this.setState({
            count: data
        });
    },
    propTypes: {
        count: React.PropTypes.number
    },
    getInitialState: function () {
        ws.on("session_change", this.$sessionChange);

        return {
            count: 0
        };
    },
    render: function () {
        return (
            <div>session count : {this.state.count}</div>
        );
    }
});