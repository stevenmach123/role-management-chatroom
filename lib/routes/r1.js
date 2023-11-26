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
const model_1 = require("../model");
const url_1 = require("url");
const service_funs_1 = require("../route_services/service_funs");
const admin = __importStar(require("firebase-admin"));
const auth_1 = require("firebase/auth");
const vertify_1 = require("./vertify");
const crypto_1 = __importDefault(require("crypto"));
//admin.firestore();
const router = (0, express_1.Router)();
router.post('/sign_in1', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const student = req.body;
    const token = yield admin.auth().createCustomToken(student.id, student);
    return res.json(token);
}));
router.delete('/delete_user/:uid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.uid;
    yield admin.auth().deleteUser(uid);
    res.json("delete user success");
}));
router.put('/o_student/:uid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const uid = req.params.uid;
        const user = yield admin.auth().getUser(uid);
        const userRef = server_1.db.collection('users');
        const duser = yield userRef.where('email', '==', user.email).get();
        const id_help = (...id) => {
            const g = user.providerData.find(p => p.providerId === auth_1.ProviderId.GOOGLE);
            const proD = user.providerData.find(p => p.uid === id[0]);
            if ((proD === null || proD === void 0 ? void 0 : proD.providerId) !== auth_1.ProviderId.GOOGLE) {
                if (g) {
                    return g.uid;
                }
                else if (id[0] && proD)
                    return id[0];
                else
                    return user.providerData[0].uid;
            }
            else {
                if (!g)
                    return user.providerData[0].uid;
                else
                    return id[0];
            }
        };
        const providerData_help = () => {
            let result = [];
            for (let p of user.providerData) {
                let v = Object.assign({}, p.toJSON());
                v.phoneNumber = '';
                result.push(v);
            }
            console.log(result);
            return result;
        };
        let proD_key = {};
        let exist = false;
        if (duser.empty) {
            const new_id = id_help();
            exist = false;
            const proD = user.providerData.find(p => p.uid === new_id);
            proD_key = Object.assign({}, proD.toJSON());
            if (proD)
                yield userRef.doc(new_id).set({
                    name: proD.displayName,
                    id: new_id,
                    class: '',
                    email: user.email,
                    providerData: providerData_help()
                });
        }
        else {
            const myuser = (_a = duser.docs.at(0)) === null || _a === void 0 ? void 0 : _a.data();
            const new_id = id_help(myuser === null || myuser === void 0 ? void 0 : myuser.id);
            const proD_new = user.providerData.find(p => p.uid === new_id);
            proD_key = Object.assign({}, proD_new.toJSON());
            if (!(myuser === null || myuser === void 0 ? void 0 : myuser.role))
                exist = false;
            else
                exist = true;
            if (new_id !== (myuser === null || myuser === void 0 ? void 0 : myuser.id) && proD_new && myuser) {
                const body = myuser;
                body.id = new_id;
                body.providerData = providerData_help();
                body.name = proD_new.displayName;
                body.email = user.email;
                body.class = '';
                yield userRef.doc(new_id).set(body);
                yield ((_b = duser.docs.at(0)) === null || _b === void 0 ? void 0 : _b.ref.delete());
            }
        }
        proD_key.phoneNumber = '';
        const this_user = (yield userRef.doc(proD_key.uid).get()).data();
        yield admin.auth().setCustomUserClaims(uid, {
            email: user.email, id: proD_key.uid, proD_key: proD_key
        });
        res.json({ this_user, exist });
    }
    catch (e) {
        console.log("error o_student put", JSON.stringify(e));
        res.status(403).json({ msg: "error o_student put", data: JSON.stringify(e) });
    }
}));
router.get('/testt', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRef = server_1.db.collection('test1');
    const v = yield userRef.where('king.a', '>=', 5).get();
    const result = v.docs.map(x => x.data());
    res.json(result);
}));
////
router.get('/student', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const name = req.query.name;
        const pass = req.query.pass;
        if (!name || !pass)
            return res.status(400).json("missing properties");
        const userRef = server_1.db.collection('users');
        const myusers = yield userRef.where('name', '==', name).get();
        if (!myusers.empty) {
            const dusers = (_c = myusers.docs.at(0)) === null || _c === void 0 ? void 0 : _c.data();
            if ((dusers === null || dusers === void 0 ? void 0 : dusers.pass) !== pass)
                return res.status(401).json("user pass not match");
            return res.json(dusers);
        }
        else {
            return res.status(401).json("user name not found");
        }
    }
    catch (e) {
        console.log("error student get", e);
        return res.status(405).json(JSON.stringify(e));
    }
}));
router.put('/student', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = req.body;
        if (!student.name || !student.pass)
            return res.status(400).json('student need properties');
        const usersRef = server_1.db.collection("users");
        const fuser = yield usersRef.where('name', '==', student === null || student === void 0 ? void 0 : student.name).get();
        if (!fuser.empty)
            return res.status(409).json("user is already exist");
        student.id = yield (0, service_funs_1.generateId)(5);
        if ((0, service_funs_1.identifyRole)(student.role) === 2)
            student.manage = [];
        yield usersRef.doc(student.id).set(student);
        return res.json("put student suceed");
        /* usersRef.doc(student?.name).set(student).then(async()=>{
             console.log("post succeed")
             const users = await usersRef.get();
             const myusers = users.docs.map(x=>x.data())
         })  */
    }
    catch (e) {
        if (e === 'max user exceed')
            return res.status(409).json('get id- max user exceed');
        return res.status(400).json("error student put");
    }
}));
router.get('/getall', vertify_1.vertify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in get all");
    try {
        const usersRef = server_1.db.collection("users");
        const users = yield usersRef.get();
        let myusers = users.docs.map(u => u.data());
        return res.json(myusers);
        /*
        
        //const myu  =users.docChanges().map(x=>x.doc.id)
        //console.log(myu)  */
    }
    catch (e) {
        console.log("error /getall  ", e);
        return res.json(JSON.stringify(e));
    }
}));
router.get('/normal_student', vertify_1.vertify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    const id = req.query.id;
    if (!name || !id)
        return res.status(400).json("normal_student get missing properties");
    const userRef = server_1.db.collection('users');
    const myusers = yield userRef.doc(id).get();
    if (myusers.exists) {
        const dusers = myusers.data();
        if ((dusers === null || dusers === void 0 ? void 0 : dusers.name) !== name)
            return res.status(401).json("normal_student get id not match");
        return res.json(dusers);
    }
    else
        return res.status(401).json("normal_student get username not found");
}));
router.post('/student', vertify_1.vertify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = req.body;
    try {
        const users = yield server_1.db.collection('users').where('id', "==", obj === null || obj === void 0 ? void 0 : obj.id).get();
        if (users.empty)
            return res.status(400).json("post student - no user exist");
        const userRef = server_1.db.collection('users').doc(obj.id);
        for (let [k, v] of Object.entries(obj)) {
            yield userRef.update({ [k]: v });
        }
        yield (0, model_1.Sleep)(1);
        let allusers = yield server_1.db.collection('users').get();
        const all_users = allusers.docs.map(x => x.data());
        const myuser = (yield userRef.get()).data();
        if ((0, service_funs_1.identifyRole)(myuser === null || myuser === void 0 ? void 0 : myuser.role) !== 2 && (0, service_funs_1.identifyRole)(myuser === null || myuser === void 0 ? void 0 : myuser.role) !== -1)
            yield userRef.update({ manage: admin.firestore.FieldValue.delete() });
        return res.json({ message: "post student success", student: myuser, allstudent: all_users });
    }
    catch (e) {
        console.log("post student error", JSON.stringify(e));
        return res.status(400).json({ message: JSON.stringify(e) });
    }
}));
router.post('/student_update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { name, id, new_name, new_pass } = req.body;
    try {
        const ref = server_1.db.collection('users');
        if (!name || !id)
            return res.status(400).json("missing account properties");
        const users = yield ref.where('name', "==", name).where('id', '==', id).get();
        if (users.empty)
            return res.status(401).json("student_update - no user exist");
        if (new_name) {
            const u = yield ref.where('name', "==", new_name).get();
            if (!u.empty)
                return res.status(409).json("student_update - there is a user");
            const user_data = (_d = users.docs.at(0)) === null || _d === void 0 ? void 0 : _d.data();
            if (new_pass)
                user_data.pass = new_pass;
            user_data.name = new_name;
            yield ref.doc(id).set(user_data);
        }
        else if (new_pass) {
            yield ref.doc(id).update({ pass: new_pass });
        }
        (0, model_1.Sleep)(1);
        return res.json('/student_update success');
    }
    catch (e) {
        console.log(JSON.stringify(e));
        return res.status(403).json('student_update error');
    }
}));
router.delete('/student/:id', vertify_1.vertify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (!id)
            res.status(400).json("missing properties");
        const userRef = server_1.db.collection('users');
        yield userRef.doc(id).delete();
        const users = (yield userRef.get());
        const stus = users.docs.map(u => u.data());
        res.json(stus);
    }
    catch (e) {
        console.log("error student delete", e);
        res.status(403).json(JSON.stringify(e));
    }
}));
router.delete('/types', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typeRef = server_1.db.collection('type_frame');
        const types = yield typeRef.get();
        for (let docs of types.docs) {
            yield docs.ref.delete();
        }
        res.json("delete sucess");
    }
    catch (e) {
        console.log("error types delete", JSON.stringify(e));
        res.status(403).json({ message: 'error types delete', data: JSON.stringify(e) });
    }
}));
router.get('/types', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRef = server_1.db.collection('users');
        const users = yield userRef.get();
        let sg = new Set();
        for (let user of users.docs) {
            let g = yield user.get('class');
            if (g)
                sg.add(g);
        }
        res.json([...sg]);
    }
    catch (e) {
        console.log("error types get", JSON.stringify(e));
        res.status(405).json({ message: JSON.stringify(e) });
    }
}));
router.post('/types', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const types = req.body;
        const typeRef = server_1.db.collection('type_frame');
        for (let type of types) {
            //console.log(type)
            let doc = yield typeRef.where(admin.firestore.FieldPath.documentId(), '==', type).get();
            //console.log('type2')
            if (doc.empty && type) {
                yield typeRef.doc(type).set({ color: (0, service_funs_1.colorLogic)(type) });
            }
        }
        return res.json('type post sucess');
    }
    catch (e) {
        console.log("error types post", JSON.stringify(e));
        return res.status(405).json({ message: JSON.stringify(e) });
    }
}));
router.delete('/type/:type', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const type = req.params.type;
        if (!type) {
            return res.json('delete type nothing');
        }
        const typeRef = server_1.db.collection('type_frame');
        yield typeRef.doc(type).delete();
        return res.json("delete type sucess");
    }
    catch (e) {
        return res.status(405).json('delete type fail');
    }
}));
router.get('/id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRef = server_1.db.collection('users');
        const users = yield userRef.where('id', '!=', null).get();
        const id_ar = users.docs.map(x => x.get('id'));
        return res.json(id_ar);
    }
    catch (e) {
        return res.status(400).json('get id- no see any id');
    }
}));
router.get('/crypto', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const v = crypto_1.default.randomBytes(10).toString('hex');
        return res.json(v);
    }
    catch (e) {
        return res.status(401).json("no crypto");
    }
}));
router.post('/regis/:obj', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRef = server_1.db.collection('users');
        const obj = new url_1.URLSearchParams(req.params.obj);
        const name = obj.get('name');
        const admit = obj.get('admit');
        const duser = yield userRef.doc(name).get();
        if (!duser) {
            return res.status(401).json("regis not found user");
        }
        if (admit) {
            yield userRef.doc(name).update({ admit: true });
        }
        else {
            yield userRef.doc(name).update({ admit: false });
        }
        const users = (yield userRef.get()).docs.map(u => u.data());
        return res.json(users);
    }
    catch (e) {
        console.log("error regis");
        return res.status(401).json(JSON.stringify(e));
    }
}));
exports.default = router;
/*
 const typeRef= db.collection('types')
    const types = await typeRef.get();
    if(!types )
        return res.status(405).json("no see type collection")
    const mytypes =  types.docs.map(t=>t.id);
    res.json(mytypes);
    }
    catch(e){
        console.log("error types get")
        res.status(405).json(JSON.stringify(e))
*/
/*
   try{
       const userRef =collection(db,"users")
       const Docuser =  await getDocs(userRef)
       const users: user_mode[] = Docuser.docs.map(ind=>{
                 return ind.data() as user_mode;
       })
       res.json(users)
       
       }catch(e){
           console.error(e);
           res.status(500).json("not good1")
       }   */
