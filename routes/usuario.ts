import { Router, Request, Response } from 'express';
import { Usuario } from '../models/usuario.model';

const userRoutes = Router();

// Obtener todos los usuarios
userRoutes.get('/', (req: Request, res: Response) => {
    Usuario.find((err, usuariosDB) => {
        if (err) throw err;
        res.json({
            ok: true,
            usuarios: usuariosDB
        });
    });
});

// Obtener usuario por ID
userRoutes.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) throw err;
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
userRoutes.post('/create', (req: Request, res: Response) => {
    const user = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        tfno: req.body.tfno,
        instrumento: req.body.instrumento,
        instrumentoSec: req.body.instrumentoSec,
        img: req.body.img
    };
    Usuario.create(user).then(userDB => {
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
userRoutes.post('/update/:id', (req: Request, res: Response) => {
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
    Usuario.findByIdAndUpdate(id, user, { new: true }, (err, usuarioDB) => {
        if (err) throw err;
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

userRoutes.post('/delete/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    Usuario.findByIdAndDelete(id, (err, userBorrado) => {
        if (err) throw err;
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

export default userRoutes;