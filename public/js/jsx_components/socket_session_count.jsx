/**
 * Created by hai.ma on 2015/10/21 0021.
 */
define(["react", "react-dom", "ws"], function (React, ReactDom, ws) {
    var SocketSessionCount = React.createClass({
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
    return SocketSessionCount;
});