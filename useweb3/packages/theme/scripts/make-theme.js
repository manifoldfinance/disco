"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var figma_json_1 = require("./figma.json");
var fs_1 = require("fs");
var path_1 = require("path");
var colors_1 = require("./builders/colors");
var theme_1 = require("./builders/theme");
var typography_1 = require("./builders/typography");
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var light, dark, foundation, letterSpacing, fontFamilies, fontSizes, fontWeights, lineHeights, borderRadius, boxShadow, colors, types, fileContents;
        return __generator(this, function (_a) {
            light = (0, colors_1.transformThemes)(figma_json_1["default"].record.values.light.colors);
            dark = (0, colors_1.transformThemes)(figma_json_1["default"].record.values.dark.colors);
            foundation = (0, colors_1.transformColors)(figma_json_1["default"].record.values.base.colors);
            letterSpacing = (0, theme_1.makeLetterSpacing)(figma_json_1["default"].record.values.base.letterSpacing);
            fontFamilies = (0, theme_1.makeFonts)(figma_json_1["default"].record.values.base.fontFamilies);
            fontSizes = (0, theme_1.makeFontSizes)(figma_json_1["default"].record.values.base.fontSizes);
            fontWeights = (0, theme_1.makeFontWeights)(figma_json_1["default"].record.values.base.fontWeights);
            lineHeights = (0, theme_1.makeLineHeights)(figma_json_1["default"].record.values.base.lineHeights);
            borderRadius = (0, theme_1.makeBorderRadius)(figma_json_1["default"].record.values.base.borderRadius);
            boxShadow = (0, theme_1.makeBoxShadow)(figma_json_1["default"].record.values.base.boxShadow, foundation);
            colors = {
                light: light,
                dark: dark,
                foundation: foundation
            };
            types = (0, typography_1.makeTypeStyles)(figma_json_1["default"], {
                letterSpacing: letterSpacing,
                fontFamilies: fontFamilies,
                fontSizes: fontSizes,
                fontWeights: fontWeights,
                lineHeights: lineHeights
            });
            fileContents = "export const colors = " + JSON.stringify(colors) + " as const;\n  export const letterSpacing = " + JSON.stringify(letterSpacing) + " as const;\n  export const fonts = " + JSON.stringify(fontFamilies) + " as const;\n  export const fontSizes = " + JSON.stringify(fontSizes) + " as const;\n  export const borderRadius = " + JSON.stringify(borderRadius) + " as const;\n  export const boxShadow = " + JSON.stringify(boxShadow) + " as const;\n  export const lineHeights = " + JSON.stringify(lineHeights) + " as const;\n  export const typeStyles = " + JSON.stringify(types) + " as const;";
            fs_1["default"].writeFileSync(path_1["default"].resolve('./src/generated.ts'), fileContents);
            return [2 /*return*/];
        });
    });
}
run()
    .then(function () {
    process.exit();
})["catch"](function (error) {
    console.error(error);
    process.exit(1);
});
