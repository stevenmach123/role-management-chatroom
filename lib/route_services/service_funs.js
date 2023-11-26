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
exports.toen = exports.upperOne = exports.closeModal = exports.openModal = exports.colorLogic = exports.firebaseConfig = exports.construct_role = exports.generateId = exports.upperOneLetter = exports.colorRole = exports.identifyRole = exports.identifyRole2 = exports.checkPermit = void 0;
const axiosService_1 = require("./axiosService");
const model_1 = require("../model");
const firebaseConfig = {
    apiKey: "AIzaSyAb-6DFnFLdWVQWt_upc8wNHSXYPINl_iU",
    authDomain: "chatroom-de811.firebaseapp.com",
    databaseURL: "https://chatroom-de811-default-rtdb.firebaseio.com",
    projectId: "chatroom-de811",
    storageBucket: "chatroom-de811.appspot.com",
    messagingSenderId: "251906167695",
    appId: "1:251906167695:web:2e0df37d3398811b48b1fa",
    measurementId: "G-GLZ4K7DZ4Q"
};
exports.firebaseConfig = firebaseConfig;
const checkPermit = (roles, ...allowedRoles) => {
    console.log(roles);
    try {
        let result = Object.values(roles).map(r => allowedRoles.includes(r)).find(x => x === true);
        if (result)
            return true;
        else
            return false;
    }
    catch (e) {
        console.log('checkPermit', e);
        return false;
    }
};
exports.checkPermit = checkPermit;
const identifyRole2 = (roles) => {
    if (!roles)
        return '';
    const result = model_1.t_role.get(Math.min(...Object.values(roles)));
    if (result)
        return result;
    else
        return '';
};
exports.identifyRole2 = identifyRole2;
const identifyRole = (r) => {
    try {
        const roles = r;
        if (roles) {
            return Math.min(...Object.values(roles));
        }
        throw 'bad identifyRole';
    }
    catch (e) {
        console.log(e);
        return -1;
    }
};
exports.identifyRole = identifyRole;
const colorRole = (r) => {
    try {
        const roles = r;
        const idx = (0, exports.identifyRole)(roles);
        if (idx === 1 || idx === 2)
            return model_1.color_role.get(idx);
        else
            throw 'bad color';
    }
    catch (e) {
        return 'white';
    }
};
exports.colorRole = colorRole;
const generateId = (num) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (yield axiosService_1.axios1.get('/id')).data;
    let i = 0;
    let loop = 0;
    let uid = "";
    do {
        i = 0;
        while (i < num) {
            let d = Math.floor(Math.random() * 10);
            if (d === 0 && i === 0)
                d = 1;
            uid += d.toString();
            i++;
        }
        ++loop;
    } while (Array.from(id).find(d => d === uid) && loop < 5000);
    if (loop === 5000) {
        throw 'max user exceed';
    }
    return uid;
});
exports.generateId = generateId;
const construct_role = (val) => {
    let roles = {};
    let de = new Set([3]);
    try {
        val.forEach(val => de.add(val));
        de.forEach(ro => {
            let role = model_1.t_role.get(ro);
            if (role) {
                roles[role] = ro;
            }
            else
                throw "bad";
        });
        return roles;
    }
    catch (e) {
        return undefined;
    }
};
exports.construct_role = construct_role;
const colors = { yellow: "#f9f425", red: "#f93125", blue: "#14c6eb", pink: '#f747f7' };
function upperOneLetter(x) {
    if (x)
        return x.substring(0, 1).toUpperCase();
    else
        return '';
}
exports.upperOneLetter = upperOneLetter;
const colorLogic = (group_name) => {
    const random_select = Math.floor(Math.random() * 4);
    const colors_ar = Object.entries(colors);
    if (group_name === "shark") {
        return colors['blue'];
    }
    else if (group_name === "lion") {
        return colors['yellow'];
    }
    else if (group_name === "dragon") {
        return colors['red'];
    }
    else if (group_name === "cobra") {
        return colors['pink'];
    }
    else {
        console.log(colors_ar);
        const color = colors_ar[random_select][1];
        return color;
    }
};
exports.colorLogic = colorLogic;
const openModal = (target) => {
    const wrapper = document.querySelector(`.wrapper#${target}`);
    const modal = document.querySelector(`.modall#${target}`);
    wrapper === null || wrapper === void 0 ? void 0 : wrapper.classList.add('active');
    modal === null || modal === void 0 ? void 0 : modal.classList.add('active');
};
exports.openModal = openModal;
const closeModal = (target) => {
    const wrapper = document.querySelectorAll('.wrapper');
    const modal = document.querySelector(`.modall#${target}`);
    wrapper.forEach(f => {
        f.classList.remove('active');
    });
    modal === null || modal === void 0 ? void 0 : modal.classList.remove('active');
};
exports.closeModal = closeModal;
const upperOne = (a) => {
    const b = a.toString();
    const c = b.toLowerCase();
    if (c.charAt(0)) {
        return c.charAt(0).toUpperCase() + c.slice(1, c.length);
    }
    return c;
};
exports.upperOne = upperOne;
const toen = { t: '' };
exports.toen = toen;
//# sourceMappingURL=service_funs.js.map