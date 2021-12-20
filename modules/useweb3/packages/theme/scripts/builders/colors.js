"use strict";
exports.__esModule = true;
exports.checkKeys = exports.transformThemes = exports.figmaTokenToColorToken = exports.transformColors = void 0;
// @ts-nocheck
var tinycolor2_1 = require("tinycolor2");
var transformColors = function (palette) {
    var keys = Object.keys(palette);
    var final = {};
    keys.sort().forEach(function (key) {
        var entry = palette[key];
        var items = Object.keys(entry);
        items.forEach(function (itemKey) {
            var value = entry[itemKey].value;
            final["color-" + key + "-" + itemKey] = (0, tinycolor2_1["default"])(value).toHslString();
        });
    });
    return final;
};
exports.transformColors = transformColors;
function figmaTokenToColorToken(figmaToken) {
    return figmaToken.replace('colors', 'color').replace('$', '').replace(/\./g, '-');
}
exports.figmaTokenToColorToken = figmaTokenToColorToken;
var foundationalColors = ['base', 'slate', 'grey', 'blue', 'green', 'orange', 'red'];
var transformThemes = function (theme, isBase) {
    var categories = Object.keys(theme);
    var final = {};
    categories.forEach(function (category) {
        var isBaseColorCategory = foundationalColors.includes(category);
        if (isBaseColorCategory) {
            if (!isBase)
                return;
        }
        else {
            if (isBase)
                return;
        }
        var entry = theme[category];
        var items = Object.keys(entry);
        items.sort().forEach(function (itemKey) {
            var value = entry[itemKey].value;
            final["" + itemKey] = figmaTokenToColorToken(value);
        });
    });
    var alphabetical = {};
    Object.keys(final)
        .sort()
        .forEach(function (key) {
        alphabetical[key] = final[key];
    });
    return alphabetical;
};
exports.transformThemes = transformThemes;
function checkKeys(light, dark) {
    var lightKeys = Object.keys(light);
    var darkKeys = Object.keys(dark);
    var isSame = lightKeys.length === darkKeys.length;
    var lightIsGreater = lightKeys.length > darkKeys.length;
    var getKeysInOther = function () {
        if (!isSame) {
            if (lightIsGreater) {
                return lightKeys.filter(function (key) {
                    return !darkKeys.find(function (_key) { return _key === key; });
                });
            }
            else {
                return darkKeys.filter(function (key) { return lightKeys.find(function (_key) { return key !== key; }); });
            }
        }
    };
    if (lightKeys.length !== darkKeys.length)
        throw Error("Theme key lengths do not match! Light: " + Object.keys(light).length + ", Dark: " + Object.keys(dark).length + ", missing keys: " + JSON.stringify(getKeysInOther()));
}
exports.checkKeys = checkKeys;
