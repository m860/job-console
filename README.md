#Job Console with node

#Installation

```
$ git clone https://github.com/m860/job-console.git
$ cd job-console
$ npm install && bower install
$ gulp
```
Access http://127.0.0.1:3001 in browser

#How to add a job

You need to create a  file name is test_job.js and write follow:

```
var second = [];
for (var i = 1; i < 60; i++) {
second.push(i);
}

module.exports = {
//Job name
//optional
name: "job_demo",
//job time trigger
//you my be consult https://github.com/node-schedule/node-schedule
//optional
//if it is null or undefined role is FUN else JOB
rule: {
    second: second
},
//do something
//require
callback: function () {
    console.log(this.name, new Date());
},
//description
//optional
desc:"It's a test job ."
};
```
Click [upload job] button  to upload test_job.js file.
