import { Router, Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const imgRoutes = Router();

imgRoutes.get('/:tipo/:img', (req: Request, res: Response) => {
    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathUrl = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
    if (fs.existsSync(pathUrl)) {
        res.sendFile(pathUrl);
    } else {
        let noUserPath = path.resolve(__dirname, '../assets/noUser.png');
        res.sendFile(noUserPath);
    }
});

export default imgRoutes;