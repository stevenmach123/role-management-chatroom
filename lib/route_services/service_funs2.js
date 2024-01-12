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
exports.mock_error_api = exports.fetch_fun = void 0;
const axiosService_1 = require("./axiosService");
const fetch_fun = (endpoint, datas, params) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (endpoint === 'getAll') {
        result = (yield axiosService_1.axios1.get('/getall', { headers: params })).data;
    }
    else if (endpoint === 'putStudent') {
        result = (yield axiosService_1.axios1.put('/student', datas)).data;
    }
    else if (endpoint === 'getStudent') {
        const param = new URLSearchParams(datas);
        result = (yield axiosService_1.axios1.get(`/student/?${param}`)).data;
    }
    else if (endpoint === 'getNStudent') {
        let param_obj = datas;
        console.log("here getNStudent");
        result = (yield axiosService_1.axios1.get(`/normal_student/?${param_obj}`, { headers: params })).data;
    }
    else if (endpoint === 'postStudent') {
        let obj = datas;
        console.log("here postStudent");
        result = (yield axiosService_1.axios1.post('/student', obj, { headers: params })).data;
    }
    else if (endpoint === 'postStudentUp') {
        let obj = datas;
        result = (yield axiosService_1.axios1.post('/student_update', obj)).data;
    }
    else if (endpoint === 'deleteStudent') {
        let id = datas;
        result = (yield axiosService_1.axios1.delete(`/student/${id}`, { headers: params })).data;
    }
    else if (endpoint === 'deleteUser') {
        let id = datas;
        result = (yield axiosService_1.axios1.delete(`/delete_user/${id}`)).data;
    }
    else if (endpoint === 'putOStudent') {
        let id = datas;
        result = (yield axiosService_1.axios1.put(`/o_student/${id}`)).data;
    }
    else if (endpoint === 'getAllTypes') {
        result = (yield axiosService_1.axios1.get('/types')).data;
    }
    else if (endpoint === 'postRegis') {
        let param_obj = datas;
        result = (yield axiosService_1.axios1.post(`/regis/${param_obj}`)).data;
    }
    else if (endpoint === 'postTypes') {
        let types = datas;
        result = (yield axiosService_1.axios1.post('/types', types)).data;
    }
    else if (endpoint === 'deleteAllTypes') {
        result = (yield axiosService_1.axios1.delete('/types')).data;
    }
    else if (endpoint === "deleteType") {
        let type = datas;
        if (!type) {
            console.log("here null", type);
            type = "c";
        }
        result = (yield axiosService_1.axios1.delete(`/type/${type}`)).data;
    }
    else if (endpoint === 'delete_indi_structure') {
        let param_obj = datas;
        result = (yield axiosService_1.axios1.delete(`/msg/indi/?${param_obj}`)).data;
    }
    else {
        result = (yield axiosService_1.axios1.get('/crypto')).data;
    }
    return result;
});
exports.fetch_fun = fetch_fun;
const mock_error_api = ({ error, where = '' }) => {
    if (error === null || error === void 0 ? void 0 : error.message) {
        console.log(where, error === null || error === void 0 ? void 0 : error.message, error === null || error === void 0 ? void 0 : error.code);
    }
    else {
        console.log(where, error);
    }
};
exports.mock_error_api = mock_error_api;
// UNDERSTAND THE extends with undefined
/*
WORK
from fetchService: <T,data extends object|string|number|boolean|undefined,param extends object>(endpoint:endprams,datas:data,params?:param):Promise<T|undefined>
 to
 service_fun2: async <T ,data extends object|string|number|boolean|undefined,param extends object> (endpoint:endprams,datas:data,params?:param):Promise<T>=>
                or async <T ,data extends object|string|number|boolean,param extends object> (endpoint:endprams,datas?:data,params?:param):Promise<T>=>
*/
/*NOTE: even service_fun2 has ?:data but "data extends" is still missing undefined
from fetchService: <T,data extends object|string|number|boolean|undefined,param extends object>(endpoint:endprams,datas:data,params?:param):Promise<T|undefined>
to  <T,data extends object|string|number|boolean,param extends object>(endpoint:endprams,datas?:data,params?:param):Promise<T|undefined>

*/
/*WORK
from fetchService: <T,data extends object|string|number|boolean|undefined,param extends object>(endpoint:endprams,datas?:data,params?:param):Promise<T|undefined>
TO
service_fun2: ?:data (with data extends same as fetchService)
*/ 
//# sourceMappingURL=service_funs2.js.map