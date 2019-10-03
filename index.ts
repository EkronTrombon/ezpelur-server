import Server from './classes/server';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/usuario';
import actuacionRoutes from './routes/actuacion';
import cors from 'cors';
import partituraRoutes from './routes/partitura';
import uploadRoutes from './routes/upload';
import imgRoutes from './routes/imagenes';

const server = new Server();

// Bdy parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// Configuración CORS
server.app.use(cors({ origin: true, credentials: true }));

// Rutas de la app
server.app.use('/user', userRoutes);
server.app.use('/actuacion', actuacionRoutes);
server.app.use('/partitura', partituraRoutes);
server.app.use('/upload', uploadRoutes);
server.app.use('/img', imgRoutes);

// Conexión con MongoDB
mongoose.connect(server.urlDB, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err) throw err;
    console.log('Url actual: ', server.urlDB);
    console.log('Base de datos ONLINE');
});

// Levantar el servidor express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port} : Entorno: ${server.env}`);
});