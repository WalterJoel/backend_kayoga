import { Router } from "express";


import {createSeriadoRestante} from '../controllers/seriadoRestante.controller.js';

const router = Router();
router.post('/createSeriadoRestante',createSeriadoRestante);

//Cuando exporto default luego lo puedo llamar con el nombre que quiera
export default router;