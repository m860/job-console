/**
 * Created by hai.ma on 2015/10/21 0021.
 */

var React = require("react");
var ReactDom = require("react-dom");
var classNames = require("classnames");


module.exports = React.createClass({
    displayName: "InputFile",
    $onChange:function(event){
        var valueLink=this.props.valueLink;
        valueLink.requestChange(event.target.files);
    },
    render: function () {
        return (
            <input type="file" className={classNames("form-control")} onChange={this.$onChange}/>
        );
    }
});