"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axios1 = exports.ser1 = exports.dec = void 0;
const axios_1 = __importDefault(require("axios"));
const model_1 = require("../model");
const axios1 = axios_1.default.create({
    baseURL: `http://localhost:${model_1.properties.ser_port.toString()}/`, withCredentials: true,
    headers: {
        "Content-type": "application/json"
    }
});
exports.axios1 = axios1;
const axios0 = axios_1.default.create({
    baseURL: `https://us-central1-chatroom-de811.cloudfunctions.net/chat-app2/`, withCredentials: true,
    headers: {
        "Content-type": "application/json"
    }
});
const getData = () => {
    return axios1.get('/hi');
};
const getAll = (header) => {
    return axios1.get('/getall', { headers: header });
};
const putStudent = (student) => {
    return axios1.put('/student', student);
};
const getStudent = (param_obj) => {
    const param = new URLSearchParams(param_obj);
    return axios1.get(`/student/?${param}`);
    //return axios1.get<unknown>(`/getStudent?${param}`)
};
const getNStudent = (param_obj, header) => {
    return axios1.get(`/normal_student/?${param_obj}`, { headers: header });
};
const postStudent = (obj, header) => {
    return axios1.post('/student', obj, { headers: header });
};
const postStudentUp = (obj) => {
    return axios1.post('/student_update', obj);
};
const deleteStudent = (id, header) => {
    return axios1.delete(`/student/${id}`, { headers: header });
};
const deleteUser = (id) => {
    return axios1.delete(`delete_user/${id}`);
};
const putOStudent = (uid) => {
    return axios1.put(`/o_student/${uid}`);
};
const getAllTypes = () => {
    return axios1.get('/types');
};
const postRegis = (param_obj) => {
    return axios1.post(`/regis/${param_obj}`);
};
const postTypes = (types) => {
    return axios1.post('/types', types);
};
const deleteAllTypes = () => {
    return axios1.delete('/types');
};
const deleteType = (type) => {
    return axios1.delete(`/type/${type}`);
};
const delete_indi_structure = (param_obj) => {
    return axios1.delete(`/msg/indi/?${param_obj}`);
};
const ser1 = {
    getData, getAll, putStudent, getStudent, postStudent, postStudentUp, getAllTypes, postTypes, postRegis, deleteStudent, deleteUser, deleteType, deleteAllTypes, getNStudent, putOStudent, delete_indi_structure
};
exports.ser1 = ser1;
exports.dec = { hi: true };
/* WORKED
 return axios1.get<unknown>(`/getStudent/?${param}`)
router1.get('/getStudent/) or
router1.get('/getStudent')
//SAME
axios1.get<unknown>(`/getStudent?${param}`)
router1.get('/getStudent/')


*/
/* WORKED
  const param  = new URLSearchParams(param_obj)
   return axios1.get<unknown>(`/getStudent/${param}`)
   outer1.get('/getStudent/:obj')
*/ 
//# sourceMappingURL=axiosService.js.map