"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const partitura_model_1 = require("../models/partitura.model");
const partituraRoutes = express_1.Router();
// Obtener todas las partituras
partituraRoutes.get('/', (req, res) => {
    partitura_model_1.Partitura.find({}).exec((err, partiturasDB) => {
        if (err)
            throw err;
        res.json({
            ok: true,
            partituras: partiturasDB
        });
    });
});
// Crear una partitura
partituraRoutes.post('/create', (req, res) => {
    const parti = {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        url: req.body.url
    };
    partitura_model_1.Partitura.create(parti).then(partituraDB => {
        res.json({
            ok: true,
            partitura: partituraDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            error: err
        });
    });
});
// Actualizar una partitura
partituraRoutes.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const parti = {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        url: req.body.url
    };
    partitura_model_1.Partitura.findByIdAndUpdate(id, parti, { new: true }, (err, partituraActualizada) => {
        if (err)
            throw err;
        if (!partituraActualizada) {
            return res.json({
                ok: false,
                mensaje: 'No existe ninguna partitura con ese Id'
            });
        }
        res.json({
            ok: true,
            partitura: partituraActualizada
        });
    });
});
// Borrar una partitura
partituraRoutes.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    partitura_model_1.Partitura.findOneAndDelete(id, (err, partituraBorrada) => {
        if (err)
            throw err;
        if (!partituraBorrada) {
            return res.json({
                ok: false,
                mensaje: 'No existe ninguna partitura con ese Id'
            });
        }
        res.json({
            ok: true,
            partitura: partituraBorrada
        });
    });
});
exports.default = partituraRoutes;
