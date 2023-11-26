"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
const service_funs_1 = require("../../route_services/service_funs");
const AuthProvider_1 = require("../LayOut/AuthProvider");
const div = {
    border: "1px solid none"
};
const bor = {};
function UserSettingLayout() {
    var _a;
    const { user } = (0, AuthProvider_1.AuthP)();
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [" ", (0, service_funs_1.checkPermit)((_a = user === null || user === void 0 ? void 0 : user.current) === null || _a === void 0 ? void 0 : _a.role, 2) ?
                (0, jsx_runtime_1.jsx)("nav", Object.assign({ style: div, className: "navbar navbar-expand bottom-4 " }, { children: (0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: "navbar-nav" }, { children: ["     ", (0, jsx_runtime_1.jsx)("li", Object.assign({ className: 'nav-item' }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: `usersetting/${user === null || user === void 0 ? void 0 : user.current.name}`, className: "nav-link" }, { children: "MySetting" })) })), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: 'nav-item' }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: "board", className: "nav-link" }, { children: "GroupManage" })) }))] })) }))
                : null, (0, jsx_runtime_1.jsx)(react_router_dom_2.Navigate, { to: `usersetting/${user === null || user === void 0 ? void 0 : user.current.name}` }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: bor, className: "flex justify-center relative bottom-5" }, { children: [" ", (0, jsx_runtime_1.jsx)(react_router_dom_2.Outlet, {})] }))] }));
}
exports.default = UserSettingLayout;
//# sourceMappingURL=UserSettingLayout.js.map