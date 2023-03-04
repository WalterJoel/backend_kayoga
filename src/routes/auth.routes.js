import { Router } from "express";

import{signIn,logout} from '../controllers/auth.controller.js';

const router = Router();


router.post('/signIn',signIn) 
router.put('/logout',logout) 

//Cuando exporto defaultm luego lo puedo llamar con el nombre que quiera
export default router;
