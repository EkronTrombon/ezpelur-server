"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const partituraSchema = new mongoose_1.Schema({
    nombre: { type: String, required: [true, 'El nombre de la partitura es obligatorio'] },
    categoria: { type: String, required: [true, 'La categoría de la partitura es obligatoria'] },
    url: { type: String, required: false }
});
;
exports.Partitura = mongoose_1.model('Partitura', partituraSchema);
