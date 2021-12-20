"use strict";
exports.__esModule = true;
exports.makeBoxShadow = exports.makeBorderRadius = exports.makeLetterSpacing = exports.makeFontWeights = exports.makeFontSizes = exports.makeLineHeights = exports.makeFonts = void 0;
var colors_1 = require("./colors");
var tinycolor2_1 = require("tinycolor2");
var makeFonts = function (fontFamilies) {
    var keys = Object.keys(fontFamilies);
    var final = {};
    keys.sort().forEach(function (key) {
        var entry = fontFamilies[key];
        final[key] = "'" + entry.value + "'";
    });
    return final;
};
exports.makeFonts = makeFonts;
var makeLineHeights = function (lineHeights) {
    var keys = Object.keys(lineHeights);
    var final = {};
    keys.sort().forEach(function (key) {
        var entry = lineHeights[key];
        if (typeof entry === 'object') {
            final[key] = entry.value + "px";
        }
        else {
            final[key] = entry + "px";
        }
    });
    return final;
};
exports.makeLineHeights = makeLineHeights;
var makeFontSizes = function (fontSizes) {
    var keys = Object.keys(fontSizes);
    var final = {};
    keys.sort().forEach(function (key) {
        var entry = fontSizes[key];
        if (typeof entry === 'object') {
            final[key] = entry.value + "px";
        }
        else {
            final[key] = entry + "px";
        }
    });
    return final;
};
exports.makeFontSizes = makeFontSizes;
var makeFontWeights = function (fontWeights) {
    var keys = Object.keys(fontWeights);
    var final = {};
    keys.sort().forEach(function (key) {
        var entry = fontWeights[key];
        if (typeof entry === 'object') {
            final[key] = "" + entry.value;
        }
        else {
            final[key] = "" + entry;
        }
    });
    return final;
};
exports.makeFontWeights = makeFontWeights;
var makeLetterSpacing = function (letterSpacing) {
    var keys = Object.keys(letterSpacing);
    var final = {};
    keys.sort().forEach(function (key) {
        var entry = letterSpacing[key];
        if (typeof entry === 'object') {
            final[key] = entry.value;
        }
        else {
            final[key] = entry;
        }
    });
    return final;
};
exports.makeLetterSpacing = makeLetterSpacing;
var makeBorderRadius = function (borderRadius) {
    var keys = Object.keys(borderRadius);
    var final = {};
    keys.sort().forEach(function (key) {
        var entry = borderRadius[key];
        var value = typeof entry === 'object' ? entry.value : entry;
        final[key] = value.includes('%') ? value : value + "px";
    });
    return final;
};
exports.makeBorderRadius = makeBorderRadius;
var rgbaToThemeColor = function (rgbaString, colors) {
    var _a = rgbaString.split('rgba('), end = _a[1];
    var _b = end.split(','), color = _b[0], closing = _b[1];
    var alpha = closing.replace(')', '');
    var hsl = colors[(0, colors_1.figmaTokenToColorToken)(color)];
    if (!hsl)
        throw new Error('No theme color for rgbaToThemeColor');
    return (0, tinycolor2_1["default"])(hsl).setAlpha(alpha).toHslString();
};
var makeBoxShadow = function (boxShadow, colors) {
    var keys = Object.keys(boxShadow);
    var final = {};
    keys.sort().forEach(function (key) {
        var entry = boxShadow[key];
        final[key] = entry.value.x + "px " + entry.value.y + "px " + entry.value.blur + "px " + entry.value.spread + "px " + rgbaToThemeColor(entry.value.color, colors);
    });
    return final;
};
exports.makeBoxShadow = makeBoxShadow;
