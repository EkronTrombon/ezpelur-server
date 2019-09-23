import { Schema, model, Document } from 'mongoose';

const actuacionSchema = new Schema({
    fecha: { type: Date, default: new Date(), required: [true, 'La fecha de la actuación es obligtoria'] },
    lugar: { type: String, required: [true, 'El lugar de la actuación es obligatorio'] },
    tipo: { type: String, required: [true, 'El tipo de actuación es obligatorio'] },
    contratacion: { type: String, required: false },
    notas: { type: String, required: false },
    musicos: [{ type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'Los músicos son obligatorios'] }],
    realizada: { type: Boolean, default: false, required: [true, 'La actuación debe estar realizada o no'] }
});

interface IActuacion extends Document {
    fecha: Date;
    lugar: string;
    tipo: string;
    contratacion: string;
    notas: string;
    musicos: Schema.Types.ObjectId;
    realizada: boolean;
};

export const Actuacion = model<IActuacion>('Actuacion', actuacionSchema);