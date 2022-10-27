import { Router } from "express";

import{getAllModelos,getAllModelosBySerieAndColor} from '../controllers/modelos.controller.js';

const router = Router();


router.get('/getAllModelos',getAllModelos)
router.get('/getAllModelosBySerieAndColor/:serie',getAllModelosBySerieAndColor)

//Cuando exporto default luego lo puedo llamar con el nombre que quiera
export default router;
