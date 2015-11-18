/**
 * Created by hai.ma on 2015/10/26 0026.
 */

var values = {
    job: 0,
    func: 1,
    getText: function (value) {
        for (var name in this) {
            if (this[name] == value) {
                return name;
            }
        }
        return null;
    }
};

module.exports = values;