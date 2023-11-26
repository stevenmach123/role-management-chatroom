"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bb = exports.vertifyRole = void 0;
const model_1 = require("../model");
const vertifyRole = (req, res, next) => {
    const roles = req.roles;
    let allowedR = req.query.roles;
    const allowsRoles = [];
    let temp = [];
    console.log(req.name, roles);
    if (typeof allowedR === 'string')
        allowedR = [req.query.roles];
    if (!roles)
        return res.status(400).json('verityrole error 1');
    for (let i of allowedR) {
        temp.push(Array.from(model_1.t_role.values()).indexOf(i));
    }
    for (let n of temp) {
        if (typeof n !== 'undefined') {
            allowsRoles.push(n + 1);
        }
        else
            return res.status(400).json('verityrole error 2');
    }
    const result = roles.map(r => allowsRoles.includes(r)).find(x => x === true);
    if (result) {
        return next();
    }
    else {
        console.log("v4");
        return res.status(400).json('verityrole error 3');
    }
};
exports.vertifyRole = vertifyRole;
const bb = (req, res, next) => {
    throw 'dumb';
    next();
};
exports.bb = bb;
//# sourceMappingURL=vertifyRole.js.map