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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
const axiosService_1 = require("../../route_services/axiosService");
const AuthProvider_1 = require("../LayOut/AuthProvider");
const Sign_1 = __importDefault(require("./Sign"));
const img = {
    maxWidth: '2rem',
    display: 'inline-block',
    pointerEvents: 'auto',
    cursor: 'pointer',
};
const div = {
    border: "1px solid red",
};
const log = {
    justifySelf: 'center',
    position: "relative",
    left: "50%",
    width: "fit-content",
    transform: "translateX(-50%)",
    fontSize: '0.8rem'
};
const tt = {
    padding: "0.6rem 1rem "
};
const log2 = {
    position: "relative",
    /*left:"50%",  with absolute, still coordinate with parent */
};
const Login = () => {
    var _a;
    const linku = (0, react_router_dom_2.useLocation)();
    const [inIndex, setInIndex] = (0, react_1.useState)();
    const { user, setfresh, signin, signinG, signinF, f } = (0, AuthProvider_1.AuthP)();
    const [err, setErr] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        setTimeout(() => {
            linku.state = {};
            setInIndex(linku.state);
        }, 3000);
    }, []);
    const submitForm = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const name = e.target.name.value;
        const pass = e.target.pass.value;
        if (!name || !pass)
            return;
        const x = new URLSearchParams();
        x.set('name', name);
        x.set('pass', pass);
        try {
            f === null || f === void 0 ? void 0 : f.setGenLoading(true);
            let res = yield axiosService_1.ser1.getStudent(x);
            if (signin)
                yield signin(res.data);
            navigate('/home');
            //setUser(res.data)
            if (user) {
                user.current = res.data;
            }
        }
        catch (e) {
            if (e === null || e === void 0 ? void 0 : e.response) {
                console.log(e.response.status, e.response.statusText);
                if (e.response.status === 400 || e.response.status === 401)
                    setErr(true);
            }
            else if (e.request)
                console.log(e.request);
            else
                console.log('No response');
        }
        finally {
            f === null || f === void 0 ? void 0 : f.setGenLoading(false);
        }
    });
    //console.log(linku) 
    console.log(user);
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "flex flex-col justify-center items-center   h-full" }, { children: [((_a = linku.state) === null || _a === void 0 ? void 0 : _a.success) ?
                (0, jsx_runtime_1.jsx)(Sign_1.default, { info: 'success', message: (0, jsx_runtime_1.jsx)("p", { children: "Register user success " }) })
                : null, err && (0, jsx_runtime_1.jsx)(Sign_1.default, { info: 'error', error: err, message: (0, jsx_runtime_1.jsx)("p", { children: "Username and/or Password not correct " }) }), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { opacity: (f === null || f === void 0 ? void 0 : f.gen_loading) ? 1 : 0 }, className: "wrapper" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'sign' }, { children: (0, jsx_runtime_1.jsx)(Sign_1.default, { message: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Loading" }) }) })) })), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: submitForm, className: "w-1/2 relative" }, { children: ["  ", (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "form-group pb-2" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "pb-2" }, { children: "Username" })), " ", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("input", { className: "w-full text-black", name: "name" })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "form-group pb-2 " }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "pb-2" }, { children: "Password" })), "   ", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("input", { className: "w-full text-black", name: "pass" })] })), " ", (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: log2, className: 'text-sm ' }, { children: [" Need Account?  ", (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: "/signup", className: "underline font-bold  decoration-orange-400  text-orange-400  " }, { children: " Sign Up" }))] })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ style: log, type: "submit", className: "btn btn-outline-primary" }, { children: "SignIn" })), "  "] })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-1/2 flex gap-3 pt-2 relative" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ onClick: signinG, style: img }, { children: [" ", (0, jsx_runtime_1.jsx)("img", { src: "/google_img.png" }), " "] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ onClick: signinF, style: img }, { children: [" ", (0, jsx_runtime_1.jsx)("img", { src: "/facebook_img.jpeg" })] }))] }))] })));
};
exports.default = Login;
//# sourceMappingURL=SignIn.js.map