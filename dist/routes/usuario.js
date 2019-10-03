"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const userRoutes = express_1.Router();
// Obtener todos los usuarios
userRoutes.get('/', (req, res) => {
    usuario_model_1.Usuario.find((err, usuariosDB) => {
        if (err)
            throw err;
        res.json({
            ok: true,
            usuarios: usuariosDB
        });
    });
});
// Obtener usuario por ID
userRoutes.get('/:id', (req, res) => {
    const id = req.params.id;
    usuario_model_1.Usuario.findById(id, (err, usuarioDB) => {
        if (err)
            throw err;
        if (!usuarioDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe ningún usuario con ese ID'
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});
// Creación de usuarios
userRoutes.post('/create', (req, res) => {
    const user = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        tfno: req.body.tfno,
        instrumento: req.body.instrumento,
        instrumentoSec: req.body.instrumentoSec,
        img: req.body.img
    };
    usuario_model_1.Usuario.create(user).then(userDB => {
        res.json({
            ok: true,
            usuario: userDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            error: err
        });
    });
});
// Actualizar usuario por ID
userRoutes.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const user = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        tfno: req.body.tfno,
        instrumento: req.body.instrumento,
        instrumentoSec: req.body.instrumentoSec,
        img: req.body.img
    };
    usuario_model_1.Usuario.findByIdAndUpdate(id, user, { new: true }, (err, usuarioDB) => {
        if (err)
            throw err;
        if (!usuarioDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe ningún usuario con ese ID'
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});
userRoutes.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    usuario_model_1.Usuario.findByIdAndDelete(id, (err, userBorrado) => {
        if (err)
            throw err;
        if (!userBorrado) {
            return res.json({
                ok: false,
                mensaje: 'No existe ningún usuario con ese ID'
            });
        }
        res.json({
            ok: true,
            usuario: userBorrado
        });
    });
});
exports.default = userRoutes;
