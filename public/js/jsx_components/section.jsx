/**
 * Created by hai.ma on 2015/10/21 0021.
 */
define(["react", "react-dom"], function (React) {
    var Section = React.createClass({
        render: function () {
            return (
                <section>{this.props.children}</section>
            );
        }
    });
    return Section;
});