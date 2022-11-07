import { Router } from "express";


import {createSeriadoRestante,updateSeriadoRestanteAlSeparar} from '../controllers/seriadoRestante.controller.js';

const router = Router();
router.post('/createSeriadoRestante',createSeriadoRestante);
router.put('/updateSeriadoRestanteAlSeparar',updateSeriadoRestanteAlSeparar);

//Cuando exporto default luego lo puedo llamar con el nombre que quiera
export default router;