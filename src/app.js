//Se crea este archivo para no tener todo en index.js
import express from 'express';


//Uso cualquier nombre porque exportan by default
import lotesRoutes from './routes/lotes.routes.js';
import indexRoutes from './routes/index.routes.js';
import seriadosRoutes from './routes/seriados.routes.js'
import aparadoresRoutes from './routes/aparadores.routes.js';
import modelosRoutes from './routes/modelos.routes.js';
import seriadoRestanteRoutes from './routes/seriadoRestante.routes.js';
import watchProduccionAparadoRoutes from './routes/watchProduccionAparado.routes.js';
import authRoutes from './routes/auth.routes.js';
import insertosRoutes from './routes/insertos.routes.js';
import watchProduccionInyectadoRoutes from './routes/watchProduccionInyeccion.routes.js'
const app = express();

// Para poder recibir json desde el body de la peticion
app.use(express.json());
// ************ MUY IMPORTANTE DEFINIRLO ANTES DE LLAMAR A LAS RUTAS
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
app.set('Access-Control-Allow-Origin', '*');

app.use(lotesRoutes);
app.use(indexRoutes);
app.use(seriadosRoutes);
app.use(aparadoresRoutes);
app.use(modelosRoutes);
app.use(seriadoRestanteRoutes);
app.use(authRoutes);
app.use(insertosRoutes);
app.use(watchProduccionAparadoRoutes);
app.use(watchProduccionInyectadoRoutes);

//Exporto para llamar desde index.js
export default app;




/*          IMPORTANTE AL DESARROLLADOR               
- Para habilitar el CORS es necesario colocar el allo encima o antes de definir las rutas
- Al enviar desde React JSON debemos poner content type en el axios o fetch sino no reconoce y no inserta
- 
*/ 

/*
para conectarse a heroku 
- heroku git:remote -a kayoga
- heroku logs --tail
*/