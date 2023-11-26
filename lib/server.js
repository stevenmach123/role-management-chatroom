"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.chatappgc = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//import {getFirestore} from 'firebase/firestore';
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const AdminService_json_1 = __importDefault(require("./route_services/AdminService.json"));
const r1_1 = __importDefault(require("./routes/r1"));
const io_1 = __importDefault(require("./routes/io"));
const model_1 = require("./model");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//import  {onRequest} from "firebase-functions/v2/https";
const app = (0, express_1.default)();
const admin_app = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert({
        projectId: AdminService_json_1.default.project_id,
        clientEmail: AdminService_json_1.default.client_email,
        privateKey: AdminService_json_1.default.private_key,
    }),
});
//const f_app = initializeApp(firebaseConfig)
//const f_db = getFirestore(f_app)
const db = admin_app.firestore();
exports.db = db;
app.use((0, cors_1.default)({
    origin: ['http://localhost:4002', 'https://www.thunderclient.com', 'http://localhost:3000', 'http://localhost:8080', "https://chatroom-de811.web.app", "https://chatroom-de811.firebaseapp.com"],
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use('/', r1_1.default);
app.use('/msg', io_1.default);
console.log(process.env.PORT);
const PORT = model_1.properties.ser_port || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
exports.chatappgc = app;
//# sourceMappingURL=server.js.map