"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const service_funs_1 = require("../../route_services/service_funs");
const AuthProvider_1 = require("../LayOut/AuthProvider");
require("../UserLayOut/User.css");
function MyInfo() {
    const { user } = (0, AuthProvider_1.AuthP)();
    const v = {
        /*border:'1px solid red', */
        width: 'fit-content',
        margin: 'auto'
    };
    return ((0, jsx_runtime_1.jsx)("section", Object.assign({ style: v, className: 'bb' }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "content-choice" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: "topic" }, { children: "Student Full Information" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "ml-4 list-decimal" }, { children: [(0, jsx_runtime_1.jsxs)("li", { children: ["Me is \u00A0", user === null || user === void 0 ? void 0 : user.current.name] }), (0, jsx_runtime_1.jsxs)("li", { children: ["Id: ", user === null || user === void 0 ? void 0 : user.current.id] }), (user === null || user === void 0 ? void 0 : user.current.pass) && (0, jsx_runtime_1.jsxs)("li", { children: ["Pass: ", user === null || user === void 0 ? void 0 : user.current.pass] }), (user === null || user === void 0 ? void 0 : user.current.email) && (0, jsx_runtime_1.jsx)("li", { children: user === null || user === void 0 ? void 0 : user.current.email }), (0, jsx_runtime_1.jsxs)("li", { children: ["Role:  ", (0, service_funs_1.identifyRole2)(user === null || user === void 0 ? void 0 : user.current.role)] }), (user === null || user === void 0 ? void 0 : user.current.class) && (0, jsx_runtime_1.jsxs)("li", { children: ["Class: ", user === null || user === void 0 ? void 0 : user.current.class] }), (user === null || user === void 0 ? void 0 : user.current.manage) && (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("li", { children: "Groups manage: " }), (user === null || user === void 0 ? void 0 : user.current.manage.length) ?
                                    (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "ml-4 list-disc" }, { children: user === null || user === void 0 ? void 0 : user.current.manage.map((u) => (0, jsx_runtime_1.jsx)("li", { children: u })) })) }) : (0, jsx_runtime_1.jsx)("span", { children: "No group assigned yet" })] })] }))] })) })));
}
exports.default = MyInfo;
//# sourceMappingURL=MyInfo.js.map