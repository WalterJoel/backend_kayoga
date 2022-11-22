import { Router } from "express";


import {createSeriadoRestante,
        updateSeriadoRestanteAlSeparar,
        getSeriadoRestanteByTalla} from '../controllers/seriadoRestante.controller.js';

const router = Router();
router.post('/createSeriadoRestante',createSeriadoRestante);
router.put('/updateSeriadoRestanteAlSeparar',updateSeriadoRestanteAlSeparar);
router.get('/getSeriadoRestanteByTalla/:molde/:serie/:talla',getSeriadoRestanteByTalla);

//Cuando exporto default luego lo puedo llamar con el nombre que quiera
export default router;