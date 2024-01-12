"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const NavBar_1 = __importDefault(require("./NavBar"));
const react_router_dom_1 = require("react-router-dom");
const AuthProvider_1 = require("./AuthProvider");
const v = {
    border: '1px solid none',
    height: '99vh',
    display: 'flex',
    flexDirection: 'column'
};
function Home() {
    const { user } = (0, AuthProvider_1.AuthP)();
    (0, react_1.useEffect)(() => {
        /* if(setSocket)
           setSocket(io(`http://localhost:${properties.soc_port}`,{query:{customid:user?.current.id} }));  */
    }, []);
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ style: v }, { children: [(0, jsx_runtime_1.jsx)(NavBar_1.default, {}), (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: `intro/${user === null || user === void 0 ? void 0 : user.current.name}` }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {})] })));
}
exports.default = Home;
//# sourceMappingURL=Home.js.map