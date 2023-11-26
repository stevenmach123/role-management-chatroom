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
const model_1 = require("../../model");
const axiosService_1 = require("../../route_services/axiosService");
require("./AddUser.css");
const AuthProvider_1 = require("../LayOut/AuthProvider");
const submitted = () => {
    /* ser1.postStudent().catch(e=>{
         
     }) */
};
function UpdateInfo() {
    var _a, _b;
    let [err_ar, setEr] = (0, react_1.useState)({});
    const [success, setSuccess] = (0, react_1.useState)(false);
    const success_msg_ref = (0, react_1.useRef)('');
    const { user } = (0, AuthProvider_1.AuthP)();
    const password_ref = (0, react_1.useRef)(null);
    const name_ref = (0, react_1.useRef)(null);
    const submit = (e) => __awaiter(this, void 0, void 0, function* () {
        var _c, _d;
        e.preventDefault();
        setSuccess(false);
        setEr({});
        const err = {};
        const pas = (_c = password_ref.current) === null || _c === void 0 ? void 0 : _c.value;
        const name = (_d = name_ref.current) === null || _d === void 0 ? void 0 : _d.value;
        try {
            if (pas && name) {
                if (!model_1.password_check.test(pas))
                    err.pass = 'pass not valid';
                if (!model_1.name_check.test(name))
                    err.name = 'name not valid';
                if (Object.entries(err).length) {
                    console.log('h1');
                    setEr(err);
                    return;
                }
                else {
                    console.log('h2');
                    yield axiosService_1.ser1.postStudentUp({ name: user === null || user === void 0 ? void 0 : user.current.name, id: user === null || user === void 0 ? void 0 : user.current.id, new_name: name, new_pass: pas });
                    setSuccess(true);
                    success_msg_ref.current = "Username and Password are updated success !";
                }
            }
            else if (pas || name) {
                if (pas && !model_1.password_check.test(pas)) {
                    console.log('h3');
                    err.pass = 'pass not valid';
                    setEr(err);
                }
                else if (pas && model_1.password_check.test(pas)) {
                    console.log('h4');
                    yield axiosService_1.ser1.postStudentUp({ name: user === null || user === void 0 ? void 0 : user.current.name, id: user === null || user === void 0 ? void 0 : user.current.id, new_pass: pas });
                    success_msg_ref.current = "Password is updated success !";
                    setSuccess(true);
                }
                else if (name && !model_1.name_check.test(name)) {
                    console.log('h5');
                    err.name = 'name not valid';
                    setEr(err);
                }
                else if (name && model_1.name_check.test(name)) {
                    console.log('h6');
                    yield axiosService_1.ser1.postStudentUp({ name: user === null || user === void 0 ? void 0 : user.current.name, id: user === null || user === void 0 ? void 0 : user.current.id, new_name: name });
                    success_msg_ref.current = "Username is updated success !";
                    setSuccess(true);
                }
            }
        }
        catch (e) {
            console.log("student_update", e);
            if (e.response) {
                if (e.response.status === 400 || e.response.status === 409) {
                    err.other = e.response.data;
                    setEr(err);
                }
            }
        }
    });
    const but_pos = {
        position: "absolute",
        left: "calc(50% - 40px)",
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { children: "Note: Can choose to update 1 or both field" }), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: submit, className: "mb-5 w-1/2 mx-auto" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'form-group' }, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Name" }), (0, jsx_runtime_1.jsx)("input", { ref: name_ref, className: "form-control", name: "name" }), (0, jsx_runtime_1.jsxs)("small", Object.assign({ className: (err_ar === null || err_ar === void 0 ? void 0 : err_ar.name) && ((_a = name_ref.current) === null || _a === void 0 ? void 0 : _a.value) ? 'instruction' : 'offscreen' }, { children: [(0, jsx_runtime_1.jsx)("li", { children: "Must only alphabets " }), (0, jsx_runtime_1.jsx)("li", { children: "Up only to 2 words" })] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'form-group mb-3' }, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Password " }), (0, jsx_runtime_1.jsx)("input", { ref: password_ref, className: "form-control", name: "pass" }), (0, jsx_runtime_1.jsxs)("small", Object.assign({ className: (err_ar === null || err_ar === void 0 ? void 0 : err_ar.pass) && ((_b = password_ref.current) === null || _b === void 0 ? void 0 : _b.value) ? 'instruction' : 'offscreen' }, { children: [(0, jsx_runtime_1.jsx)("li", { children: "Must contain at least a characters" }), (0, jsx_runtime_1.jsx)("li", { children: "At least a number " }), (0, jsx_runtime_1.jsx)("li", { children: "At lease a special character" })] }))] })), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ style: but_pos, className: "btn btn-outline-success", type: "submit" }, { children: "Submit" })) })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "relative" }, { children: ((err_ar === null || err_ar === void 0 ? void 0 : err_ar.name) || (err_ar === null || err_ar === void 0 ? void 0 : err_ar.pass)) && (0, jsx_runtime_1.jsx)("small", Object.assign({ className: "same_label" }, { children: "Some information need to be corrected" })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "relative" }, { children: (err_ar === null || err_ar === void 0 ? void 0 : err_ar.other) && (0, jsx_runtime_1.jsx)("small", Object.assign({ className: "same_label" }, { children: err_ar.other })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "relative" }, { children: success && (0, jsx_runtime_1.jsx)("small", Object.assign({ className: "same_label success" }, { children: success_msg_ref.current })) }))] }) }));
}
exports.default = UpdateInfo;
//# sourceMappingURL=UpdateInfo.js.map