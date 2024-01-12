"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const NotFound_1 = require("./Components/OtherComponents/NotFound");
const Home_1 = __importDefault(require("./Components/LayOut/Home"));
const AddUser_1 = __importStar(require("./Components/AddUser/AddUser"));
const Intro_1 = __importStar(require("./Components/OtherComponents/Intro"));
const ErrorUser_1 = __importDefault(require("./Components/OtherComponents/ErrorUser"));
const Board_1 = require("./Components/UserLayOut/Board");
const User_1 = require("./Components/UserLayOut/User");
const UserLayout_1 = require("./Components/UserLayOut/UserLayout");
const SignIn_1 = __importDefault(require("./Components/OtherComponents/SignIn"));
const En_1 = __importDefault(require("./Components/LayOut/En"));
const Back_1 = __importDefault(require("./Components/LayOut/Back"));
const SignUp_1 = __importDefault(require("./Components/OtherComponents/SignUp"));
const ProtectedR_1 = __importDefault(require("./Components/LayOut/ProtectedR"));
const ChatRoom_1 = __importDefault(require("./Components/UserLayOut/ChatRoom"));
const UserSetting_1 = __importDefault(require("./Components/Setting/UserSetting"));
const UserSettingLayout_1 = __importDefault(require("./Components/Setting/UserSettingLayout"));
const GroupBoard_1 = require("./Components/Setting/GroupBoard");
const MyInfo_1 = __importDefault(require("./Components/OtherComponents/MyInfo"));
const UpdateInfo_1 = __importDefault(require("./Components/AddUser/UpdateInfo"));
const Role_1 = __importDefault(require("./Components/OtherComponents/Role"));
function App() {
    const router = (0, react_router_dom_1.createBrowserRouter)((0, react_router_dom_1.createRoutesFromElements)((0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, Object.assign({ path: "/", element: (0, jsx_runtime_1.jsx)(Back_1.default, {}) }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "", element: (0, jsx_runtime_1.jsx)(En_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "signin", element: (0, jsx_runtime_1.jsx)(SignIn_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "signup", element: (0, jsx_runtime_1.jsx)(SignUp_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "role", element: (0, jsx_runtime_1.jsx)(Role_1.default, {}) }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, Object.assign({ element: (0, jsx_runtime_1.jsx)(ProtectedR_1.default, {}) }, { children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, Object.assign({ path: "home", element: (0, jsx_runtime_1.jsx)(Home_1.default, {}) }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: 'myinfo/:info', element: (0, jsx_runtime_1.jsx)(MyInfo_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: 'updateinfo/:info', element: (0, jsx_runtime_1.jsx)(UpdateInfo_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "intro/:info", element: (0, jsx_runtime_1.jsx)(Intro_1.default, {}), loader: Intro_1.loaderIntro, errorElement: (0, jsx_runtime_1.jsx)(ErrorUser_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "add", element: (0, jsx_runtime_1.jsx)(AddUser_1.default, {}), errorElement: (0, jsx_runtime_1.jsx)(ErrorUser_1.default, {}), action: AddUser_1.loader }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, Object.assign({ path: "users", element: (0, jsx_runtime_1.jsx)(UserLayout_1.UserLayout, {}) }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, Object.assign({ path: "board", element: (0, jsx_runtime_1.jsx)(Board_1.Board, {}) }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: ":name/:obj", loader: User_1.loader, errorElement: (0, jsx_runtime_1.jsx)(ErrorUser_1.default, {}), element: (0, jsx_runtime_1.jsx)(User_1.User, { rx: 1 }) }) })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "chatroom", element: (0, jsx_runtime_1.jsx)(ChatRoom_1.default, {}) })] })), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, { children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, Object.assign({ path: "userss", element: (0, jsx_runtime_1.jsx)(UserSettingLayout_1.default, {}) }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "usersetting/:info", element: (0, jsx_runtime_1.jsx)(UserSetting_1.default, {}), loader: Intro_1.loaderIntro }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, Object.assign({ path: "board", element: (0, jsx_runtime_1.jsx)(GroupBoard_1.GroupBoard, {}) }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: ":name", element: (0, jsx_runtime_1.jsx)(GroupBoard_1.Useri, {}), errorElement: (0, jsx_runtime_1.jsx)(ErrorUser_1.default, {}) }) }))] })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "chatroom", element: (0, jsx_runtime_1.jsx)(ChatRoom_1.default, {}) })] })] })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "*", element: (0, jsx_runtime_1.jsx)(NotFound_1.NotFound, {}) })] }))] }))));
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.RouterProvider, { router: router }) }));
}
exports.default = App;
//# sourceMappingURL=App.js.map