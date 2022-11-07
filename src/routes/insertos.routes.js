import { Router } from "express";

import{getInsertosBySerie,updateAllInsertos} from '../controllers/insertos.controller.js';

const router = Router();


router.get('/getInsertosBySerie/:serieInserto',getInsertosBySerie); 
router.put('/updateAllInsertos',updateAllInsertos); 

//Cuando exporto defaultm luego lo puedo llamar con el nombre que quiera
export default router;
