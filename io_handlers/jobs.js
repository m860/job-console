/**
 * Created by hai.ma on 2015/10/22 0022.
 */

var messageType = require("../enums/message_type");
var role = require("../enums/role");
var helper = require("../libs/helper");
var fs = require("fs");
var path = require("path");
var equal = require("deep-equal");
var requireDir = require("require-dir");
var q = require("q");
var md5 = require("crypto-md5");
var schedule = require("node-schedule");
var chokidar = require('chokidar');

var jobs = {};
var socket;
var jobsWatcher;
var directive = {
    stop: function (fileName) {
        if (jobs[fileName]) {
            jobs[fileName].stop();
        }
    },
    start: function (fileName) {
        if (jobs[fileName]) {
            jobs[fileName].start();
        }
    },
    stopAll: function () {
        for (var key in jobs) {
            jobs[key].stop();
        }
    },
    startAll: function () {
        for (var key in jobs) {
            jobs[key].start();
        }
    }
};
function requireJobConfig(path) {
    if (require.cache[path]) {
        delete require.cache[path];
    }
    return require(path);
}
function generateJobKey(path) {
    var content = fs.readFileSync(path, "utf-8");
    var key = md5(content + path, "hex");
    return key;
}
function initJob(jobConfig) {
    jobConfig.key = generateJobKey(jobConfig.absolutePath);
    jobConfig.status = 0;
    if (jobConfig.rule) {
        jobConfig.role = role.job;
        var rule = new schedule.RecurrenceRule();
        for (var r in jobConfig.rule) {
            rule[r] = jobConfig.rule[r];
        }
        jobConfig._rule = rule;
        jobConfig._instance = new schedule.Job(jobConfig.name, jobConfig.callback);
        jobConfig.start = function () {
            if (jobConfig._instance && jobConfig._rule) {
                jobConfig._instance.schedule(jobConfig._rule);
                jobConfig.status = 1;
            }
        };
        jobConfig.stop = function () {
            if (jobConfig._instance && jobConfig._instance.cancel) {
                jobConfig._instance.cancel();
                jobConfig.status = 0;
            }
        };
    }
    else {
        jobConfig.role = role.func;
        jobConfig.start = function () {
            var beginDate = Date.now();
            jobConfig.status = 1;
            var promise = jobConfig.callback();

            function done() {
                console.log(helper.formatTime(Date.now() - beginDate, "execution time : $h:$m:$s"));
                jobConfig.status = 0;
                sendAll(messageType.JobMonitor, buildJobsMessage());
            }

            q.when(promise, done, done);
        };
        jobConfig.stop = function () {
        };
    }

    return jobConfig;
}
//function initAllJobInstance() {
//    var jobConfigs = requireDir(__dirname + "../../jobs");
//    for (var fileName in jobConfigs) {
//        var config = jobConfigs[fileName];
//        config.absolutePath = path.normalize(__dirname + "../../jobs/" + fileName + ".js");
//        jobs[fileName] = initJob(config);
//    }
//}
function onNewJob(filePath) {
    console.log("new job ==> ", filePath);
    var config = requireJobConfig(filePath);
    config.absolutePath = filePath;
    var fileName = path.basename(filePath);
    var index = fileName.indexOf(".");
    fileName = fileName.substring(0, index);
    jobs[fileName] = initJob(config);
    sendAll(messageType.JobMonitor, buildJobsMessage());
}
function onChangeJob(filePath) {
    console.log("change job ===> ", filePath);
    var config = requireJobConfig(filePath);
    config.absolutePath = filePath;
    var fileName = path.basename(filePath);
    var index = fileName.indexOf(".");
    fileName = fileName.substring(0, index);
    if (jobs[fileName]) {
        jobs[fileName].stop();
        delete jobs[fileName];
    }
    jobs[fileName] = initJob(config);
    sendAll(messageType.JobMonitor, buildJobsMessage());
}
function onDeleteJob(filePath) {
    console.log("delete job ===> ", filePath);
    var fileName = path.basename(filePath);
    var index = fileName.indexOf(".");
    fileName = fileName.substring(0, index);
    jobs[fileName]._instance.cancel();
    delete jobs[fileName];
    sendAll(messageType.JobMonitor, buildJobsMessage());
}
function buildJobsMessage() {
    var message = [];
    if (jobs) {
        for (var key in jobs) {
            var job = jobs[key];
            message.push({
                name: job.name,
                key: job.key,
                statusText: job.status === 0 ? "stop" : "running",
                status: job.status,
                fileName: key,
                desc: job.desc,
                role: job.role,
                roleText: role.getText(job.role)
            });
        }
    }
    //console.log("send message : ", message);
    return message;
}
function watchingJobs() {
    var watchingPath = path.normalize(__dirname + "../../jobs");
    console.log("begin watching [%s] ...", watchingPath);
    jobsWatcher = chokidar.watch(watchingPath);
    jobsWatcher.on("add", onNewJob);
    jobsWatcher.on("change", onChangeJob);
    jobsWatcher.on("unlink", onDeleteJob);
}
function handleJobDirective(data) {
    var directiveName = data.name;
    var args = data.args;
    if (directive[directiveName]) {
        directive[directiveName].apply(null, args);
        sendAll(messageType.JobMonitor, buildJobsMessage(jobs));
    }
}
function sendAll(type, message) {
    if (socket) {
        socket.emit(type, message);
        socket.broadcast.emit(type, message);
    }
}
watchingJobs();
//initAllJobInstance();
module.exports = function (io) {
    io.on("connect", function (currentSocket) {
        socket = currentSocket;
        currentSocket.emit(messageType.JobMonitor, buildJobsMessage());
        currentSocket.on(messageType.JobDirective, handleJobDirective);
        currentSocket.on("disconnect", function () {
            currentSocket.removeListener(messageType.JobDirective, handleJobDirective);
        });
    });
};