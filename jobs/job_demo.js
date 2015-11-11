var second = [];
for (var i = 1; i < 60; i++) {
    second.push(i);
}

module.exports = {
    name: "job_demo",
    rule: {
        second: second
    },
    callback: function () {
        console.log(this.name, new Date());
    },
    desc:"It's a test job ."
};
