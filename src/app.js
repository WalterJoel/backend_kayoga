//Se crea este archivo para no tener todo en index.js
import express from 'express';
import {PORT} from './config.js'
import cors from 'cors';
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

app.use(cors()); 
// Enable CORS
/*const corsOptions = {
    origin: true,
    credentials: true
  }
  app.options('*', cors(corsOptions)); // preflight OPTIONS; put before other routes
  /*app.listen(3000, function(){
    console.log('CORS-enabled web server listening on port 80');
  });*/

//Exporto para llamar desde index.js
export default app;