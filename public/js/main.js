/**
 * Created by hai.ma on 2015/10/21 0021.
 */
requirejs.config({
    baseUrl: "js"
    , packages: ["components", "pages"]
    , paths: {
        "jquery": "libs/jquery/dist/jquery"
        , "react": "libs/react/react"
        , "react-dom": "libs/react/react-dom"
        , "classnames": "libs/classnames/index"
        , "util": "util"
        , "io": "../../socket.io/socket.io.js"
        , "ws": "ws"
    }
    , shim: {
        "react-dom": ["react"]
        , "ws": ["io"]
    }
    , deps: ["jquery", "ws"]
    , urlArgs: "ts=" + (new Date()).getTime()
});

