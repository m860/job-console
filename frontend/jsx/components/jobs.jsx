/**
 * Created by hai.ma on 2015/10/21 0021.
 */
var React = require("react");
var ReactDom = require("react-dom");
var classNames = require("classnames");
var ws = require("web_socket");


var JobListItem = React.createClass({
    displayName:"Job",
    componentWillReceiveProps: function (props) {
        this.setState({
            data: props.data
        });
    },
    $sendDirective: function (method) {
        ws.emit("job_directive", {
            name: method,
            args: [this.state.data.fileName]
        });
    },
    propTypes: {
        data: React.PropTypes.object.isRequired
    },
    getInitialState: function () {

        return {
            data: this.props.data
        }
    },
    render: function () {
        var statusStyle = {
            fontWeight: "bold"
        };
        if (this.state.data.status === 0) {
            statusStyle.color = "red";
        }
        else {
            statusStyle.color = "green";
        }
        return (
            <tr>
                <td>{this.state.data.name}</td>
                <td>{this.state.data.roleText}</td>
                <td>{this.state.data.desc}</td>
                <td style={statusStyle}>{this.state.data.statusText}</td>
                <td>
                    <button className={classNames("btn btn-default",{"hide":this.state.data.status===1})}
                            onClick={this.$sendDirective.bind(this,"start")}><i
                        className={classNames("fa fa-play")}></i></button>
                    <button
                        className={classNames("btn btn-default",{"hide":this.state.data.role===1 || this.state.data.status===0})}
                        onClick={this.$sendDirective.bind(this,"stop")}><i className={classNames("fa fa-stop")}></i>
                    </button>
                </td>
            </tr>
        );
    }
});
module.exports = React.createClass({
    displayName:"Jobs",
    componentWillUnmount: function () {
        ws.off("job_monitor", this.$jobChange);
    },
    $jobChange: function (data) {
        this.setState({
            jobs: data
        });
    },
    getInitialState: function () {
        ws.on("job_monitor", this.$jobChange);
        return {
            jobs: []
        };
    },
    render: function () {
        return (
            <table className={classNames("table")}>
                <thead>
                <tr>
                    <th style={{width:"200px"}}>job name</th>
                    <th style={{width:"200px"}}>job role</th>
                    <th>desc</th>
                    <th style={{width:"100px"}}>status</th>
                    <th style={{width:"100px"}}>operation</th>
                </tr>
                </thead>
                <tbody>
                {this.state.jobs.map(function (item) {
                    return <JobListItem key={item.key} data={item}/>
                    })}
                </tbody>
            </table>
        );
    }
});
