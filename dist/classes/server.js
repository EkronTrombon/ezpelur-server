"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this.port = process.env.PORT || 3000;
        this.env = process.env.NODE_ENV || 'dev';
        this.urlDB = '';
        this.app = express_1.default();
        if (this.env === 'dev') {
            this.urlDB = 'mongodb://localhost:27017/ezpelur';
        }
        else {
            this.urlDB = 'mongodb+srv://ekron:unLAWeKMpZPcmy27@cluster0-teuj3.mongodb.net/ezpelur';
        }
    }
    start(callback) {
        this.app.listen(this.port, callback);
    }
}
exports.default = Server;
