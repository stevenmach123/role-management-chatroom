"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const AuthProvider_1 = require("./AuthProvider");
const react_router_dom_1 = require("react-router-dom");
function ProtectedR() {
    let { user } = (0, AuthProvider_1.AuthP)();
    console.log(user);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}) }));
}
exports.default = ProtectedR;
//# sourceMappingURL=ProtectedR.js.map