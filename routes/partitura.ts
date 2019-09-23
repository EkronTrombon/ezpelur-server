import { Router, Request, Response } from 'express';
import { Partitura } from '../models/partitura.model';

const partituraRoutes = Router();

// Obtener todas las partituras
partituraRoutes.get('/', (req: Request, res: Response) => {
    Partitura.find({}).exec((err, partiturasDB) => {
        if (err) throw err;
        res.json({
            ok: true,
            partituras: partiturasDB
        });
    });
});

// Crear una partitura
partituraRoutes.post('/create', (req: Request, res: Response) => {
    const parti = {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        url: req.body.url
    };
    Partitura.create(parti).then(partituraDB => {
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
partituraRoutes.post('/update/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const parti = {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        url: req.body.url
    };
    Partitura.findByIdAndUpdate(id, parti, { new: true }, (err, partituraActualizada) => {
        if (err) throw err;
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
partituraRoutes.post('/delete/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    Partitura.findOneAndDelete(id, (err, partituraBorrada) => {
        if (err) throw err;
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

export default partituraRoutes;