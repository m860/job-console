/**
 * Created by hai.ma on 2015/10/21 0021.
 */
var React = require("react");
var ReactDom = require("react-dom");
var classNames = require("classnames");

var Timer = React.createClass({
    displayName: "Timer",
    propTypes: {
        type: React.PropTypes.string.isRequired,
        values: React.PropTypes.array
    },
    getInitialState: function () {
        return {
            type: this.props.type || "minute",
            values: []
        };
    },
    $getTitle: function () {
        switch (this.state.type) {
            case "second":
                return "Second";
            case "minute":
                return "Minute";
            default:
                return "Hour";
        }
    },
    $hasValue: function (value) {
        for (var i = 0; i < this.state.values.length; i++) {
            if (this.state.values[i] == value) {
                return true;
            }
        }
        return false;
    },
    $getValue: function () {
        var result = {};
        result[this.state.type] = this.state.values;
        return result;
    },
    $triggerChange: function () {
        if (this.props.onChange) {
            this.props.onChange();
        }
    },
    $addValue: function (event) {
        if (event.keyCode == 13) {
            var value = event.target.value;
            if (!this.$hasValue(value)) {
                this.state.values.push(value);
                this.forceUpdate(function () {
                    event.target.value = "";
                    this.$triggerChange();
                }.bind(this));
            }
        }

    },
    $delValue: function (value) {
        for (var i = 0; i < this.state.values.length; i++) {
            if (this.state.values[i] == value) {
                this.state.values.splice(i, 1);
                this.forceUpdate(function () {
                    this.$triggerChange();
                }.bind(this));
                break;
            }
        }
    },

    render: function () {
        var items = this.state.values.map(function (value, index) {
            return <li key={index}>{value}<a href="javascript:void(0)" onClick={this.$delValue.bind(this,value)}
                                             className={classNames("pull-right")}><i
                className={classNames("fa fa-trash-o")}></i></a></li>
        }.bind(this));
        return (
            <div className={classNames("col-xs-4")}>
                <label>
                    {this.$getTitle()}</label>
                <ul className={classNames("task-trigger-times")}>
                    {items}
                    <li><input type="text" className={classNames("form-control")} onKeyDown={this.$addValue}/>
                    </li>
                </ul>
            </div>
        );
    }
});

module.exports = React.createClass({
    displayName: "TaskTrigger",
    $getValue: function () {
        var result = {
            hour: this.refs["hour"].$getValue().hour
            , minute: this.refs["minute"].$getValue().minute
            , second: this.refs["second"].$getValue().second
        };
        return result;
    },
    $getValueLink: function (props) {
        console.log(props);
        return {
            value: props.valueLink.value,
            requestChange: props.valueLink.requestChange
        };
    },
    $onTimerChange: function () {
        var valueLink = this.$getValueLink(this.props);
        valueLink.requestChange(this.$getValue());
    },
    render: function () {
        return (
            <div className={classNames("row")}>
                <Timer type="hour" ref="hour" onChange={this.$onTimerChange}/>
                <Timer type="minute" ref="minute" onChange={this.$onTimerChange}/>
                <Timer type="second" ref="second" onChange={this.$onTimerChange}/>
            </div>
        );
    }
});