"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const AuthProvider_1 = require("./AuthProvider");
const background = {
    backgroundColor: "#e3e3e3",
};
function Back() {
    return ((0, jsx_runtime_1.jsx)("body", Object.assign({ style: background }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "big_div back-phone" }, { children: (0, jsx_runtime_1.jsx)(AuthProvider_1.AuthProvider, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}) }) })) })));
}
exports.default = Back;
//# sourceMappingURL=Back.js.map