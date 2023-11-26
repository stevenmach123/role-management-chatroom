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
const model_1 = require("../../model");
const axiosService_1 = require("../../route_services/axiosService");
require("./ChatRoom.css");
const AuthProvider_1 = require("../LayOut/AuthProvider");
const react_router_dom_1 = require("react-router-dom");
const service_funs_1 = require("../../route_services/service_funs");
const firestore_1 = require("firebase/firestore");
const Alert_1 = __importDefault(require("react-bootstrap/Alert"));
const qs_1 = __importDefault(require("qs"));
function ChatRoom() {
    const { user, cate, myusers, class_template, vvv } = (0, AuthProvider_1.AuthP)();
    const cate_ar = Object.entries(cate);
    const [type_ram, setType] = (0, react_router_dom_1.useSearchParams)();
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [allowedCate, setAllowedCate] = (0, react_1.useState)([]);
    const [users, setUsers] = (0, react_1.useState)([]);
    const [Msg, setMsg] = (0, react_1.useState)([]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const typeFind = (e, type) => {
        setType(cur_type => {
            cur_type.delete('user');
            if (type)
                cur_type.set("type", type);
            else
                cur_type.delete("type");
            return cur_type;
        });
    };
    (0, react_1.useEffect)(() => {
        const x = myusers && type_ram.get('type') ? myusers.filter(u => (u === null || u === void 0 ? void 0 : u.class) === type_ram.get('type') || ((u === null || u === void 0 ? void 0 : u.manage) && u.manage.includes(type_ram.get('type'))) || (0, service_funs_1.identifyRole)(u.role) === 1) : [];
        x.sort(sort_sup);
        setUsers(x);
        support_navi_indi();
    }, [type_ram.get('type'), myusers]);
    const sort_sup = (a, b) => {
        const ra = (0, service_funs_1.identifyRole)(a.role);
        const rb = (0, service_funs_1.identifyRole)(b.role);
        if (ra === rb) {
            return a.id === (user === null || user === void 0 ? void 0 : user.current.id) && b.id !== (user === null || user === void 0 ? void 0 : user.current.id) ? -1 : 1;
        }
        return ra - rb;
    };
    const support_type_msg = () => __awaiter(this, void 0, void 0, function* () {
        try {
            if (type_ram.get('type')) {
                const v = (0, firestore_1.collection)(AuthProvider_1.db, `${type_ram.get('type')}_msg`);
                const qv = (0, firestore_1.query)(v, (0, firestore_1.orderBy)('time'), (0, firestore_1.where)('time', '!=', ""));
                const d = yield (0, firestore_1.getDocs)(qv);
                const dmap = d.docs.map(t => {
                    return Object.assign(Object.assign({}, t.data()), { docid: t.id });
                });
                setMsg(dmap);
            }
        }
        catch (e) {
            console.log('switch group', e);
        }
    });
    const support_navi_indi = () => __awaiter(this, void 0, void 0, function* () {
        try {
            let obj = {};
            const token = yield (vvv === null || vvv === void 0 ? void 0 : vvv.getIdToken());
            if (type_ram.get('user')) {
                obj['name'] = indi_user.current.name;
                obj['id'] = indi_user.current.id;
                const stu = (yield axiosService_1.ser1.getNStudent(obj, { 'id_token': token })).data;
                if (stu.class !== type_ram.get('type')) {
                    type_ram.delete('user');
                    setType(type_ram);
                }
            }
        }
        catch (e) {
            if (e.response.status === 400 || e.response.status === 401) {
                type_ram.delete('user');
                setType(type_ram);
            }
        }
    });
    (0, react_1.useEffect)(() => {
        support_type_msg();
    }, [type_ram.get('type')]);
    (0, react_1.useEffect)(() => {
        const support = () => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            console.log("chatroom  user", cate);
            if ((0, service_funs_1.identifyRole)(user === null || user === void 0 ? void 0 : user.current.role) === 1) {
                setAllowedCate(cate_ar);
            }
            else if ((0, service_funs_1.identifyRole)(user === null || user === void 0 ? void 0 : user.current.role) === 2) {
                let o = ((_a = user === null || user === void 0 ? void 0 : user.current) === null || _a === void 0 ? void 0 : _a.manage) && ((_b = user === null || user === void 0 ? void 0 : user.current) === null || _b === void 0 ? void 0 : _b.manage.length) > 0 ? cate_ar.filter(v => user.current.manage.includes(v[0])) : [];
                if ((user === null || user === void 0 ? void 0 : user.current.class) && !o.find(v => v[0] === (user === null || user === void 0 ? void 0 : user.current.class))) {
                    const idx = cate_ar.findIndex(v => (user === null || user === void 0 ? void 0 : user.current.class) === v[0]);
                    if (idx > -1)
                        o.push(cate_ar[idx]);
                }
                //console.log(user?.current.class,o)
                setAllowedCate(o);
            }
            else {
                let o = cate_ar.filter(x => { var _a; return x[0] === ((_a = user === null || user === void 0 ? void 0 : user.current) === null || _a === void 0 ? void 0 : _a.class); });
                setAllowedCate(o);
            }
            if (type_ram.get('type')) {
                const types = (yield axiosService_1.ser1.getAllTypes()).data;
                if (!types.includes(type_ram.get('type'))) {
                    setType('');
                }
                else if ((user === null || user === void 0 ? void 0 : user.current.manage) && !(user === null || user === void 0 ? void 0 : user.current.manage).includes(type_ram.get('type')))
                    setType('');
            }
            setLoading(false);
        });
        support();
    }, [user === null || user === void 0 ? void 0 : user.current, cate]);
    const addText = () => __awaiter(this, void 0, void 0, function* () {
        let inputMe = document.querySelector('.input-me');
        const x = {};
        try {
            x['text'] = inputMe.value;
            x['name'] = user === null || user === void 0 ? void 0 : user.current.name;
            x['id'] = user === null || user === void 0 ? void 0 : user.current.id;
            if (!type_ram.get('user')) {
                x['type'] = type_ram.get('type');
                yield axiosService_1.axios1.post('/msg/type', x);
            }
            else {
                x['to_id'] = indi_user.current.id;
                x['from_id'] = user === null || user === void 0 ? void 0 : user.current.id;
                yield axiosService_1.axios1.post('/msg/indi', x);
            }
        }
        catch (e) {
            if (e === null || e === void 0 ? void 0 : e.response)
                console.log('addText', e.response.data);
            else
                console.log('addText', e.request);
        }
        inputMe.value = '';
    });
    const colorByGroup = (uz, ...option) => {
        if (!option.length) {
            const u = uz;
            if (u === null || u === void 0 ? void 0 : u.manage) {
                if (u.manage.find(x => x === type_ram.get('type')))
                    return (0, service_funs_1.colorRole)(u.role);
                else
                    return 'white';
            }
            else
                return (0, service_funs_1.colorRole)(u.role);
        }
        else {
            const u = myusers === null || myusers === void 0 ? void 0 : myusers.find((u) => u.id === uz);
            if (u && (u === null || u === void 0 ? void 0 : u.manage)) {
                if (u.manage.find(x => x === type_ram.get('type')))
                    return (0, service_funs_1.colorRole)(u.role);
                else
                    return 'white';
            }
            else
                return (0, service_funs_1.colorRole)(u === null || u === void 0 ? void 0 : u.role);
        }
    };
    const clear = (ee) => __awaiter(this, void 0, void 0, function* () {
        try {
            const token = yield (vvv === null || vvv === void 0 ? void 0 : vvv.getIdToken());
            if (type_ram.get('type')) {
                yield axiosService_1.axios1.delete(`/msg/types/${type_ram.get('type')}`, { headers: { 'id_token': token }, params: { roles: ['admin'] }, paramsSerializer: params => {
                        return qs_1.default.stringify(params, { arrayFormat: "repeat" });
                    } });
                console.log('clear success');
            }
        }
        catch (e) {
            const notice = document.querySelector('.warn-admin');
            ee.target.disabled = true;
            notice.classList.add('active');
            yield (0, model_1.Sleep)(2000);
            ee.target.disabled = false;
            notice.classList.remove('active');
            if (e === null || e === void 0 ? void 0 : e.response) {
                console.log('addText', e.response.data, e.response.status);
                if ((e === null || e === void 0 ? void 0 : e.response.status) === 415)
                    navigate('/signin');
            }
            else if (e === null || e === void 0 ? void 0 : e.request)
                console.log('addText', e.request.responseText, e.request.status);
            else
                console.log('no server response');
        }
    });
    ////// individuals messsage 
    const indi_user = (0, react_1.useRef)({});
    const indi_find = (obj) => __awaiter(this, void 0, void 0, function* () {
        indi_user.current = obj;
        setType(cur_type => {
            cur_type.set('user', obj.name);
            return cur_type;
        });
    });
    (0, react_1.useEffect)(() => {
        let indi_sub;
        let type_sub;
        const support = () => __awaiter(this, void 0, void 0, function* () {
            try {
                if (type_ram.get('user') && indi_user.current.id && (user === null || user === void 0 ? void 0 : user.current.id)) {
                    const ref = (0, firestore_1.doc)(AuthProvider_1.db, 'indi_map', user === null || user === void 0 ? void 0 : user.current.id);
                    const ref_other = (0, firestore_1.doc)(AuthProvider_1.db, 'indi_map', indi_user === null || indi_user === void 0 ? void 0 : indi_user.current.id);
                    let dos = yield (0, firestore_1.getDoc)(ref);
                    let dos_other = yield (0, firestore_1.getDoc)(ref_other);
                    if (!dos.get(indi_user.current.id)) {
                        if (dos_other.get(user === null || user === void 0 ? void 0 : user.current.id))
                            yield (0, firestore_1.setDoc)(ref, { [indi_user.current.id]: dos_other.get(user === null || user === void 0 ? void 0 : user.current.id) }, { merge: true });
                        else {
                            const msg_id = (yield axiosService_1.axios1.get('/crypto')).data;
                            console.log('v1');
                            yield (0, firestore_1.setDoc)(ref, { [indi_user.current.id]: msg_id }, { merge: true });
                        }
                    }
                    dos = yield (0, firestore_1.getDoc)(ref);
                    const ref2 = (0, firestore_1.collection)((0, firestore_1.doc)(AuthProvider_1.db, 'indi_msg', dos.get(indi_user.current.id)), 'a');
                    if (dos.get(indi_user.current.id)) {
                        console.log('v2');
                        const c = yield (0, firestore_1.getDocs)((0, firestore_1.query)(ref2, (0, firestore_1.orderBy)('time'), (0, firestore_1.where)('time', '!=', "")));
                        const msg = c.docs.map(t => {
                            return Object.assign(Object.assign({}, t.data()), { docid: t.id });
                        });
                        console.log(c.docs.length);
                        setMsg(msg);
                    }
                    indi_sub = (0, firestore_1.onSnapshot)(ref2, (x) => __awaiter(this, void 0, void 0, function* () {
                        console.log('sub text');
                        const c = yield (0, firestore_1.getDocs)((0, firestore_1.query)(x.query, (0, firestore_1.orderBy)('time'), (0, firestore_1.where)('time', '!=', "")));
                        const msg = c.docs.map(t => {
                            return Object.assign(Object.assign({}, t.data()), { docid: t.id });
                        });
                        setMsg(msg);
                    }));
                }
                else if (type_ram.get('type')) {
                    const ref = (0, firestore_1.collection)(AuthProvider_1.db, `${type_ram.get('type')}_msg`);
                    type_sub = (0, firestore_1.onSnapshot)(ref, (x) => __awaiter(this, void 0, void 0, function* () {
                        const c = yield (0, firestore_1.getDocs)((0, firestore_1.query)(x.query, (0, firestore_1.orderBy)('time'), (0, firestore_1.where)('time', '!=', "")));
                        const msg = c.docs.map(t => {
                            return Object.assign(Object.assign({}, t.data()), { docid: t.id });
                        });
                        setMsg(msg);
                    }));
                }
            }
            catch (e) {
                console.log('msg id activate', e);
            }
        });
        support();
        return () => {
            indi_sub && indi_sub();
            type_sub && type_sub();
        };
    }, [type_ram.get('user'), type_ram.get('type')]);
    /////
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: loading ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Loading..." }) :
            (0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "sec-box3 mx-auto phone" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "group item-box " }, { children: allowedCate.map(cat => (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "phone text_f1 pad", onClick: (e) => typeFind(e, cat[0]), style: type_ram.get('type') === cat[0] ? { color: 'black', backgroundColor: cat[1], boxShadow: '0px 3px 8px 0px black' } : {} }, { children: cat[0] }), cat[0])) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "member item-box " }, { children: users.map((u) => (0, jsx_runtime_1.jsx)("div", Object.assign({ onClick: e => indi_find(u), style: type_ram.get('user') && indi_user.current.id === u.id ? { color: colorByGroup(u), boxShadow: '0px 3px 8px 0px black', textDecoration: ' 3px orange solid underline', fontWeight: '700' } : { color: colorByGroup(u) }, className: "text_f1 phone pad" }, { children: u.name }), u === null || u === void 0 ? void 0 : u.id)) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "message item-box relative" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `absolute top-0 z-10 left-0 ${!type_ram.get('user') && type_ram.get('type') ? '' : 'no-display'}` }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: e => clear(e), className: "btn btn-outline-info" }, { children: "Clear" })), (0, jsx_runtime_1.jsx)(Alert_1.default, Object.assign({ className: "warn-admin", variant: 'danger' }, { children: "Only Admin can delete messages" }), 'danger')] })), type_ram.get('type') ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "phone show-msg relative" }, { children: Msg.map((msg) => msg.id !== (user === null || user === void 0 ? void 0 : user.current.id) ?
                                            (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "phone block msg-block other" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { color: colorByGroup(msg.id, 1) }, className: "msg-label" }, { children: (0, jsx_runtime_1.jsx)("label", { children: (0, service_funs_1.upperOneLetter)(msg.name) }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "inline-block msg-other" }, { children: msg.text }))] }), msg.docid) : (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "phone block msg-block me" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { color: colorByGroup(msg.id, 1) }, className: "msg-label" }, { children: (0, jsx_runtime_1.jsx)("label", { children: (0, service_funs_1.upperOneLetter)(msg.name) }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "inline-block msg-me" }, { children: msg.text }))] }), msg.docid)) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "input-msg flex items-center justify-center gap-x-3 space-around" }, { children: [(0, jsx_runtime_1.jsx)("input", { className: "input-me", placeholder: "Text me..." }), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "no-button", onClick: addText }, { children: (0, jsx_runtime_1.jsx)("i", { className: "bi bi-arrow-right" }) }))] }))] }) : null, " "] }))] })) }));
}
exports.default = ChatRoom;
//# sourceMappingURL=ChatRoom.js.map