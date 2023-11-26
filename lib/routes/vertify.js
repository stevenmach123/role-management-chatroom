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
exports.vertify = void 0;
const server_1 = require("../server");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const vertify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id_token = req.headers['id_token'];
    console.log(id_token);
    if (!id_token)
        return res.status(415).json({ message: 'vertify no id_token' });
    try {
        const claims = yield firebase_admin_1.default.auth().verifyIdToken(id_token, true);
        /*console.log(claims?.name )
        console.log(claims?.pass )
        console.log(claims?.id )
        console.log(claims?.email )*/
        if (claims.proD_key) {
            console.log(claims === null || claims === void 0 ? void 0 : claims.proDkey);
        }
        const studentRef = server_1.db.collection('users').doc(claims.id);
        const student = (yield studentRef.get()).data();
        let pass = false;
        if (((student === null || student === void 0 ? void 0 : student.name) !== claims.name || (student === null || student === void 0 ? void 0 : student.pass) !== claims.pass)) {
            pass = true;
        }
        if (pass && (student.email !== claims.email || student.id !== claims.proD_key.uid || student.name !== claims.proD_key.displayName)) {
            console.log('ver 2');
            return res.status(415).json({ msg: 'vertify', error: 'invalid check' });
        }
        req.name = student === null || student === void 0 ? void 0 : student.name;
        req.id = student === null || student === void 0 ? void 0 : student.id;
        req.email = student === null || student === void 0 ? void 0 : student.email;
        if (student === null || student === void 0 ? void 0 : student.role)
            req.roles = Object.values(student === null || student === void 0 ? void 0 : student.role);
        req.auth_time = claims.auth_time;
        return next();
    }
    catch (er) {
        if ((er === null || er === void 0 ? void 0 : er.code) === "auth/id-token-revoked") {
            return res.status(415).json('id_token revoked ');
        }
        return res.status(415).json({ message: 'vertify invalid', error: JSON.stringify(er) });
    }
});
exports.vertify = vertify;
//# sourceMappingURL=vertify.js.map