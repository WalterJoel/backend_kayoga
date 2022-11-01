import { Router } from "express";


import {updateSeriadoRestanteById} from '../controllers/seriadoRestante.controller.js';

const router = Router();
router.put('/updateSeriadoRestanteById/:id',updateSeriadoRestanteById)

//Cuando exporto default luego lo puedo llamar con el nombre que quiera
export default router;