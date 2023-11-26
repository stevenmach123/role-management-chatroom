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
const express_1 = require("express");
const server_1 = require("../server");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const vertify_1 = require("./vertify");
const vertifyRole_1 = require("./vertifyRole");
const router = (0, express_1.Router)();
router.post('/type', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, name, id, text } = req.body;
    /*const x = db.collection().get()
    ;(await x).query.isEqual()*/
    if (!name || !id || !type)
        return res.status(400).json('missing properties');
    try {
        const ref = server_1.db.collection(`${type}_msg`);
        yield ref.add({
            name: name, id: id, text: text, time: firebase_admin_1.default.firestore.FieldValue.serverTimestamp()
        });
        return res.json('msg/type add sucess');
    }
    catch (e) {
        console.log("msg/type post", JSON.stringify(e));
        return res.status(402).json({ msg: 'msg/type post', data: JSON.stringify(e) });
    }
}));
router.post('/indi', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from_id, to_id, name, id, text } = req.body;
        if (!from_id || !to_id || !name || !id)
            return res.status(400).json('missing properties');
        const user_map = yield server_1.db.collection('indi_map').doc(from_id).get();
        let msg_id = '';
        if (!user_map.get(to_id))
            return res.status(400).json('msg/indi post missing msg_id');
        msg_id = user_map.get(to_id);
        const indi_msg_id_ref = server_1.db.collection(`indi_msg`).doc(msg_id);
        const indi_msg_id = yield indi_msg_id_ref.get();
        if (!indi_msg_id.exists)
            yield indi_msg_id_ref.set({ x: null }, { merge: true });
        yield indi_msg_id_ref.collection('a').add({
            name: name, id: id, to_id: to_id, text: text, time: firebase_admin_1.default.firestore.FieldValue.serverTimestamp()
        });
        return res.json('msg/indi add sucess');
    }
    catch (e) {
        console.log("msg/indi post", JSON.stringify(e));
        return res.status(402).json({ msg: 'msg/indi post', data: JSON.stringify(e) });
    }
}));
router.delete('/indi', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        if (!id)
            return res.status(400).json('missing properties');
        const user_map_ref = server_1.db.collection('indi_map').doc(id);
        const indi_msg_ref = server_1.db.collection('indi_msg');
        const user_map = yield user_map_ref.get();
        const ar_msg_id = Object.entries(user_map.data()).map(x => x[1]);
        console.log(ar_msg_id);
        const indi_msg = yield indi_msg_ref.where(firebase_admin_1.default.firestore.FieldPath.documentId(), 'in', ar_msg_id).get();
        console.log(indi_msg.size);
        for (let doc of indi_msg.docs) {
            yield doc.ref.delete();
            yield doc.ref.collection('a').listDocuments().then(v => {
                v.map(x => x.delete());
            });
        }
        yield user_map_ref.delete();
        const users_map = yield server_1.db.collection('indi_map').get();
        for (let doc of users_map.docs)
            yield doc.ref.update({ [id]: firebase_admin_1.default.firestore.FieldValue.delete() });
        return res.json('indi delete success');
    }
    catch (e) {
        console.log("msg/indi delete", JSON.stringify(e));
        return res.status(402).json({ msg: 'msg/indi delete', data: JSON.stringify(e) });
    }
}));
router.delete('/types/:type', vertify_1.vertify, vertifyRole_1.vertifyRole, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.params.type;
    if (type === 'undefined' || !type)
        return res.status(400).json('missing properties');
    try {
        const ref = server_1.db.collection(`${type}_msg`);
        const x = yield ref.get();
        for (let v of x.docs) {
            yield v.ref.delete();
        }
        return res.json('delete msg success');
    }
    catch (e) {
        console.log("hi", JSON.stringify(e));
        return res.status(402).json({ msg: 'msg/type delete', data: JSON.stringify(e) });
    }
}));
exports.default = router;
//# sourceMappingURL=io.js.map