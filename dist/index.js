"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const actuacion_1 = __importDefault(require("./routes/actuacion"));
const cors_1 = __importDefault(require("cors"));
const partitura_1 = __importDefault(require("./routes/partitura"));
const server = new server_1.default();
// Bdy parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// Configuración CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Rutas de la app
server.app.use('/user', usuario_1.default);
server.app.use('/actuacion', actuacion_1.default);
server.app.use('/partitura', partitura_1.default);
// Conexión con MongoDB
mongoose_1.default.connect(server.urlDB, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err)
        throw err;
    console.log('Url actual: ', server.urlDB);
    console.log('Base de datos ONLINE');
});
// Levantar el servidor express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port} : Entorno: ${server.env}`);
});
