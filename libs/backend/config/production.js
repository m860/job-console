/**
 * Created by hai.ma on 2015/11/13 0013.
 */
module.exports = {
    port: 3001,
    log4js:{
        "level": "INFO",
        "appenders": [
            {
                "type": "console"
            },{
                "category": 'order',
                "type": "dateFile",
                "pattern": "-yyyy-MM-dd",
                "filename": "logs/order.log",
                "alwaysIncludePattern": true
            },
            {
                "type": "dateFile",
                "pattern": "-yyyy-MM-dd",
                "filename": "logs/log.log",
                "alwaysIncludePattern": true
            },
            {
                "type": "logLevelFilter",
                "level": "ERROR",
                "appender": {
                    "type": __dirname + "/../libs/common/log/log2service_appender.js",
                    "serviceAddress": "http://100.98.29.36/v1/api/toolkit/logging"
                }
            },
            {
                "type": "logLevelFilter",
                "level": "ERROR",
                category: 'order',
                "appender": {
                    "type": __dirname + "/../libs/common/log/log2service_appender.js",
                    "serviceAddress": "http://100.98.29.36/v1/api/toolkit/logging"
                }
            },
            {
                "category": 'sitemap',
                "type": "dateFile",
                "pattern": "-yyyy-MM-dd",
                "filename": "logs/sitemap.log",
                "alwaysIncludePattern": true
            }
        ]
    }
};