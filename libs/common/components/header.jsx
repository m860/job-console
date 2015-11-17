/**
 * Created by hai.ma on 2015/10/21 0021.
 */
//var React = require("react");
//var ReactDom = require("react-dom");
var React = require("react");
var ReactDom = require("react-dom");
var classNames = require("classnames");
var ws=require("libs/frontend/web_socket");

module.exports = React.createClass({
    displayName: "Header",
    componentWillUnmount: function () {
        ws.off("session_change", this.$sessionChange);
    },
    $sessionChange: function (data) {
        this.setState(data);
    },
    getInitialState: function () {
        ws.on("session_change", this.$sessionChange);
        return {
            id: "",
            count: 0
        };
    },
    render: function () {
        return (
            <header>
                <img src="/images/nodejs-green.png" style={{height:"60px"}}/>
                <span>NodeJS Job Console</span>

                <div className={classNames("pull-right")} style={{marginRight:"20px"}}>
                    <span style={{marginRight:"10px"}}>ID : {this.state.id}</span>
                    <span>online : {this.state.count}</span>
                </div>
            </header>
        );
    }
});