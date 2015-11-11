/**
 * Created by hai.ma on 2015/10/21 0021.
 */
define((["react", "react-dom", "classnames", "util"]), function (React, ReactDom, ClassNames, util) {
    var Link = React.createClass({
        componentWillUnmount: function () {
            if (this.$ele) {
                this.$ele.removeEventListener("click", this.$go, false);
                delete this.$ele;
            }
        },
        $go: function (event) {
            event.preventDefault();
            if (this.state.href) {
                require([this.state.href], function (fn) {
                    fn();
                    this.props.onload();
                }.bind(this));
            }
        },
        componentDidMount: function () {
            this.$ele = ReactDom.findDOMNode(this);
            this.$ele.addEventListener("click", this.$go, false);
        },
        propTypes: {
            text: React.PropTypes.string
            , href: React.PropTypes.string
            , className: React.PropTypes.object
            , style: React.PropTypes.object
            , onload: React.PropTypes.func
        },
        getDefaultProps: function () {
            return {
                onload: util.noop
            };
        },
        getInitialState: function () {
            return {
                text: this.props.text
                , href: this.props.href
                , style: this.props.style
            }
        },
        render: function () {
            var classes = ClassNames(this.props.className);
            return (
                <a href={this.state.href} style={this.state.style}
                   className={classes}>{this.state.text}</a>
            );
        }
    });
    return Link;
});