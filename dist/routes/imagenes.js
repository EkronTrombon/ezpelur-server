"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const imgRoutes = express_1.Router();
imgRoutes.get('/:tipo/:img', (req, res) => {
    let tipo = req.params.tipo;
    let img = req.params.img;
    let pathUrl = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
    if (fs.existsSync(pathUrl)) {
        res.sendFile(pathUrl);
    }
    else {
        let noUserPath = path.resolve(__dirname, '../assets/noUser.png');
        res.sendFile(noUserPath);
    }
});
exports.default = imgRoutes;
