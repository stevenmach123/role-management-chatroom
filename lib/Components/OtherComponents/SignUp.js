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
const react_router_dom_1 = require("react-router-dom");
const model_1 = require("../../model");
const axiosService_1 = require("../../route_services/axiosService");
const service_funs_1 = require("../../route_services/service_funs");
const sign = {
    display: "block",
    position: "relative",
    left: "50%",
    width: "fit-content",
    transform: "translateX(-50%)",
    fontSize: "0.8rem"
};
const sign2 = {
    position: "absolute",
    top: "0%"
};
const instruction = {
    display: "block",
    backgroundColor: "#455d7a",
    color: "white",
    padding: "0.2rem 0rem 0rem 1rem"
};
const border = {
    border: "1px solid red"
};
const tt = {
    padding: "0.6rem 1rem "
};
const icon = {
    fontSize: "200%",
};
function SignUp() {
    var _a, _b, _c, _d;
    const [role, setRole] = (0, react_1.useState)('choose');
    const [err_ar, setEr] = (0, react_1.useState)({});
    const [err_note, setErr_note] = (0, react_1.useState)({});
    const count_er = Object.keys(err_note).length;
    const [success, setSuccess] = (0, react_1.useState)(false);
    const name_ref = (0, react_1.useRef)(null);
    const password_ref = (0, react_1.useRef)(null);
    const handle = (e) => {
        setRole(e.target.value);
    };
    const name_input = (e) => {
        const val = e.target.value;
        let s = new Map(Object.entries(err_ar));
        console.log(model_1.name_check);
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
    const password_input = (e) => {
        const val = e.target.value;
        let s = new Map(Object.entries(err_ar));
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
    const submitForm = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const name_i = e.target.name.value;
        const pass_i = e.target.pass.value;
        let eu = {};
        if (!name_i || !model_1.name_check.test(name_i)) {
            eu.name = "name not valid";
        }
        if (!pass_i || !model_1.password_check.test(pass_i)) {
            eu.pass = "pass not valid";
        }
        if (!Number(role)) {
            eu.role = "Select a role...";
        }
        if (Object.entries(err_ar).length) {
            setErr_note(eu);
            return;
        }
        try {
            let irole = [parseInt(role)];
            let student = { name: name_i, pass: pass_i, role: (0, service_funs_1.construct_role)(irole) };
            yield axiosService_1.ser1.putStudent(student);
            setErr_note({});
            setSuccess(true);
            console.log('good');
        }
        catch (e) {
            if (e === null || e === void 0 ? void 0 : e.response) {
                if (e.response.status === 409)
                    eu.name = "user is already exist";
                else
                    eu.other = "user is weird";
            }
            else
                eu.other = "No server response";
            console.log(e);
            setErr_note(eu);
        }
    });
    const checkInfo = () => {
        console.log(err_note);
        let result = false;
        for (let [k, v] of Object.entries(err_note)) {
            if (k !== 'role') {
                if (k === 'name' && err_note['name'].indexOf('exist') >= 0) {
                    return false;
                }
                else
                    result = true;
            }
        }
        return result;
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: success ? (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/signin", state: { success: "An account registered successfully" } }) :
            (0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "flex flex-col justify-center items-center  h-full " }, { children: [count_er ?
                        (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: tt, id: "dam", className: `flex justify-between  items-center text-xl ${(err_note === null || err_note === void 0 ? void 0 : err_note.other) ? "bg-orange-300" : "bg-red-300"}` }, { children: [(0, jsx_runtime_1.jsx)("i", { style: icon, className: "bi bi-x text-red-600 mr-3" }), (0, jsx_runtime_1.jsxs)("div", { children: [(err_note === null || err_note === void 0 ? void 0 : err_note.role) && (0, jsx_runtime_1.jsx)("p", { children: "Role is not selected" }), (err_note === null || err_note === void 0 ? void 0 : err_note.name) && err_note.name.indexOf('exist') >= 0 && (0, jsx_runtime_1.jsx)("p", { children: "Username existed" }), checkInfo() ? (0, jsx_runtime_1.jsx)("p", { children: "Some information need to be corrected" }) : null] })] }))
                        : null, (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: submitForm, className: "w-1/2 relative" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "form-group pb-2" }, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ className: "pb-2" }, { children: ["Username", (0, jsx_runtime_1.jsx)("span", { children: ((_a = name_ref.current) === null || _a === void 0 ? void 0 : _a.value) ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(err_ar === null || err_ar === void 0 ? void 0 : err_ar.name) ? (0, jsx_runtime_1.jsx)("i", { style: { color: 'red' }, className: "bi bi-x" }) :
                                                            (0, jsx_runtime_1.jsx)("i", { style: { color: 'green' }, className: "bi bi-check" }), "                   "] }) : null })] })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("input", { ref: name_ref, onChange: name_input, className: "w-full text-black", name: "name" }), (err_ar === null || err_ar === void 0 ? void 0 : err_ar.name) && ((_b = name_ref.current) === null || _b === void 0 ? void 0 : _b.value) && (0, jsx_runtime_1.jsxs)("small", Object.assign({ style: instruction }, { children: [(0, jsx_runtime_1.jsx)("li", { children: "Must only alphabets " }), (0, jsx_runtime_1.jsx)("li", { children: "Up only to 2 words" })] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "form-group pb-2" }, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ className: "pb-2" }, { children: ["Password", (0, jsx_runtime_1.jsx)("span", { children: ((_c = password_ref.current) === null || _c === void 0 ? void 0 : _c.value) ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (err_ar === null || err_ar === void 0 ? void 0 : err_ar.pass) ? (0, jsx_runtime_1.jsx)("i", { style: { color: 'red' }, className: "bi bi-x" }) :
                                                        (0, jsx_runtime_1.jsx)("i", { style: { color: 'green' }, className: "bi bi-check" }) }) : null })] })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("input", { ref: password_ref, onChange: password_input, className: "w-full text-black", name: "pass" }), (err_ar === null || err_ar === void 0 ? void 0 : err_ar.pass) && ((_d = password_ref.current) === null || _d === void 0 ? void 0 : _d.value) && (0, jsx_runtime_1.jsxs)("small", Object.assign({ style: instruction }, { children: [(0, jsx_runtime_1.jsx)("li", { children: "Must contain at least a characters" }), (0, jsx_runtime_1.jsx)("li", { children: "At least a number " }), (0, jsx_runtime_1.jsx)("li", { children: "At lease a special character" })] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "input-group mb-2" }, { children: (0, jsx_runtime_1.jsxs)("select", Object.assign({ onChange: handle, value: role, className: "custom-select text-black", id: "is01" }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "choose" }, { children: "Roles..." })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "3" }, { children: "User" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "2" }, { children: "Group Manager" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "1" }, { children: "Admin" }))] })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "relative" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", style: sign, className: "btn btn-outline-primary" }, { children: "Sign Up" })), (0, jsx_runtime_1.jsxs)("span", Object.assign({ style: sign2 }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: "/signin", className: "text-sm underline font-bold  decoration-orange-400  text-orange-400 hover:text-orange-400 " }, { children: " Login" })), " "] }))] }))] }))] })) }));
}
exports.default = SignUp;
//# sourceMappingURL=SignUp.js.map