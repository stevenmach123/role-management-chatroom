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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Useri = exports.GroupBoard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("../UserLayOut/UserLayout.css");
require("../UserLayOut/User.css");
const react_router_dom_1 = require("react-router-dom");
const AuthProvider_1 = require("../LayOut/AuthProvider");
const service_funs_1 = require("../../route_services/service_funs");
const model_1 = require("../../model");
const axiosService_1 = require("../../route_services/axiosService");
const Alert_1 = __importDefault(require("react-bootstrap/Alert"));
const color_rad = (color) => `linear-gradient(to bottom right,${color} 30%,rgb(222, 209, 170) 80%)`;
const GroupBoard = () => {
    var _a, _b;
    const [type_ram, setType] = (0, react_router_dom_1.useSearchParams)();
    const { cate, user, myusers } = (0, AuthProvider_1.AuthP)();
    const cate_ar = ((_a = user === null || user === void 0 ? void 0 : user.current) === null || _a === void 0 ? void 0 : _a.manage) && ((_b = user === null || user === void 0 ? void 0 : user.current) === null || _b === void 0 ? void 0 : _b.manage.length) > 0 ? Object.entries(cate).filter(v => user.current.manage.includes(v[0])) : [];
    const myusers2 = myusers ? myusers.filter(x => cate_ar.find(v => (0, service_funs_1.identifyRole)(x.role) !== 1 && (0, service_funs_1.identifyRole)(x.role) !== -1 && (x === null || x === void 0 ? void 0 : x.class) === v[0])) : [];
    const current_users = type_ram.get("type") ? myusers2.filter(u => u.class === type_ram.get('type')).sort((a, b) => a.name - b.name) : myusers2.sort((a, b) => a.name - b.name);
    const Mycategories = cate_ar.map(cat => (0, jsx_runtime_1.jsx)("div", Object.assign({ style: type_ram.get('type') === cat[0] ? { backgroundImage: color_rad(cat[1]), color: "black" } : { border: `1px solid ${cat[1]}`, color: cat[1] }, onClick: (e) => typeFind(e, cat[0]), className: "cate" }, { children: cat[0] }), cat[0]));
    const typeFind = (e, type) => {
        setType(cur_type => {
            if (type)
                cur_type.set("type", type);
            else
                cur_type.delete("type");
            return cur_type;
        });
    };
    const clickUser = (user) => {
        if ((user === null || user === void 0 ? void 0 : user.id) && (user === null || user === void 0 ? void 0 : user.name)) {
            const pram = new URLSearchParams();
            pram.set('name', user.name);
            pram.set('id', user.id);
            return pram;
        }
        return null;
    };
    const fix = () => {
        //${type_ram.get('type')?"&type="${type_ram.get('type')}:''}  }`
        if (type_ram.get('type'))
            return '&type=' + type_ram.get('type');
        else
            return '';
    };
    const FillUsers = current_users.map((u, i) => {
        var _a, _b;
        if (u.name === ((_a = user === null || user === void 0 ? void 0 : user.current) === null || _a === void 0 ? void 0 : _a.name) && u.id === ((_b = user === null || user === void 0 ? void 0 : user.current) === null || _b === void 0 ? void 0 : _b.id))
            return null;
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'px-2 py-1' }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.NavLink, Object.assign({ id: u.name, className: `linking unactive ${({ isActive }) => isActive ? "active" : ""}`, to: `${u.name}?${clickUser(u)}${fix()}` }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'tar_block' }, { children: u.name })), " "] })) }), u.name));
    });
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "bb" }, { children: [(0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "con" }, { children: [Mycategories, (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'text-decoration-underline', style: { fontSize: "1rem" }, onClick: (e) => typeFind(e, null) }, { children: "Cancel filter" }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'sec-box' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "item-box one" }, { children: FillUsers })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "item-box two" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}) }))] }))] })));
};
exports.GroupBoard = GroupBoard;
const Useri = () => {
    const x = (0, react_router_dom_1.useLocation)();
    const [param, setPram] = (0, react_router_dom_1.useSearchParams)();
    const [error, setError] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [erMsg, setEr] = (0, react_1.useState)('');
    const [student, setStu] = (0, react_1.useState)();
    const { vvv, user } = (0, AuthProvider_1.AuthP)();
    const support = () => __awaiter(void 0, void 0, void 0, function* () {
        const ram = new URLSearchParams();
        setLoading(false);
        setError(false);
        setEr('');
        try {
            if (!param.get('name') || !param.get('id')) {
                throw 'Missing properties';
            }
            ram.set('name', param.get('name'));
            ram.set('id', param.get('id'));
            const token = yield (vvv === null || vvv === void 0 ? void 0 : vvv.getIdToken());
            const stu = yield axiosService_1.ser1.getNStudent(ram, { 'id_token': token });
            setLoading(false);
            setEr(false);
            console.log(stu.data);
            setStu(stu.data);
        }
        catch (e) {
            setError(true);
            setLoading(false);
            if (typeof e === 'string')
                setEr(e);
            else if (e.response) {
                setEr(e.response.data);
                if (e.response.status === 415)
                    (0, react_router_dom_1.Navigate)({ to: '/signin' });
            }
            else {
                setEr(JSON.stringify(e));
            }
        }
    });
    (0, react_1.useEffect)(() => {
        console.log('hello');
        support();
    }, [x]);
    const kick = (e) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = yield (vvv === null || vvv === void 0 ? void 0 : vvv.getIdToken());
            if ((0, service_funs_1.identifyRole)(student === null || student === void 0 ? void 0 : student.role) === 3)
                axiosService_1.ser1.postStudent({ class: '', id: student === null || student === void 0 ? void 0 : student.id }, { 'id_token': token });
            else {
                const v = document.querySelector('.warn-admin');
                v.classList.add('active');
                e.target.disabled = true;
                yield (0, model_1.Sleep)(2000);
                v.classList.remove('active');
                e.target.disabled = false;
            }
        }
        catch (e) {
            if ((e === null || e === void 0 ? void 0 : e.response.status) === 415)
                (0, react_router_dom_1.Navigate)({ to: '/signin' });
        }
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !Array.from(param.keys()).length ? null :
            loading ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Loading..." }) :
                error ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: erMsg }) :
                    (0, jsx_runtime_1.jsx)("section", Object.assign({ className: 'px-4 py-2 list-decimal' }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "content-choice" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: "topic" }, { children: "Student Information " })), (0, jsx_runtime_1.jsxs)("li", { children: ["Name: ", student === null || student === void 0 ? void 0 : student.name] }), (0, jsx_runtime_1.jsxs)("li", { children: ["Id: ", student === null || student === void 0 ? void 0 : student.id] }), (student === null || student === void 0 ? void 0 : student.class) && (0, jsx_runtime_1.jsxs)("li", { children: ["Class: ", student === null || student === void 0 ? void 0 : student.class] }), (0, jsx_runtime_1.jsxs)("li", { children: ["Role: ", (0, service_funs_1.identifyRole2)(student === null || student === void 0 ? void 0 : student.role)] }), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: e => kick(e), className: "btn btn-danger", style: { fontSize: '2rem' } }, { children: "Kick User" })), (0, jsx_runtime_1.jsx)(Alert_1.default, Object.assign({ className: 'warn-admin', variant: 'danger' }, { children: "Can't kick ones with same or higher role" }))] })) })) }));
};
exports.Useri = Useri;
//# sourceMappingURL=GroupBoard.js.map