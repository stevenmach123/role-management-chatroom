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
require("../UserLayOut/UserLayout.css");
require("../UserLayOut/User.css");
const AuthProvider_1 = require("../LayOut/AuthProvider");
const service_funs_1 = require("../../route_services/service_funs");
const axiosService_1 = require("../../route_services/axiosService");
const react_router_dom_1 = require("react-router-dom");
function UserSetting() {
    var _a;
    const { user, vvv } = (0, AuthProvider_1.AuthP)();
    const x = (0, react_router_dom_1.useLoaderData)();
    const Focus_class = (e) => {
        e.preventDefault();
        const ee = document.querySelectorAll('.btn-group.classy .btn:focus');
        const ex = document.querySelectorAll('.btn-group.classy .btn');
        let selected;
        ex.forEach(f => {
            f.classList.remove("active");
            f.style.removeProperty('background-color');
            f.style.removeProperty('color');
            f.style.color = f.style.borderColor;
        });
        ee.forEach(f => {
            f.classList.add("active");
            selected = f.value;
            f.style.color = "black";
            f.style.backgroundColor = f.style.borderColor;
        });
    };
    const Confirm = () => __awaiter(this, void 0, void 0, function* () {
        var _b;
        const classy = document.querySelector(".btn-group.classy .btn.active");
        try {
            if (!classy)
                throw "missing a choice ";
            const param = new URLSearchParams();
            param.set('name', user === null || user === void 0 ? void 0 : user.current.name);
            param.set('id', user === null || user === void 0 ? void 0 : user.current.id);
            const token = (_b = (yield (vvv === null || vvv === void 0 ? void 0 : vvv.getIdTokenResult()))) === null || _b === void 0 ? void 0 : _b.token;
            const stu = yield axiosService_1.ser1.getNStudent(param, { 'id_token': token });
            const val_class = classy.value;
            const old_class = stu.data.class;
            const ref = yield axiosService_1.ser1.postStudent({ id: user === null || user === void 0 ? void 0 : user.current.id, class: val_class, }, { 'id_token': token });
            const new_class = ref.data.student.class;
            if (new_class)
                yield axiosService_1.ser1.postTypes([new_class]);
            if (old_class !== new_class && old_class) {
                const types = yield axiosService_1.ser1.getAllTypes();
                let cond = types.data.find(type => type === old_class);
                if (!cond)
                    yield axiosService_1.ser1.deleteType(old_class);
            }
        }
        catch (e) {
            console.log('user setting', e);
            if ((e === null || e === void 0 ? void 0 : e.response.status) === 415)
                (0, react_router_dom_1.Navigate)({ to: '/signin' });
        }
    });
    const support = () => {
        let cool_start;
        console.log("user setting support", user);
        try {
            cool_start = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                const ec = document.querySelectorAll(`.btn-group.classy .btn`);
                ec.forEach(f => {
                    f.classList.remove("active");
                    f.style.removeProperty('background-color');
                    f.style.removeProperty('color');
                    f.style.color = f.style.borderColor;
                });
                ec.forEach(f => {
                    var _a;
                    if (f.value === ((_a = user === null || user === void 0 ? void 0 : user.current) === null || _a === void 0 ? void 0 : _a.class)) {
                        f.classList.add('active');
                        f.style.color = "black";
                        f.style.backgroundColor = f.style.borderColor;
                    }
                });
                if (ec)
                    clearInterval(cool_start);
            }));
        }
        catch (e) {
            clearInterval(cool_start);
            console.log('support usersetting error', e);
        }
    };
    (0, react_1.useEffect)(() => {
        support();
    }, [user]);
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "bb sec-box2" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "content-choice" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: "topic" }, { children: "Student Information " })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "ml-4 list-decimal" }, { children: [(0, jsx_runtime_1.jsxs)("li", { children: ["Me is \u00A0", (_a = user === null || user === void 0 ? void 0 : user.current) === null || _a === void 0 ? void 0 : _a.name] }), (0, jsx_runtime_1.jsxs)("li", { children: ["Class ", user === null || user === void 0 ? void 0 : user.current.class] })] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "content-choice" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: "topic" }, { children: "Class" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ onClick: Focus_class, className: 'btn-group classy ml-4 flex justify-around flex-wrap ' }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ name: "class", style: { borderColor: (0, service_funs_1.colorLogic)('lion'), color: (0, service_funs_1.colorLogic)('lion') }, value: 'lion', className: "btn but-size btn-outline-primary" }, { children: "Lion" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ name: "class", style: { borderColor: (0, service_funs_1.colorLogic)('cobra'), color: (0, service_funs_1.colorLogic)('cobra') }, value: "cobra", className: "btn but-size btn-outline-primary" }, { children: "Cobra" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ name: "class", style: { borderColor: (0, service_funs_1.colorLogic)('dragon'), color: (0, service_funs_1.colorLogic)('dragon') }, value: "dragon", className: "btn but-size btn-outline-primary" }, { children: "Dragon" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ name: "class", style: { borderColor: (0, service_funs_1.colorLogic)('shark'), color: (0, service_funs_1.colorLogic)('shark') }, value: "shark", className: "btn but-size btn-outline-primary" }, { children: "Shark" }))] })), " ", (0, jsx_runtime_1.jsx)("br", {})] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "confirm-but" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: Confirm, className: "btn btn-success" }, { children: "Confirm" })) }))] })));
}
exports.default = UserSetting;
//# sourceMappingURL=UserSetting.js.map