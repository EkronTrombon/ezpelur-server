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
const usuario_model_1 = require("../models/usuario.model");
const fileUpload = require("express-fileupload");
const uploadRoutes = express_1.Router();
uploadRoutes.use(fileUpload());
uploadRoutes.put('/:tipo/:id', (req, res) => {
    let tipo = req.params.tipo;
    let id = req.params.id;
    if (!req.files) {
        return res.json({
            ok: false,
            mensaje: 'No hay ningún archivo para subir'
        });
    }
    // Validar los tipos
    let tiposValidos = ['usuarios', 'fotos'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            err: 'Los tipos válidos son: ' + tiposValidos.join(', ')
        });
    }
    let archivo = req.files.file;
    let nombreCortado = archivo.name.split('.');
    let ext = nombreCortado[nombreCortado.length - 1];
    // Validar las extensiones
    let extValidas = ['png', 'jpg', 'jpeg'];
    if (!extValidas.includes(ext)) {
        return res.status(400).json({
            ok: false,
            err: 'El archivo no es una imagen'
        });
    }
    // Cambio de nombre al archivo
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${ext}`;
    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        }
        imagenUsuario(id, res, nombreArchivo);
    });
});
function imagenUsuario(id, res, nombreArchivo) {
    usuario_model_1.Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(500).json({
                ok: false,
                error: err
            });
        }
        if (!usuarioDB) {
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario no existe'
            });
        }
        borraArchivo(usuarioDB.img, 'usuarios');
        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, usuarioDB) => {
            res.json({
                ok: true,
                usuario: usuarioDB,
                img: nombreArchivo
            });
        });
    });
}
function borraArchivo(nombreImagen, tipo) {
    let pathUrl = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
    if (fs.existsSync(pathUrl)) {
        fs.unlinkSync(pathUrl);
    }
}
exports.default = uploadRoutes;
