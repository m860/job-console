/**
 * Created by hai.ma on 2015/10/26 0026.
 */
module.exports = {
    job: 0,
    func: 1,
    getText: function (value) {
        var config = {
            "0": "job",
            "1": "func"
        };
        return config[value];
    }
};