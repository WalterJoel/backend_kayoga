import { Router } from "express";

import{ saveOrdenInyeccion,getOrdenInyeccion,saveOrdenInyeccionMaquinista,verificarOrdenInyeccionAbierta } from '../controllers/watchProduccionInyeccion.controller.js';


const router = Router();


router.post('/saveOrdenInyeccion', saveOrdenInyeccion );
router.get('/getOrdenInyeccion', getOrdenInyeccion );
router.get('/verificarOrdenInyeccionAbierta',verificarOrdenInyeccionAbierta)
router.post('/saveOrdenInyeccionMaquinista', saveOrdenInyeccionMaquinista);

//Cuando exporto defaultm luego lo puedo llamar con el nombre que quiera
export default router;
