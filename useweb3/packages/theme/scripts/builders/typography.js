"use strict";
exports.__esModule = true;
exports.makeTypeStyles = void 0;
var makeTypeStyles = function (data, vars) {
    var types = data.record.values.base.typography;
    var styles = {};
    Object.keys(types).forEach(function (key) {
        var entry = types[key];
        Object.keys(entry).forEach(function (typeStyle) {
            var value = entry[typeStyle].value;
            styles[typeStyle] = value;
        });
    });
    Object.entries(styles).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        var newValue = {};
        Object.entries(value).forEach(function (_a) {
            var prop = _a[0], propValue = _a[1];
            var _b = propValue.replace('$', '').split('.'), param = _b[0], paramValue = _b[1];
            if (param === 'paragraphSpacing')
                return;
            newValue[prop] = vars[param][paramValue];
            if (prop === 'fontWeight')
                newValue[prop] = newValue[prop] === 'Medium' ? 500 : 400;
        });
        styles[key] = newValue;
    });
    return styles;
};
exports.makeTypeStyles = makeTypeStyles;
