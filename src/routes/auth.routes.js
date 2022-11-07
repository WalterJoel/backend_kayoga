import { Router } from "express";

import{login,logout} from '../controllers/auth.controller.js';
import {checkAuth} from '../middlewares/auth.middleware.js'

const router = Router();


router.post('/login',login) 
router.put('/logout',logout) 

//Cuando exporto defaultm luego lo puedo llamar con el nombre que quiera
export default router;
