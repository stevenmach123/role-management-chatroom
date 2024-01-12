"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loaderIntro = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const service_funs_1 = require("../../route_services/service_funs");
const AuthProvider_1 = require("../LayOut/AuthProvider");
const loaderIntro = ({ params, request }) => {
    if (params.info !== 'undefined')
        return 'good';
    else
        throw (0, react_router_dom_1.json)("no username", { status: 400 });
};
exports.loaderIntro = loaderIntro;
function Intro() {
    var _a, _b, _c, _d, _e, _f;
    const x = (0, react_router_dom_1.useLoaderData)();
    const { user } = (0, AuthProvider_1.AuthP)();
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("h2", { children: ["WELCOME ", (_a = user === null || user === void 0 ? void 0 : user.current) === null || _a === void 0 ? void 0 : _a.name, " TO MY SCHOOL"] }), (0, jsx_runtime_1.jsxs)("h3", { children: ["Your role is ", (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { color: (0, service_funs_1.colorRole)((_b = user === null || user === void 0 ? void 0 : user.current) === null || _b === void 0 ? void 0 : _b.role) } }, { children: (0, service_funs_1.identifyRole2)((_c = user === null || user === void 0 ? void 0 : user.current) === null || _c === void 0 ? void 0 : _c.role) })), "  "] }), (0, jsx_runtime_1.jsx)("br", {}), (0, service_funs_1.checkPermit)((_d = user === null || user === void 0 ? void 0 : user.current) === null || _d === void 0 ? void 0 : _d.role, 1) ?
                (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Responsibility" }), (0, jsx_runtime_1.jsxs)("ul", Object.assign({ style: { fontSize: '1.3rem' } }, { children: [(0, jsx_runtime_1.jsx)("li", { children: "Manage full user information" }), (0, jsx_runtime_1.jsx)("li", { children: "Manage users' chat activity in ChatRoom" }), (0, jsx_runtime_1.jsx)("li", { children: "Change user group and personal information" })] })), (0, jsx_runtime_1.jsx)("h3", { children: "Find users info that need" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: "/home/users" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-outline-warning btn-lg" }, { children: "Find users" })) }))] })
                : (0, service_funs_1.checkPermit)((_e = user === null || user === void 0 ? void 0 : user.current) === null || _e === void 0 ? void 0 : _e.role, 2) ?
                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Responsibility" }), (0, jsx_runtime_1.jsxs)("ul", Object.assign({ style: { fontSize: '1.3rem' } }, { children: [(0, jsx_runtime_1.jsx)("li", { children: "Manage user in groups assigned" }), (0, jsx_runtime_1.jsx)("li", { children: "Manage users' chat activity in ChatRoom" }), (0, jsx_runtime_1.jsx)("li", { children: "Join any group you want ^^" })] }))] }) :
                    (0, service_funs_1.checkPermit)((_f = user === null || user === void 0 ? void 0 : user.current) === null || _f === void 0 ? void 0 : _f.role, 3) ?
                        (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Responsibility" }), (0, jsx_runtime_1.jsx)("ul", Object.assign({ style: { fontSize: '1.3rem' } }, { children: (0, jsx_runtime_1.jsx)("li", { children: "Join any group you want ^^" }) }))] }) : null] }));
}
exports.default = Intro;
//# sourceMappingURL=Intro.js.map