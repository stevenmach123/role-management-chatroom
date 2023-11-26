"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLayout = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
require("./UserLayout.css");
const div = {
    border: '1px solid none'
};
function UserLayout() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("section", Object.assign({ className: "relative bottom-4" }, { children: (0, jsx_runtime_1.jsx)("nav", Object.assign({ className: "navbar navbar-expand p-0 text phone" }, { children: (0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: "navbar-nav p-0" }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "board" }), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: 'nav-item' }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: "board", className: "nav-link" }, { children: "Board" })) })), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: 'nav-item' }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: "chatroom", className: "nav-link" }, { children: "ChatRoom" })) }))] })) })) })), (0, jsx_runtime_1.jsx)("section", Object.assign({ className: "flex justify-center relative bottom-4" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}) }))] }));
}
exports.UserLayout = UserLayout;
//# sourceMappingURL=UserLayout.js.map