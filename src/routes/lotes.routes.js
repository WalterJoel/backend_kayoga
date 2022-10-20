import { Router } from "express";

import{getLotes} from '../controllers/lotes.controller.js';


const router = Router();

/*
 Ordenamos el codigo enviando las funciones al controlador
    router.get('/usuarios',(req, res) => {
    res.send('mostrando Usuarios')
});*/
router.get('/usuarios',getLotes) 


//Cuando exporto defaultm luego lo puedo llamar con el nombre que quiera
export default router;
