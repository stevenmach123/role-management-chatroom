"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
require("./NavBar.css");
const AuthProvider_1 = require("./AuthProvider");
const service_funs_1 = require("../../route_services/service_funs");
const nolink = {
    textDecoration: "none",
    color: "black",
    marginRight: "-0.1rem",
};
const div = {
    border: '1px solid red'
};
const div2 = {
    border: '1px solid orange'
};
function NavBar() {
    var _a, _b, _c, _d, _e;
    const { user, logout } = (0, AuthProvider_1.AuthP)();
    return ((0, jsx_runtime_1.jsxs)("nav", Object.assign({ className: "phone navbar navbar-expand text nav_adjust" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "navbar-brand nav_adjust" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ style: nolink, className: "phone home-text", to: `intro/${(_a = user === null || user === void 0 ? void 0 : user.current) === null || _a === void 0 ? void 0 : _a.name}` }, { children: "Home" })) })), (0, jsx_runtime_1.jsx)("ul", Object.assign({ className: "navbar-nav nav_adjust" }, { children: ((_b = user === null || user === void 0 ? void 0 : user.current) === null || _b === void 0 ? void 0 : _b.role) && ((0, service_funs_1.checkPermit)(user.current.role, 1) ?
                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: "add", className: "nav-link" }, { children: "Add" })) })), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: "users", className: "nav-link" }, { children: "Users" })) }))] }) : (0, service_funs_1.checkPermit)(user.current.role, ...[2, 3]) ?
                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: "userss", className: "nav-link" }, { children: "Setting" })) })), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: "chatroom", className: "nav-link" }, { children: "ChatRoom" })) }))] })
                    :
                        null) })), (0, jsx_runtime_1.jsx)("ul", Object.assign({ className: "navbar-nav ms-auto" }, { children: (0, jsx_runtime_1.jsx)("li", Object.assign({ className: " my-auto nav-item" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "relative  dropdown btn-group" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: " user_img phone dropdown-toggle", "data-toggle": "dropdown", "data-bs-toggle": "dropdown" }, { children: [" ", (0, jsx_runtime_1.jsx)("img", { className: "tuser_img", src: "/user_img.png", alt: "image" })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "dropdown-menu dropdown-menu-end menu x" }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ className: "dropdown-item", to: `intro/${(_c = user === null || user === void 0 ? void 0 : user.current) === null || _c === void 0 ? void 0 : _c.name}`, style: { textDecoration: "underline 2px solid", textDecorationColor: (0, service_funs_1.colorRole)(user === null || user === void 0 ? void 0 : user.current.role) } }, { children: user === null || user === void 0 ? void 0 : user.current.name })), (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ className: "dropdown-item", to: `myinfo/${(_d = user === null || user === void 0 ? void 0 : user.current) === null || _d === void 0 ? void 0 : _d.name}` }, { children: "My info" })), (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ className: "dropdown-item ", to: `updateinfo/${(_e = user === null || user === void 0 ? void 0 : user.current) === null || _e === void 0 ? void 0 : _e.name}` }, { children: "Update info" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ onClick: logout, style: { color: 'red' }, className: "dropdown-item" }, { children: "Logout" }))] }))] })) })) }))] })));
}
exports.default = NavBar;
//# sourceMappingURL=NavBar.js.map