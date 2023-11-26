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
exports.User = exports.loader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const axios_1 = require("axios");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const axiosService_1 = require("../../route_services/axiosService");
const ErrorUser_1 = __importDefault(require("../OtherComponents/ErrorUser"));
require("./User.css");
const react_router_dom_2 = require("react-router-dom");
const AuthProvider_1 = require("../LayOut/AuthProvider");
const service_funs_1 = require("../../route_services/service_funs");
const model_1 = require("../../model");
require("../LayOut/Back.css");
let height_manage = 0;
function loader(seg) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        //throw json("bonjo error",{status:402});
        //throw {error:"dd"};
        //return ser1.getStudent(seg.params.obj).then(x=>{console.log("-",x.data); return json("xx",{status:400}) ;return json(JSON.stringify({error:'hi'}),{status:400})  })   //not good
        //return defer({mt:ser1.getStudent(seg.params.obj).then(x=>{console.log("-",x.data);throw json({error:'hi'},{status:200}) }) })  // remember have errorElement={<></>} or x.catch()
        //return defer({mt:ser1.getStudent(seg.params.obj).then(x=>{console.log("-",x.data); /*return {data:"bad made up",error:404} }*/   }) })
        //return defer({mt:ser1.getStudent(seg.params.obj).then(x=>{return json(JSON.stringify({error:'hi'}),{status:200})    }) })  
        yield (0, model_1.Sleep)(1);
        return (0, react_router_dom_1.defer)({ mt: axiosService_1.ser1.getNStudent((_a = seg.params) === null || _a === void 0 ? void 0 : _a.obj, { 'id_token': service_funs_1.toen.t }).then(x => { console.log("-", x.data); return x.data; throw (0, react_router_dom_1.json)({ error: 'hi' }, { status: 200 }); })
                .catch((e) => {
                if ((0, axios_1.isAxiosError)(e)) {
                    return e;
                }
                else {
                    console.log("ya", e);
                    return { error: "resolved" };
                }
            })
        });
    });
}
exports.loader = loader;
const User = ({ rx }) => {
    const param = (0, react_router_dom_1.useParams)();
    const { search } = (0, react_router_dom_1.useLocation)();
    const x = (0, react_router_dom_1.useLoaderData)();
    const { class_template, vvv, user } = (0, AuthProvider_1.AuthP)();
    const [stu, setStu] = (0, react_1.useState)();
    const { setUsers, users, current_path } = (0, react_router_dom_2.useOutletContext)();
    const navigate = (0, react_router_dom_2.useNavigate)();
    const [type_ram, setType] = (0, react_router_dom_2.useSearchParams)();
    const [mshow, setMshow] = (0, react_1.useState)(true);
    const [mshow2, setMshow2] = (0, react_1.useState)(false);
    console.log('student', stu);
    const Focus_class = (e) => {
        e.preventDefault();
        const ex = document.querySelectorAll('.btn-group.classy .btn');
        ex.forEach(f => {
            f.classList.remove("active");
            f.style.removeProperty('background-color');
            f.style.removeProperty('color');
            f.style.color = f.style.borderColor;
        });
        if (!(e === null || e === void 0 ? void 0 : e.target))
            return;
        e.target.classList.add("active");
        e.target.style.color = "black";
        e.target.style.backgroundColor = e.target.style.borderColor;
    };
    const Focus_class2 = (e) => {
        e.preventDefault();
        const ex = document.querySelectorAll('.btn-group.role .btn');
        setMshow2(false);
        ex.forEach(f => {
            f.classList.remove("active");
        });
        if (!(e === null || e === void 0 ? void 0 : e.target.value))
            return;
        e.target.classList.add('active');
        if (e.target.value === '2') {
            setMshow2(true);
        }
    };
    const Del = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = yield (vvv === null || vvv === void 0 ? void 0 : vvv.getIdToken());
            const us = yield axiosService_1.ser1.deleteStudent(id, { 'id_token': token });
            yield axiosService_1.ser1.deleteUser(id);
            const us_data = us.data;
            setUsers(us_data);
            let my_type = stu === null || stu === void 0 ? void 0 : stu.class;
            let users_exist = us_data.find(u => u.class === my_type);
            if (users_exist) {
                if (!type_ram.get('type')) {
                    navigate(`${current_path.pathname}`);
                }
                else if (type_ram.get('type')) {
                    navigate(`${current_path.pathname}?${type_ram}`);
                }
                else {
                    navigate(`${current_path.pathname}`);
                }
            }
            else {
                yield axiosService_1.ser1.deleteType(my_type);
                if (!type_ram.get('type')) {
                    navigate(`${current_path.pathname}`);
                }
                else if (type_ram.get('type') === my_type) {
                    navigate(`${current_path.pathname}`);
                }
                else
                    navigate(`${current_path.pathname}?${type_ram}`);
            }
            let ob_ram = new URLSearchParams({ id: id });
            yield axiosService_1.ser1.delete_indi_structure(ob_ram);
        }
        catch (e) {
            if (!(e === null || e === void 0 ? void 0 : e.response))
                console.log('Delete server error ', e);
            else if (e.response.status === 403) {
                console.log('Delete student not success', e.response.data);
            }
            else if (e.response.status === 405) {
                console.log("Delete type not success", e.response.data);
            }
            else if (e.response.status === 415)
                (0, react_router_dom_2.Navigate)({ to: '/signin' });
            else if (e.response.status === 402) {
                console.log('indi structure delete er', e);
            }
        }
    });
    if (x.mt) {
        x.mt.then((t) => {
            if (t.ok) {
                console.log("success");
                //console.log(t.json()) not work, not sure why even t.ok = true/false
            }
            else {
                console.log("unsuccessful");
                if (t.response || t.request) {
                    console.log(t);
                    return "no no";
                }
            }
            // return t.clone().json()
            return '';
        }).then((data) => {
            console.log(data);
        })
            .catch((e) => console.log("mt error ", e));
    }
    const support = () => {
        let cool_start;
        let count = 0;
        try {
            cool_start = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
                if (count === 10)
                    clearInterval(cool_start);
                const student = (yield x.mt);
                setStu(student);
                //setMshow(true);
                setMshow2(false);
                const ec = document.querySelectorAll(`.btn-group.classy .btn`);
                const er = document.querySelectorAll(`.btn-group.role .btn`);
                const manages = document.querySelectorAll('.manage-choice .manage-class');
                manages.forEach(f => {
                    f.checked = false;
                });
                ec.forEach(f => {
                    f.classList.remove("active");
                    f.style.removeProperty('background-color');
                    f.style.removeProperty('color');
                    f.style.color = f.style.borderColor;
                });
                er.forEach(f => {
                    f.classList.remove("active");
                });
                console.log('tick', er.length, ec.length);
                ec.forEach(f => {
                    if (f.value === (student === null || student === void 0 ? void 0 : student.class) && (student === null || student === void 0 ? void 0 : student.class)) {
                        f.classList.add('active');
                        f.style.color = "black";
                        f.style.backgroundColor = f.style.borderColor;
                    }
                    else if (!f.value && !(student === null || student === void 0 ? void 0 : student.class)) {
                        console.log(f.value, student.class);
                        f.classList.add('active');
                    }
                });
                if (student.role) {
                    const v = student.role;
                    er.forEach(f => {
                        if (f.value === Math.min(...Object.values(v)).toString()) {
                            f.classList.add('active');
                            if (f.value === '2')
                                setMshow2(true);
                        }
                    });
                    if ((0, service_funs_1.identifyRole)(student.role) === 2 && student.manage) {
                        manages.forEach(x => {
                            var _a;
                            const f = x;
                            if ((_a = student.manage) === null || _a === void 0 ? void 0 : _a.includes(f.id))
                                f.checked = true;
                        });
                    }
                }
                //await Sleep(1)
                const box = document.querySelector('.manage-choice');
                if (box && !mshow) {
                    console.log("shrink");
                    box.style.maxHeight = '0px';
                }
                count++;
                if (er.length && ec.length)
                    clearInterval(cool_start);
            }), 200);
        }
        catch (e) {
            clearInterval(cool_start);
            console.log('support user error', e);
        }
    };
    (0, react_1.useEffect)(() => {
        support();
    }, [x.mt]);
    const Confirm = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const classy = document.querySelector(".btn-group.classy .btn.active");
        const role = document.querySelector(".btn-group.role .btn.active");
        const manages = document.querySelectorAll('.manage-choice .manage-class');
        const token = yield (vvv === null || vvv === void 0 ? void 0 : vvv.getIdToken());
        let bodies = {};
        bodies['class'] = '';
        bodies['role'] = '3';
        bodies['manage'] = [];
        try {
            if (!classy || !role)
                throw "missing one choice";
            bodies['class'] = classy.value;
            bodies['role'] = (0, service_funs_1.construct_role)([parseInt(role.value)]);
            let temp_manage = [];
            manages.forEach((x) => {
                let f = x;
                if (f.checked)
                    temp_manage.push(x.id);
            });
            bodies['manage'] = temp_manage;
            const param = new URLSearchParams();
            param.set('name', stu === null || stu === void 0 ? void 0 : stu.name);
            param.set('id', stu === null || stu === void 0 ? void 0 : stu.id);
            bodies['name'] = stu === null || stu === void 0 ? void 0 : stu.name;
            bodies['id'] = stu === null || stu === void 0 ? void 0 : stu.id;
            const student = yield axiosService_1.ser1.getNStudent(param, { 'id_token': token });
            const old_class = student.data.class;
            const ref = yield axiosService_1.ser1.postStudent(bodies, { 'id_token': token });
            const new_class = ref.data.student.class;
            const all_student = ref.data.allstudent;
            if (new_class)
                yield axiosService_1.ser1.postTypes([new_class]);
            if (old_class !== new_class && old_class) {
                const types = yield axiosService_1.ser1.getAllTypes();
                let cond = types.data.find(type => type === old_class);
                if (!cond) {
                    yield axiosService_1.ser1.deleteType(old_class);
                    if (type_ram.get('type') === old_class)
                        navigate(`${current_path.pathname}`);
                }
            }
            setUsers(all_student);
            /*
                cobra  -> none/
            */
        }
        catch (e) {
            if (e === null || e === void 0 ? void 0 : e.response) {
                console.log("edit user", e.response.status, e.response.data);
                if (e.response.status === 415)
                    (0, react_router_dom_2.Navigate)({ to: '/signin' });
            }
            else
                console.log("edit user", e);
        }
    });
    (0, react_1.useEffect)(() => {
        const box = document.querySelector('.manage-choice');
        console.log(mshow, height_manage);
        if (box) {
            height_manage = Math.max(height_manage, box.clientHeight);
            if (mshow)
                box.style.maxHeight = height_manage.toString() + "px";
            else
                box.style.maxHeight = '0px';
        }
    }, [mshow]);
    const pa2 = new URLSearchParams(param.obj);
    const pa = new URLSearchParams(search);
    //console.log(pa);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(react_1.Suspense, Object.assign({ fallback: (0, jsx_runtime_1.jsx)("span", { children: "Waiting..." }) }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Await, Object.assign({ resolve: x.mt, errorElement: (0, jsx_runtime_1.jsx)(ErrorUser_1.default, {}) }, { children: (student) => ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "px-4 py-2" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "content-choice" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: "topic" }, { children: "Student Information " })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "ml-4 list-decimal" }, { children: [(student === null || student === void 0 ? void 0 : student.error) && (0, jsx_runtime_1.jsxs)("li", { children: ["ok throw:", student === null || student === void 0 ? void 0 : student.error, "-", student === null || student === void 0 ? void 0 : student.data] }), (student === null || student === void 0 ? void 0 : student.body) && (0, jsx_runtime_1.jsxs)("li", { children: ["ok throw: ", String(student.ok)] }), (0, jsx_runtime_1.jsxs)("li", { children: ["Me is \u00A0", pa2.get('name')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["Id: ", student === null || student === void 0 ? void 0 : student.id] }), (student === null || student === void 0 ? void 0 : student.pass) && (0, jsx_runtime_1.jsxs)("li", { children: ["Pass: ", student === null || student === void 0 ? void 0 : student.pass] }), (student === null || student === void 0 ? void 0 : student.class) && (0, jsx_runtime_1.jsxs)("li", { children: ["Class: ", student === null || student === void 0 ? void 0 : student.class] }), (0, jsx_runtime_1.jsxs)("li", { children: ["Role: ", (0, service_funs_1.identifyRole2)(student === null || student === void 0 ? void 0 : student.role)] }), (student === null || student === void 0 ? void 0 : student.email) && (0, jsx_runtime_1.jsx)("li", { children: student === null || student === void 0 ? void 0 : student.email })] }))] })), typeof service_funs_1.colorLogic === 'function' &&
                            (0, jsx_runtime_1.jsxs)("section", Object.assign({ style: { display: (0, service_funs_1.identifyRole)(user === null || user === void 0 ? void 0 : user.current.role) < ((0, service_funs_1.identifyRole)(student === null || student === void 0 ? void 0 : student.role)) ? 'block' : 'none' } }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "content-choice" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: "topic" }, { children: "Class" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ onClick: Focus_class, className: 'btn-group classy ml-4 flex justify-around flex-wrap ' }, { children: [class_template === null || class_template === void 0 ? void 0 : class_template.map(myclass => ((0, jsx_runtime_1.jsx)("button", Object.assign({ name: "class", style: { borderColor: (0, service_funs_1.colorLogic)(myclass), color: (0, service_funs_1.colorLogic)(myclass) }, value: myclass, className: "btn but-size btn-outline-primary" }, { children: (0, service_funs_1.upperOne)(myclass) })))), (0, jsx_runtime_1.jsx)("button", Object.assign({ name: "class", value: "", className: "btn but-size btn-outline-light" }, { children: "None" }))] })), " ", (0, jsx_runtime_1.jsx)("br", {})] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "content-choice relative" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: "topic" }, { children: "User role" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ onClick: Focus_class2, className: 'btn-group role ml-4' }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ name: "role", value: "3", className: "btn but-size btn-outline-light" }, { children: "User" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ name: "role", value: "2", className: "btn but-size btn-outline-info" }, { children: "Group Manager" }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { color: '#E4A11B', display: mshow2 ? 'inline-block' : 'none', width: 'fit-content', border: '', transform: 'translate(0,15%)' } }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: e => setMshow(!mshow), style: { display: !mshow ? 'block' : 'none' }, className: "no_button" }, { children: (0, jsx_runtime_1.jsx)("i", { style: { fontSize: '2.5rem' }, className: "bi bi-caret-down" }) })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: e => setMshow(!mshow), style: { display: mshow ? 'block' : 'none' }, className: "no_button" }, { children: (0, jsx_runtime_1.jsx)("i", { style: { fontSize: '2.5rem' }, className: "bi bi-caret-up" }) }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { display: mshow2 ? 'grid' : 'none' }, className: "ml-4 manage-choice" }, { children: class_template === null || class_template === void 0 ? void 0 : class_template.map((myclass) => (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "choice" }, { children: [(0, jsx_runtime_1.jsx)("input", { id: myclass, className: "form-check-input manage-class", type: "checkbox", value: myclass }, myclass), (0, jsx_runtime_1.jsx)("span", { children: (0, service_funs_1.upperOne)(myclass) })] }))) }))] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "text-md text-red-500 underline decoration-solid decoration-2 decoration-red-500" }, { children: "SENSITIVE ZONE" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: e => { (0, service_funs_1.openModal)('delete'); }, className: "btn but-size btn-danger" }, { children: "Delete User" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "confirm-but" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: Confirm, className: "btn but-size btn-success" }, { children: "Confirm" })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ onClick: e => (0, service_funs_1.closeModal)('delete'), className: "wrapper", id: "delete" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "modall", id: "delete" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "modal-header" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "context" }, { children: ["Are you sure delete ", student === null || student === void 0 ? void 0 : student.name, " ?"] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "close", onClick: e => (0, service_funs_1.closeModal)('delete') }, { children: "x" }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "context" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: e => { (0, service_funs_1.closeModal)('delete'); Del(student.id); }, className: "btn btn-success" }, { children: "Yes" })) }))] })) }))] }))) })) })) }));
};
exports.User = User;
//# sourceMappingURL=User.js.map