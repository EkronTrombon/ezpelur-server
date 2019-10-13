"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OneSignal = require('onesignal-node');
const pushRoutes = express_1.Router();
pushRoutes.post('/', (req, res) => {
    const myClient = new OneSignal.Client({
        userAuthKey: 'NGFhYTlmNDMtOTRmYS00ZGZjLWI0YjEtOWQ3MzU4MjkzNmQy',
        // note that "app" must have "appAuthKey" and "appId" keys      
        app: { appAuthKey: 'ZDM5OTVjNWMtOGVlZC00YjVkLThiMGItYmMyMjAwZTE3OGU1', appId: '22838bb2-8651-459b-8b96-8f5047b8c934' }
    });
    const noti = new OneSignal.Notification({
        contents: {
            en: "Test notification!!",
            es: "Notificación de prueba!!"
        }
    });
    noti.postBody["included_segments"] = ["Active Users", "Inactive Users"];
    noti.postBody["headings"] = {
        en: "This is the english title",
        es: "Este es el titulo en español"
    };
    myClient.sendNotification(noti).then((resp) => {
        console.log(resp.data, resp.httpResponse.statusCode);
        res.json({
            ok: true,
            mensaje: resp.data
        });
    }).catch((err) => {
        console.log('Something went wrong...', err);
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = pushRoutes;
