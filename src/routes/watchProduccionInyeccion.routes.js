import { Router } from "express";

import{ saveOrdenInyeccion,getOrdenInyeccion } from '../controllers/watchProduccionInyeccion.controller.js';


const router = Router();


router.post('/saveOrdenInyeccion', saveOrdenInyeccion );
router.get('/getOrdenInyeccion', getOrdenInyeccion );


//Cuando exporto defaultm luego lo puedo llamar con el nombre que quiera
export default router;
