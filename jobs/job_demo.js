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
