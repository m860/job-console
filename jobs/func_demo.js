var second = [];
for (var i = 1; i < 60; i++) {
    second.push(i);
}

module.exports = {
    name: "func_demo",
    callback: function () {
        console.log(this.name, new Date());
    },
    desc:"It's a func job ."
};
