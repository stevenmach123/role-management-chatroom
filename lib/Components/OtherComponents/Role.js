"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const axiosService_1 = require("../../route_services/axiosService");
const service_funs_1 = require("../../route_services/service_funs");
const AuthProvider_1 = require("../LayOut/AuthProvider");
const react_router_dom_1 = require("react-router-dom");
const c = {
    border: '',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
};
function Role() {
    const [role, setRole] = (0, react_1.useState)();
    const { user, vvv } = (0, AuthProvider_1.AuthP)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const Confirm = (e) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        e.preventDefault();
        const token = yield (vvv === null || vvv === void 0 ? void 0 : vvv.getIdToken());
        const claims = (_a = (yield (vvv === null || vvv === void 0 ? void 0 : vvv.getIdTokenResult()))) === null || _a === void 0 ? void 0 : _a.claims;
        console.log(claims);
        try {
            if (Number(role)) {
                const obj = { 'id': user === null || user === void 0 ? void 0 : user.current.id, 'role': (0, service_funs_1.construct_role)([parseInt(role)]) };
                yield axiosService_1.ser1.postStudent(obj, { 'id_token': token });
                navigate('/home');
            }
        }
        catch (e) {
            if (e === null || e === void 0 ? void 0 : e.response) {
                if ((e === null || e === void 0 ? void 0 : e.response.status) === 415)
                    navigate('/signin');
            }
            console.log('role ', e);
        }
    });
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "flex flex-col justify-center items-center  h-full  " }, { children: [(0, jsx_runtime_1.jsx)("p", { children: "New Account created, give yourself a role :)" }), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: Confirm, style: c }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "input-group mb-2" }, { children: (0, jsx_runtime_1.jsxs)("select", Object.assign({ name: "role", onChange: e => setRole(e.target.value), value: role, className: "custom-select  text-black", id: "is01" }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "choose" }, { children: "Roles..." })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "3" }, { children: "User" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "2" }, { children: "Group Manager" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "1" }, { children: "Admin" }))] })) })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", className: 'btn btn-success' }, { children: "Confirm" }))] }))] })));
}
exports.default = Role;
//# sourceMappingURL=Role.js.map