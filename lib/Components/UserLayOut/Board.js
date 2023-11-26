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
exports.Board = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const axiosService_1 = require("../../route_services/axiosService");
const AuthProvider_1 = require("../LayOut/AuthProvider");
const service_funs_1 = require("../../route_services/service_funs");
const color_rad = (color) => `linear-gradient(to bottom right,${color} 30%,rgb(222, 209, 170) 80%)`;
const Board = () => {
    const [users, setUsers] = (0, react_1.useState)([]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const prev_mouse = (0, react_1.useRef)();
    const navi = (0, react_router_dom_1.useNavigate)();
    const { cate, user, myusers, vvv } = (0, AuthProvider_1.AuthP)();
    const cate_ar = Object.entries(cate);
    const this_path = (0, react_router_dom_1.useResolvedPath)('.', { relative: 'path' });
    const current_path = (0, react_router_dom_1.useResolvedPath)('.', { relative: 'route' });
    const [params, setSearchParams] = (0, react_router_dom_1.useSearchParams)();
    const [type_ram, setType] = (0, react_router_dom_1.useSearchParams)();
    const [checked, setChecked] = (0, react_router_dom_1.useSearchParams)();
    const path = (0, react_router_dom_1.useLocation)();
    const [error, setError] = (0, react_1.useState)("");
    const [load, setLoad] = (0, react_1.useState)(true);
    let current_users = type_ram.get("type") ? users.filter(u => u.class === type_ram.get('type')).sort((a, b) => a.name - b.name) : users.sort((a, b) => a.name - b.name);
    //console.log("state01 ",current_users)
    function nona() {
        const rt = document.querySelectorAll(".pp");
        if (rt) {
            setUsers(my_users => {
                const map_users = new Map(my_users.map(u => [u.name, u]));
                rt.forEach((x) => {
                    var _a;
                    const x1 = x;
                    const check = (_a = map_users.get(x1.value)) === null || _a === void 0 ? void 0 : _a.admit;
                    //console.log("--d ",map_users.get(x1.value));
                    if (check) {
                        x1.checked = true;
                    }
                });
                return my_users;
            });
        }
    }
    /*
  const Del = async (name:string)=>{
        
    try{
        const us = await ser1.deleteStudent(name)
        const us_data = us.data as user_mode[]
        const link = document.querySelector(`.linking#${name}`) as unknown as HTMLAnchorElement

        setUsers(us_data)

        let my_type:string;
        let user_exist:user_mode|undefined;
        const select_path = new URL(link.href)
        console.log("this_path",this_path)
        console.log("select_path",select_path)
        if(this_path.pathname === select_path.pathname){
            console.log(type_ram.get('type'));
            if(type_ram.get('type')){
                user_exist =us_data.find(u=> u.class === type_ram.get('type') )
                my_type = type_ram.get('type') as string
                if(user_exist){
                    navigate(`${current_path.pathname}?${type_ram.toString()}`)
                }
            }
            else{
                console.log("common in")
                my_type =users.find(u=>u.name===name)?.class as string
                user_exist =us_data.find(u=> u.class === my_type)
                navigate(`${current_path.pathname}`)
            }
            if(!user_exist){
                await ser1.deleteType(my_type );
                //const types = await ser1.getTypes()
                //setCate(types.data as string[])
                navigate(`${current_path.pathname}`)
            }

        }
        else{
            console.log("except")
            my_type =users.find(u=>u.name===name)?.class as string
            
            user_exist =us_data.find(u=> u.class === my_type)
            if(user_exist){
              navigate(`${current_path.pathname}?type=${type_ram.toString()}`)
            }
            else{
                await ser1.deleteType(my_type );
                //setCate(types.data as string[])
                if(!select_path.searchParams.get('type'))
                    return  navigate(`${this_path.pathname}`)

                navigate(`${current_path.pathname}`)
            }

        }

        
       
        
    }
    catch(e:any){
        if(!e?.response)
            console.log('Delete server error ',e)
        else if(e.response.status ===403){
            console.log('Delete student not success',e.response.data)
        }
        else if(e.response.status === 405){
            console.log("Delete type not success",e.response.data)
        }
        
    }
    
         
}  */
    (0, react_1.useEffect)(() => {
        const support = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const token = yield (vvv === null || vvv === void 0 ? void 0 : vvv.getIdToken());
                const x = yield axiosService_1.ser1.getAll({ 'id_token': token });
                console.log('board getAll', x.data);
                setUsers(x.data);
                const rt = document.querySelectorAll(".pp");
                if (rt === null || rt === void 0 ? void 0 : rt.length)
                    nona();
                setLoad(false);
            }
            catch (e) {
                console.error("wu", e);
                if ((e === null || e === void 0 ? void 0 : e.response.status) === 415)
                    navigate('/signin');
            }
            return () => {
                console.log("effect return layout");
            };
        });
        support();
    }, [myusers]);
    (0, react_1.useEffect)(() => {
        nona();
        //console.log("type_ram.")
        return () => {
            //console.log("type_ram effect return",console.log(type_ram.toString()));
            //console.log("params effect return",console.log(params.toString()));
        };
    }, [type_ram]);
    const typeFind = (e, type) => {
        setType(cur_type => {
            if (type)
                cur_type.set("type", type);
            else
                cur_type.delete("type");
            return cur_type;
        });
    };
    const Mycategories = cate_ar.map(cat => ((0, jsx_runtime_1.jsx)("div", Object.assign({ style: type_ram.get('type') === cat[0] ? { backgroundImage: color_rad(cat[1]), color: "black" } : { border: `1px solid ${cat[1]}`, color: cat[1] }, onClick: (e) => typeFind(e, cat[0]), className: "cate" }, { children: cat[0] }), cat[0])));
    const ClickUser = (e, user) => {
        var _a, _b;
        params.set('name', String(user.name));
        params.set('id', String(user.id));
        if (!((_a = prev_mouse.current) === null || _a === void 0 ? void 0 : _a.isEqualNode(e.target))) {
            //console.log("ii")
            (_b = prev_mouse.current) === null || _b === void 0 ? void 0 : _b.classList.remove('active');
            prev_mouse.current = e.target;
            e.target.classList.add('active');
            navi(`${user.name}/${params}`);
        }
        //setSearchParams(params.toString())
    };
    const ClickUser2 = (user) => {
        params.set('name', String(user.name));
        params.set('id', String(user.id));
        params.delete('type');
        return params;
    };
    const clickCheck = (e) => __awaiter(void 0, void 0, void 0, function* () {
        const x1 = e.target;
        checked.set("name", x1.value);
        console.log(x1.checked);
        if (x1.checked)
            checked.set("admit", "true");
        axiosService_1.ser1.postRegis(checked).then(res => setUsers(res.data)).catch(e => { console.log("regis error", e); });
        checked.delete('name');
        checked.delete('admit');
    });
    const tok = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('tok');
        const t = yield (vvv === null || vvv === void 0 ? void 0 : vvv.getIdToken());
        if (t)
            service_funs_1.toen.t = t;
    });
    const FillUsers = current_users.map((u, i) => {
        var _a, _b;
        if (u.name === ((_a = user === null || user === void 0 ? void 0 : user.current) === null || _a === void 0 ? void 0 : _a.name) && u.id === ((_b = user === null || user === void 0 ? void 0 : user.current) === null || _b === void 0 ? void 0 : _b.id))
            return null;
        //  return <div key={user.name}  onClick={(e)=>ClickUser(e,user)} className='tar_block' >{user.name}&nbsp;{user.id}</div> 
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'flex justify-between px-2 py-1' }, { children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.NavLink, Object.assign({ id: u.name, className: `linking unactive ${({ isActive }) => isActive ? "active" : ""}`, onClick: tok, to: `${u.name}/${ClickUser2(u)}?${type_ram}` }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'tar_block' }, { children: u.name })), " "] })), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("input", { onChange: clickCheck, className: "form-check-input pp", type: "checkbox", value: u.name, id: "flexCheckDefault" }) })] }), u.name));
    });
    const [fillme, setFillme] = (0, react_1.useState)(1);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "bb" }, { children: load ? (0, jsx_runtime_1.jsx)("section", { children: "loading..." }) :
                error ? (0, jsx_runtime_1.jsxs)("p", { children: ["Error is ", (0, jsx_runtime_1.jsx)("span", { children: error })] }) :
                    users.length === 0 ? (0, jsx_runtime_1.jsx)("section", { children: "No Student found" }) :
                        ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "con" }, { children: [Mycategories, (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'text-decoration-underline', style: { fontSize: "1.4rem" }, onClick: (e) => typeFind(e, null) }, { children: "Cancel filter" }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "sec-box" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "item-box one" }, { children: FillUsers })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "item-box two" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, { context: { setUsers, users, this_path, current_path } }) }))] }))] })) })) }));
};
exports.Board = Board;
//# sourceMappingURL=Board.js.map