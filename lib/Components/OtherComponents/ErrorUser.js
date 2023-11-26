"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
function ErrorUser() {
    const x = (0, react_router_dom_1.useRouteError)();
    console.log("error user", x);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: "/home/intro" }, { children: "Return to users page" })), " ", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("p", { children: "Error User\u00A0" }), " ", (0, jsx_runtime_1.jsx)("br", {}), x && typeof x == 'object' && (0, jsx_runtime_1.jsxs)("section", { children: [" ", Object.entries(x).map((ob) => ((0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: ob[0] }), ":\u00A0 ", (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: ob[1] })] }, ob[0])))] })] }));
}
exports.default = ErrorUser;
//# sourceMappingURL=ErrorUser.js.map