import { Router, Request, Response } from 'express';
import { Actuacion } from '../models/actuacion.model';

const actuacionRoutes = Router();

// Obtener todas las actuaciones
actuacionRoutes.get('/', (req: Request, res: Response) => {
    Actuacion.find({}).sort({ fecha: 'ascending' }).populate('usuarios', 'nombre apellido').exec((err, actuacionesDB) => {
        if (err) throw err;
        res.json({
            ok: true,
            actuaciones: actuacionesDB
        });
    });
});

// Crear una actuación
actuacionRoutes.post('/create', (req: Request, res: Response) => {
    const act = {
        fecha: req.body.fecha,
        lugar: req.body.lugar,
        tipo: req.body.tipo,
        contratacion: req.body.contratacion,
        notas: req.body.notas,
        musicos: req.body.musicos,
        realizada: req.body.realizada
    };
    Actuacion.create(act).then(actuacionDB => {
        res.json({
            ok: true,
            actuacion: actuacionDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            error: err
        });
    });
});

// Actualizar una actuación por ID
actuacionRoutes.post('/update/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const act = {
        fecha: req.body.fecha,
        lugar: req.body.lugar,
        tipo: req.body.tipo,
        contratacion: req.body.contratacion,
        notas: req.body.notas,
        musicos: req.body.musicos,
        realizada: req.body.realizada
    };
    Actuacion.findByIdAndUpdate(id, act, { new: true }, (err, actuacionDB) => {
        if (err) throw err;
        if (!actuacionDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe ninguna actuación con ese Id'
            });
        }
        res.json({
            ok: true,
            actuacion: actuacionDB
        });
    });
});

actuacionRoutes.post('/delete/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    Actuacion.findOneAndDelete(id, (err, actuacionBorrada) => {
        if (err) throw err;
        if (!actuacionBorrada) {
            return res.json({
                ok: false,
                mensaje: 'No existe ninguna actuación con ese Id'
            });
        }
        res.json({
            ok: true,
            actuacion: actuacionBorrada
        });
    });
});

export default actuacionRoutes;