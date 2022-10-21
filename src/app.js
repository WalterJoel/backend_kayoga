//Se crea este archivo para no tener todo en index.js
import express from 'express';
import {PORT} from './config.js'
//Para usar la ruta de los lotes
import lotesRoutes from './routes/lotes.routes.js';
import indexRoutes from './routes/index.routes.js';
import seriadosRoutes from './routes/seriados.routes.js'
const app = express();

// Para poder recibir json desde el body de la peticion
app.use(express.json());

app.use(lotesRoutes);
app.use(indexRoutes);
app.use(seriadosRoutes);


//Exporto para llamar desde index.js
export default app;