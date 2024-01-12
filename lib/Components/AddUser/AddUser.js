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
exports.loader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
require("./AddUser.css");
const react_router_dom_1 = require("react-router-dom");
const model_1 = require("../../model");
const axiosService_1 = require("../../route_services/axiosService");
const service_funs_1 = require("../../route_services/service_funs");
const display = "w-1/2 mx-auto";
const but_pos = {
    position: "absolute",
    left: "calc(50% - 40px)",
};
let student = {};
function AddUser() {
    var _a, _b, _c, _d;
    let fres = (0, react_router_dom_1.useActionData)();
    let [err_ar, setEr] = (0, react_1.useState)(fres);
    const success = (0, react_1.useRef)(null);
    const [role, setRole] = (0, react_1.useState)();
    const password_ref = (0, react_1.useRef)(null);
    const name_ref = (0, react_1.useRef)(null);
    const Timy = (div_ref) => __awaiter(this, void 0, void 0, function* () {
        var _e, _f, _g, _h, _j;
        const div = div_ref.current; // not the new one, when new state triggered to render new html
        const time = (time) => {
            return new Promise((resolve) => {
                setTimeout(resolve, time);
            });
        };
        //console.log(div?.className);
        yield time(100);
        if (!div_ref.current) {
            console.log("mydi ", div_ref.current);
        }
        (_e = div_ref.current) === null || _e === void 0 ? void 0 : _e.classList.remove('off');
        (_f = div_ref.current) === null || _f === void 0 ? void 0 : _f.classList.remove('display');
        (_g = div_ref.current) === null || _g === void 0 ? void 0 : _g.classList.add('display');
        yield time(1300);
        let l = 0;
        while (l < 2 && (fres === null || fres === void 0 ? void 0 : fres.sucess)) { // !error WORKED. div_ref.current WORKED. div = div_ref.current NOT WORKED
            console.log("time2");
            //await Promise.all([time2(1200),div?.classList.add('off'),time2(1200),div?.classList.remove('off')])
            (_h = div_ref.current) === null || _h === void 0 ? void 0 : _h.classList.add('off');
            yield time(1100);
            (_j = div_ref.current) === null || _j === void 0 ? void 0 : _j.classList.remove('off');
            yield time(1100);
            l++;
        }
    });
    const submitted = () => {
        axiosService_1.ser1.putStudent(student).then(r => {
            console.log("post suceed ");
            setEr(undefined);
            Timy(success);
        }).catch((e) => {
            if (e === null || e === void 0 ? void 0 : e.response) {
                //error_ref.current ={}
                //error_ref.current["same"] =Object.assign([],r.data)[0];
                //setDummy(0);
                if (e.response.status === 409 || e.response.status === 402) {
                    setEr({ other: e.response.data });
                }
                else {
                    setEr({ other: "user post is weird" });
                }
                console.log('post error');
            }
            else {
                setEr({ other: "No server response" });
            }
            console.log(e);
        });
    };
    console.log("state00", err_ar);
    //console.log("dum ",dum);
    //console.log("div ",success.current?.className)  // always go before
    (0, react_1.useEffect)(() => {
        student.class = "";
    }, []);
    (0, react_1.useEffect)(() => {
        if (fres && (fres === null || fres === void 0 ? void 0 : fres.sucess)) //not undefined  // if(!error) WORKED success.current WORKED
            submitted();
        return () => {
            console.log("effect return", fres);
        };
    }, [fres]);
    const password_input = (e) => {
        const val = e.target.value;
        let s = !err_ar ? new Map() : new Map(Object.entries(err_ar));
        if (!val || !model_1.password_check.test(val)) {
            s.set('pass', "pass not valid");
            let t = Object.fromEntries(s.entries());
            setEr(t);
        }
        else {
            s.delete("pass");
            let t = Object.fromEntries(s.entries());
            setEr(t);
        }
    };
    const name_input = (e) => {
        const val = e.target.value;
        let s = !err_ar ? new Map() : new Map(Object.entries(err_ar));
        if (!val || !model_1.name_check.test(val)) {
            s.set('name', "name not valid");
            let t = Object.fromEntries(s.entries());
            setEr(t);
        }
        else {
            s.delete("name");
            let t = Object.fromEntries(s.entries());
            setEr(t);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "div_big" }, { children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Form, Object.assign({ className: `mb-5 ${display}`, method: "post" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `form-group` }, { children: [(0, jsx_runtime_1.jsxs)("label", { children: ["Name ", (0, jsx_runtime_1.jsx)("span", { children: err_ar && ((_a = name_ref.current) === null || _a === void 0 ? void 0 : _a.value) ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: err_ar.name ?
                                                (0, jsx_runtime_1.jsx)("i", { style: { color: 'red' }, className: "bi bi-x" }) :
                                                (0, jsx_runtime_1.jsx)("i", { style: { color: 'green' }, className: "bi bi-check" }) })
                                            : null })] }), (0, jsx_runtime_1.jsx)("input", { ref: name_ref, className: "form-control", name: "name", onChange: name_input }), (0, jsx_runtime_1.jsxs)("small", Object.assign({ className: (err_ar === null || err_ar === void 0 ? void 0 : err_ar.name) && ((_b = name_ref.current) === null || _b === void 0 ? void 0 : _b.value) ? 'instruction' : 'offscreen' }, { children: [(0, jsx_runtime_1.jsx)("li", { children: "Must only alphabets " }), (0, jsx_runtime_1.jsx)("li", { children: "Up only to 2 words" })] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `form-group mb-3` }, { children: [(0, jsx_runtime_1.jsxs)("label", { children: ["Password ", (0, jsx_runtime_1.jsx)("span", { children: err_ar && ((_c = password_ref.current) === null || _c === void 0 ? void 0 : _c.value) ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: err_ar.pass ? (0, jsx_runtime_1.jsx)("i", { style: { color: 'red' }, className: "bi bi-x" })
                                                : (0, jsx_runtime_1.jsx)("i", { style: { color: 'green' }, className: "bi bi-check" }) }) : null })] }), (0, jsx_runtime_1.jsx)("input", { ref: password_ref, onChange: password_input, className: "form-control", name: "pass" }), (0, jsx_runtime_1.jsx)("small", Object.assign({ className: (err_ar === null || err_ar === void 0 ? void 0 : err_ar.pass) && ((_d = password_ref.current) === null || _d === void 0 ? void 0 : _d.value) ? 'instruction' : 'offscreen' }, { children: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("li", { children: "Must contain at least a characters" }), (0, jsx_runtime_1.jsx)("li", { children: "At least a number " }), (0, jsx_runtime_1.jsx)("li", { children: "At lease a special character" })] }) }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "input-group mb-2" }, { children: (0, jsx_runtime_1.jsxs)("select", Object.assign({ name: "role", onChange: e => setRole(e.target.value), value: role, className: "custom-select  text-black", id: "is01" }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "choose" }, { children: "Roles..." })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "3" }, { children: "User" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "2" }, { children: "Group Manager" }))] })) })), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ style: but_pos, className: "btn btn-outline-success", type: "submit" }, { children: "Submit" })) })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "relative" }, { children: (fres === null || fres === void 0 ? void 0 : fres.sucess) && !(err_ar === null || err_ar === void 0 ? void 0 : err_ar.other) ? (0, jsx_runtime_1.jsx)("label", Object.assign({ ref: success, className: `suc_label` }, { children: fres.sucess })) : null })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "relative" }, { children: [" ", (fres === null || fres === void 0 ? void 0 : fres.sucess) && (err_ar === null || err_ar === void 0 ? void 0 : err_ar.other) ? (0, jsx_runtime_1.jsx)("small", Object.assign({ className: "same_label" }, { children: err_ar.other })) : null] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "relative" }, { children: ((fres === null || fres === void 0 ? void 0 : fres.name) || (fres === null || fres === void 0 ? void 0 : fres.pass)) && (0, jsx_runtime_1.jsx)("small", Object.assign({ className: "same_label" }, { children: "Some information need to be corrected" })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "relative" }, { children: [(fres === null || fres === void 0 ? void 0 : fres.role) && (0, jsx_runtime_1.jsx)("small", Object.assign({ className: "same_label" }, { children: "Role is not selected" })), " "] }))] })));
}
exports.default = AddUser;
/*typeof error=='object'*/
function loader({ request }) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const x = yield request.formData();
        const name = (_a = x.get("name")) === null || _a === void 0 ? void 0 : _a.toString();
        const pass = (_b = x.get("pass")) === null || _b === void 0 ? void 0 : _b.toString();
        const role = (_c = x.get('role')) === null || _c === void 0 ? void 0 : _c.toString();
        console.log(role);
        const id_check = /^\d+$/gm;
        student.admit = false;
        const error = {};
        if (!Number(role)) {
            error['role'] = 'role not valid';
        }
        if (!name || !model_1.name_check.test(name)) {
            error["name"] = "name not valid";
        }
        if (!pass || !model_1.password_check.test(pass)) {
            error["pass"] = "pass not valid";
        }
        if (Object.keys(error).length > 0)
            return error;
        //throw new Response("ss",{status:400})
        let irole = [parseInt(role)];
        student.name = name;
        student.pass = pass;
        student.role = (0, service_funs_1.construct_role)(irole);
        return { sucess: "Submission is valid, new student added" };
    });
}
exports.loader = loader;
//# sourceMappingURL=AddUser.js.map