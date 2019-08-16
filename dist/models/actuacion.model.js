"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const actuacionSchema = new mongoose_1.Schema({
    fecha: { type: Date, default: new Date(), required: [true, 'La fecha de la actuación es obligtoria'] },
    lugar: { type: String, required: [true, 'El lugar de la actuación es obligatorio'] },
    tipo: { type: String, required: [true, 'El tipo de actuación es obligatorio'] },
    contratacion: { type: String, required: false },
    notas: { type: String, required: false },
    musicos: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'Los músicos son obligatorios'] }],
    realizada: { type: Boolean, default: false, required: [true, 'La actuación debe estar realizada o no'] }
});
;
exports.Actuacion = mongoose_1.model('Actuacion', actuacionSchema);
