"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
const react_router_dom_3 = require("react-router-dom");
function En() {
    const find = (0, react_router_dom_2.useLocation)();
    const t = (0, react_router_dom_3.useNavigate)();
    console.log(find);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "signin" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {})] }));
}
exports.default = En;
//# sourceMappingURL=En.js.map