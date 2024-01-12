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
const react_1 = require("react");
const axios_1 = require("axios");
const react_router_dom_1 = require("react-router-dom");
const service_funs2_1 = require("./service_funs2");
const FetchService = () => {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setEr] = (0, react_1.useState)();
    const navi = (0, react_router_dom_1.useNavigate)();
    const [gen_loading, setGenLoading] = (0, react_1.useState)(false);
    /*const fun2  = async <V extends object|string|number|boolean|void>(promise:()=>Promise<V>):Promise<V>=>{
       return await promise()
    }*/
    const fun = ({ endpoint, datas, params, note = "" }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setLoading(true);
            setEr(null);
            console.log("--", datas);
            const val = yield (0, service_funs2_1.fetch_fun)(endpoint, datas, params);
            return val;
        }
        catch (e) {
            if ((0, axios_1.isAxiosError)(e)) {
                if (e.response) {
                    console.log(note, e.response.status, e.response.data);
                    setEr(e.response.status + " " + e.response.data);
                    if (e.response.status === 415) {
                        navi('/signin');
                    }
                }
                if (e.request) {
                    console.log(note, e.request);
                    setEr(JSON.stringify(e.request));
                }
                else {
                    console.log(note, 'Server error');
                    setEr('Server error');
                }
            }
            else if (e === null || e === void 0 ? void 0 : e.code) {
                let msg = note + " " + e.code + " " + e.message;
                console.log(note, msg);
                setEr(msg);
            }
            else {
                console.log(note, e);
            }
        }
        finally {
            setLoading(false);
        }
    });
    return { loading, error, fun, gen_loading, setGenLoading };
};
exports.default = FetchService;
//# sourceMappingURL=FetchService.js.map