/*

router.delete('/student/:name',async (req,res)=>{
    const name = req.params.name as string
    try{
        const userRef =  db.collection('users').doc('stu')
        const myusers = await (await userRef.get()).data()
        
        if(myusers && myusers[name]){
            
            userRef.update({[name]: firebase.firestore.FieldValue.delete() })
            const myusers2 = await (await userRef.get()).data()
            //console.log("i",myusers2)
            if(myusers2){
                const us = Object.entries(myusers2).map(u=>u[1])
                res.json(us)
            }
        }
        
    }
    catch(e){
        console.log("error delete",e)
        res.status(403).json(JSON.stringify(e))
    }

} )


*/
/*
router.post('/regis/:obj',async (req,res)=>{
    try{
        const userRef =  db.collection('users').doc('stu')
        const myusers = await (await userRef.get()).data()
        const obj = new URLSearchParams(req.params.obj)
        const name  = obj.get('name') as string ;
        const admit = obj.get('admit');
        
        let user ;
        if(myusers)
            user = myusers[name] as unknown as user_mode

        if(user){
            if(admit)
                userRef.update({[name]:{...user,admit:true} })
            else
                userRef.update({[name]:{...user,admit:false} })
            res.status(200).json("good regis");
        }
        else
            res.status(400).json("regis not found");
    }
    catch(e){
        res.status(401).json(JSON.stringify(e))
    }
})

*/
//# sourceMappingURL=r1.js.map