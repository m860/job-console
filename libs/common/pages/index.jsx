/**
 * Created by hai.ma on 2015/11/16 0016.
 */
var React = require("react");
var ReactDom = require("react-dom");
var Header = require("libs/common/components/header");
var JobPanel = require("libs/common/components/job_panel");

ReactDom.render(
    <div>
        <Header/>
        <section>
            <JobPanel/>
        </section>
    </div>
    , document.getElementById("view")
);