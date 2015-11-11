/**
 * Created by hai.ma on 2015/10/21 0021.
 */
define(["react", "react-dom", "util", "components/hello"
        , "components/countdown", "components/link", "components/socket_session_count"]
    , function (React, ReactDom, util, Hello, Countdown, Link, SessionCount) {
        return function () {
            var time = 3000;
            var complete = function () {
                console.log("time over");
            };
            var step = function (time) {
                console.log(time);
            };
            ReactDom.render(
                <div>
                    <Hello/>
                    <Countdown time={time} oncomplete={complete} onstep={step}/>
                    <Link className={{red:true,blue:0,green:1}} href="pages/test_page2" style={{color:"red"}}
                          text="test"/>
                    <SessionCount/>
                </div>
                , util.view());
        }
    });