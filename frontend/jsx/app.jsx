/**
 * Created by hai.ma on 2015/10/21 0021.
 */
require("routie");
var React = require("react");
var ReactDom = require("react-dom");
var view = document.getElementById("view");

var Root = React.createClass({
    displayName: "Root",
    render: function () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});

routie('*', function (hash) {

    var path = hash;

    var pagePath;
    if (path === "" || path === "\/") {
        pagePath = "pages/index";
    }
    else {
        pagePath = "pages" + path;
    }

    require([pagePath], function (Page) {
        ReactDom.render(
            <Root>
                <Page/>
            </Root>
            , view
        );
    });


});
