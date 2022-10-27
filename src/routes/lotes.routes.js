import { Router } from "express";

import{getLotesCortado} from '../controllers/lotes.controller.js';
import{getLoteById,updateLoteById} from '../controllers/lotes.controller.js';


const router = Router();

/*
 Ordenamos el codigo enviando las funciones al controlador
    router.get('/usuarios',(req, res) => {
    res.send('mostrando Usuarios')
});*/


router.get('/getLotesCortados',getLotesCortado) 
router.get('/getLoteById/:id',getLoteById) 
router.put('/updateLoteById/:id',updateLoteById) 

//Cuando exporto defaultm luego lo puedo llamar con el nombre que quiera
export default router;
