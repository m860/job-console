/**
 * Created by hai.ma on 2015/10/21 0021.
 */
define(["react", "react-dom", "util", "components/hello", "components/countdown", "components/link"]
    , function (React, ReactDom, util, Hello, Countdown, Link) {
        return function () {
            ReactDom.render(
                <div>
                    <Hello/>
                    <Link text="go home" href="pages/test"/>
                </div>
                , util.view());
        }
    });
