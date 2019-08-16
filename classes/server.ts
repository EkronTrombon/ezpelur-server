import express from 'express';

export default class Server {
    public app: express.Application;
    public port: string|number = process.env.PORT || 3000;
    public env: string = process.env.NODE_ENV || 'dev';
    public urlDB: string = '';

    constructor() {
        this.app = express();
        if (this.env === 'dev') {
            this.urlDB = 'mongodb://localhost:27017/ezpelur';
        } else {
            this.urlDB = 'mongodb+srv://ekron:unLAWeKMpZPcmy27@cluster0-teuj3.mongodb.net/ezpelur';
        }
    }

    start(callback: any) {
        this.app.listen(this.port, callback);
    }
}