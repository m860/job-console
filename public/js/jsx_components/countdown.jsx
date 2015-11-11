/**
 * Created by hai.ma on 2015/10/21 0021.
 */
define(["react", "react-dom","util"], function (React,ReactDom,util) {
    var Countdown = React.createClass({
        componentDidMount: function () {
            this.$run();
        },
        $run: function () {
            var newTime = this.state.time - this.state.duration;
            var id;
            if (newTime < 1000) {
                //
                if (this.state.id) {
                    clearTimeout(this.state.id);
                }
                this.props.oncomplete();
            }
            else {
                id = setTimeout(this.$run, this.state.duration);
            }
            this.props.onstep(newTime);
            this.setState({
                time: newTime
                , id: id
            });
        },
        getTimeString: function () {
            var hour = Math.floor(this.state.time / (60 * 60 * 1000));
            var minute = Math.floor(this.state.time / (60 * 1000));
            var second = Math.floor(this.state.time / (1000));
            return ("00" + hour).slice(-2) + ":" + ("00" + minute).slice(-2) + ":" + ("00" + second).slice(-2);
        },
        componentWillUnmount: function () {
            if (this.state.id) {
                clearTimeout(this.state.id);
            }
        },
        getDefaultProps: function () {
            return {
                duration: 1000
                , oncomplete: util.noop
                , onstep: util.noop
            }
        },
        propTypes: {
            time: React.PropTypes.number.isRequired
            , duration: React.PropTypes.number
            , complete: React.PropTypes.func
            , id: React.PropTypes.number
        },
        getInitialState: function () {
            return {
                time: this.props.time
                , duration: this.props.duration
            }
        },
        render: function () {
            return (
                <div>
                    {this.getTimeString()}
                </div>
            );
        }
    });
    return Countdown;
});