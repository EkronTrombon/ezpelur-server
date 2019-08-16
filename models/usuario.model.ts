import { Schema, model, Document } from "mongoose";


const usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    apellido: { type: String, required: [true, 'El apellido es obligatorio'] },
    email: { type: String, required: [true, 'El email es obligatorio'] },
    tfno: { type: String, required: [true, 'El teléfono es obligatorio'] },
    instrumento: { type: String, required: [true, 'El instrumento es obligatorio'] },
    instrumentoSec: { type: String, required: false }
});

interface IUsuario extends Document {
    nombre: string;
    apellido: string;
    email: string;
    tfno: string;
    instrumento: string;
    instrumentoSec: string;
};

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);