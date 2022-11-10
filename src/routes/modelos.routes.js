import { Router } from "express";

import{getAllModelos,getAllModelosBySerieAndColor,
       getZapatillasBySerie,updateAllZapatillas} from '../controllers/modelos.controller.js';

const router = Router();


router.get('/getAllModelos',getAllModelos)
router.get('/getAllModelosBySerieAndColor/:serie',getAllModelosBySerieAndColor)
router.get('/getZapatillasBySerie/:serie/:modelo',getZapatillasBySerie)
router.put('/updateAllZapatillas',updateAllZapatillas)
//Cuando exporto default luego lo puedo llamar con el nombre que quiera
export default router;
