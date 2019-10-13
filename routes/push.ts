import { Router, Request, Response } from 'express';

const OneSignal = require('onesignal-node');

const pushRoutes = Router();

pushRoutes.post('/', (req: Request, res: Response) => {
    const titulo = req.body.titulo;
    const mensaje = req.body.mensaje;
    const myClient = new OneSignal.Client({      
        userAuthKey: 'NGFhYTlmNDMtOTRmYS00ZGZjLWI0YjEtOWQ3MzU4MjkzNmQy',    
        app: { appAuthKey: 'ZDM5OTVjNWMtOGVlZC00YjVkLThiMGItYmMyMjAwZTE3OGU1', appId: '22838bb2-8651-459b-8b96-8f5047b8c934' }      
     });
     const noti = new OneSignal.Notification({      
        contents: { es: mensaje, en: mensaje }      
    });
    noti.postBody["included_segments"] = ["Active Users", "Inactive Users"];
    noti.postBody["headings"] = { es: titulo, en: titulo };

    myClient.sendNotification(noti).then((resp: any) => {      
        console.log(resp.data, resp.httpResponse.statusCode);
        res.json({
            ok: true,
            mensaje: resp.data
        });
    }).catch((err: any) => {      
        console.log('Something went wrong...', err);
        res.json({
            ok: false,
            err
        });
    });
});

export default pushRoutes;