import { Router } from "express";

import{getSeriados, createSeriados} from '../controllers/seriados.controller.js';


const router = Router();

/*
 Ordenamos el codigo enviando las funciones al controlador
    router.get('/usuarios',(req, res) => {
    res.send('mostrando Usuarios')
});*/


router.get('/getSeriados',getSeriados)
router.post('/postSeriados',createSeriados) 


//Cuando exporto defaultm luego lo puedo llamar con el nombre que quiera
export default router;
