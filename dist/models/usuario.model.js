"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const usuarioSchema = new mongoose_1.Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    apellido: { type: String, required: [true, 'El apellido es obligatorio'] },
    email: { type: String, required: [true, 'El email es obligatorio'] },
    tfno: { type: String, required: [true, 'El teléfono es obligatorio'] },
    instrumento: { type: String, required: [true, 'El instrumento es obligatorio'] },
    instrumentoSec: { type: String, required: false }
});
;
exports.Usuario = mongoose_1.model('Usuario', usuarioSchema);
