"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const tt = {
    padding: "0.6rem 1rem "
};
const icon = {
    fontSize: "200%",
};
const error_sim = 'bi bi-x';
const suc_sim = 'bi bi-check';
const info_sim = 'bi bi-exclamation';
const error_text = 'text-red-600';
const suc_text = 'text-green-600';
const info_text = 'text-gray-300';
function Sign({ info = 'loading', error, message = (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Nothing" }) }) {
    var _a, _b;
    let bg = ((_a = error === null || error === void 0 ? void 0 : error.other) === null || _a === void 0 ? void 0 : _a.indexOf('server')) >= 0 || ((_b = error === null || error === void 0 ? void 0 : error.other) === null || _b === void 0 ? void 0 : _b.indexOf('weird')) >= 0 ? "bg-orange-300" : error ? "bg-red-300" : '';
    bg = info === 'success' ? 'bg-green-400' : info === 'loading' ? 'bg-gray-400' : bg === '' ? "bg-red-300" : bg;
    let sign = info === 'success' ? suc_sim : info === 'loading' ? info_sim : error_sim;
    let text = info === 'success' ? suc_text : info === 'loading' ? info_text : error_text;
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ style: tt, id: "dam", className: `flex justify-between  items-center text-xl ${bg}` }, { children: [(0, jsx_runtime_1.jsx)("i", { style: icon, className: `${sign} ${text}` }), message] })));
}
exports.default = Sign;
//# sourceMappingURL=Sign.js.map