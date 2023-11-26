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
exports.AuthProvider = exports.AuthP = exports.db = exports.auth = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const service_funs_1 = require("../../route_services/service_funs");
const axiosService_1 = require("../../route_services/axiosService");
const react_router_dom_1 = require("react-router-dom");
const app = (0, app_1.initializeApp)(service_funs_1.firebaseConfig);
exports.auth = (0, auth_1.getAuth)(app);
exports.db = (0, firestore_1.getFirestore)(app);
const m = (0, react_1.createContext)({});
const AuthProvider = ({ children }) => {
    var _a, _b;
    const user = (0, react_1.useRef)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [myusers, setMyusers] = (0, react_1.useState)([]);
    const [cate, setCate] = (0, react_1.useState)({});
    const [fresh, setfresh] = (0, react_1.useState)(1);
    const class_template = ['lion', 'cobra', 'dragon', 'shark'];
    const [vvv, setV] = (0, react_1.useState)();
    console.log(cate);
    const support = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const uu = yield (0, auth_1.getRedirectResult)(exports.auth);
            console.log('support in provider', uu);
            if (uu) {
                setV(uu === null || uu === void 0 ? void 0 : uu.user);
                console.log('support redirect', uu.user.uid);
                const res = (yield axiosService_1.ser1.putOStudent(uu.user.uid)).data;
                user.current = res.this_user;
                if (res === null || res === void 0 ? void 0 : res.exist)
                    navigate('/home');
                else
                    navigate('/role');
            }
            yield axiosService_1.ser1.deleteAllTypes();
            const types = yield axiosService_1.ser1.getAllTypes();
            yield axiosService_1.ser1.postTypes(types.data);
        }
        catch (e) {
            if (e.response)
                console.log("provider support ", e.response.status, e.response.data);
            else if (e.request)
                console.log("provider support", e.request);
            else
                console.log('provider support', e, e === null || e === void 0 ? void 0 : e.code);
            if ((e === null || e === void 0 ? void 0 : e.code) === "auth/account-exists-with-different-credential") {
                try {
                    const cred = auth_1.OAuthProvider.credentialFromError(e);
                    console.log((0, auth_1.getAuth)().currentUser, cred);
                    if (exports.auth.currentUser && cred) {
                        const uu = yield (0, auth_1.linkWithCredential)((0, auth_1.getAuth)().currentUser, cred);
                        const res = (yield axiosService_1.ser1.putOStudent(uu.user.uid)).data;
                        user.current = res.this_user;
                        setV(uu.user);
                        if (res === null || res === void 0 ? void 0 : res.exist)
                            navigate('/home');
                        else
                            navigate('/role');
                    }
                }
                catch (e) {
                    console.log('common user', e);
                }
            }
        }
    });
    const signin = (body) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('signin');
        const token = yield axiosService_1.axios1.post('/sign_in1', body);
        const v = yield (0, auth_1.signInWithCustomToken)(exports.auth, token.data);
        console.log(v.user);
        setV(v.user);
    });
    const signinF = () => __awaiter(void 0, void 0, void 0, function* () {
        const provider = new auth_1.FacebookAuthProvider();
        provider.addScope('email');
        // provider.addScope('public_profile')
        yield (0, auth_1.signInWithRedirect)(exports.auth, provider);
    });
    const signinG = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const provider = new auth_1.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            provider.setCustomParameters({
                prompt: "select_account"
            });
            const uu = yield (0, auth_1.signInWithPopup)(exports.auth, provider);
            const cred = auth_1.GoogleAuthProvider.credentialFromResult(uu);
            console.log(cred);
            const res = (yield axiosService_1.ser1.putOStudent(uu.user.uid)).data;
            user.current = res.this_user;
            setV(uu.user);
            if (res === null || res === void 0 ? void 0 : res.exist)
                navigate('/home');
            else
                navigate('/role');
        }
        catch (e) {
            console.log('g', e);
            if ((e === null || e === void 0 ? void 0 : e.code) === "auth/account-exists-with-different-credential") {
                try {
                    const cred = auth_1.OAuthProvider.credentialFromError(e);
                    console.log(cred);
                    if ((0, auth_1.getAuth)().currentUser && cred) {
                        const uu = yield (0, auth_1.linkWithCredential)((0, auth_1.getAuth)().currentUser, cred);
                        const res = (yield axiosService_1.ser1.putOStudent(uu.user.uid)).data;
                        setV(uu.user);
                        user.current = res.this_user;
                        if (res === null || res === void 0 ? void 0 : res.exist)
                            navigate('/home');
                        else
                            navigate('/role');
                    }
                }
                catch (e) {
                    console.log('common user', e);
                }
            }
        }
    });
    const logout = () => __awaiter(void 0, void 0, void 0, function* () {
        (0, auth_1.signOut)(exports.auth).then(x => {
            navigate('/signin');
        }).catch(e => {
            navigate('/signin');
        });
    });
    (0, react_1.useEffect)(() => {
        let user_sub;
        if (user.current) {
            const refuser = (0, firestore_1.doc)(exports.db, 'users', user.current.id);
            user_sub = (0, firestore_1.onSnapshot)(refuser, (x) => {
                if (!x.data())
                    navigate('/signin');
                user.current = x.data();
            });
        }
        return () => {
            console.log('user effect', user);
            if (user_sub)
                user_sub();
        };
    }, [(_a = user.current) === null || _a === void 0 ? void 0 : _a.name, (_b = user.current) === null || _b === void 0 ? void 0 : _b.id]);
    (0, react_1.useEffect)(() => {
        const ref = (0, firestore_1.collection)(exports.db, "type_frame");
        const frame_color_sub = (0, firestore_1.onSnapshot)(ref, (x) => {
            let b = {};
            let z = x.docs.forEach(d => {
                d.data();
                b[d.id] = d.get('color');
            });
            setCate(b);
        });
        const refusers = (0, firestore_1.collection)(exports.db, 'users');
        const myusers_sub = (0, firestore_1.onSnapshot)(refusers, (x) => {
            const users = x.docs.map(u => u.data());
            setMyusers(users);
        });
        const auth_user = (0, auth_1.onAuthStateChanged)(exports.auth, x => {
            console.log(x);
        });
        support();
        const v = new Date();
        //console.log(v.getTime(),v.getMilli)
        return () => {
            myusers_sub();
            frame_color_sub();
            auth_user();
        };
    }, []);
    const x = () => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
        console.log(">><<");
        console.log(((0, auth_1.getAuth)().currentUser));
        console.log((_c = (0, auth_1.getAuth)().currentUser) === null || _c === void 0 ? void 0 : _c.accessToken);
        let v = yield ((_d = (0, auth_1.getAuth)().currentUser) === null || _d === void 0 ? void 0 : _d.getIdToken());
        console.log(v);
    });
    const xr = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(vvv);
    });
    const vr = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const indi_map_ref = (0, firestore_1.collection)(exports.db, 'indi_v');
            const x = (0, firestore_1.getDocs)(indi_map_ref);
            console.log((yield x).docs.length);
        }
        catch (e) {
            console.log('vr', e);
        }
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(m.Provider, Object.assign({ value: { user, myusers, setMyusers, cate, setCate, setfresh, fresh, class_template, signin, logout, vvv, signinG, signinF } }, { children: children })) }));
};
exports.AuthProvider = AuthProvider;
const AuthP = () => {
    return (0, react_1.useContext)(m);
};
exports.AuthP = AuthP;
//# sourceMappingURL=AuthProvider.js.map