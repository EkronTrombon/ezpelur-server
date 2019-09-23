import { Schema, model, Document } from 'mongoose';


const partituraSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre de la partitura es obligatorio'] },
    categoria: { type: String, required: [true, 'La categoría de la partitura es obligatoria'] },
    url: { type: String, required: false }
});

interface IPartitura extends Document {
    nombre: string;
    categoria: string;
    url: string;
};

export const Partitura = model<IPartitura>('Partitura', partituraSchema);