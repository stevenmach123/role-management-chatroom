"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.password_check = exports.name_check = exports.pro = exports.Sleep = exports.color_role = exports.properties = exports.t_role = void 0;
const t_role = new Map([[1, "admin"], [2, "manage"], [3, "user"]]);
exports.t_role = t_role;
const color_role = new Map([[1, 'yellow'], [2, 'aqua']]);
exports.color_role = color_role;
const properties = {
    ser_port: 4010,
    soc_port: 4011
};
exports.properties = properties;
function Sleep(x) {
    return new Promise((r) => setTimeout(r, x));
}
exports.Sleep = Sleep;
function pro(x) {
    return new Promise((resolve, reject) => {
        x.then((v) => resolve(v.data)).catch(e => reject(e));
    });
}
exports.pro = pro;
exports.name_check = new RegExp('^([a-zA-z]+|[a-zA-z]+\s[a-zA-z]+)+$');
exports.password_check = new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-z0-9!@#$%^&*]*$');
//# sourceMappingURL=model.js.map