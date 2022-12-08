import { Router } from "express";

import{getLotesCortado,getLotesByEstado,getLotesByEstadoWithoutModels,getLotesPorContar, getLotesPorSeparar} from '../controllers/lotes.controller.js';
import{getLoteById,enviarLoteEstampadoById,getLotesCortadoyEstampado, updateLoteById,getLotesByIdAparadorAndEstado,getLotesPorEditar,updateSpecificInfoLoteById,darBajaLoteById   } from '../controllers/lotes.controller.js';
import {checkAuth} from '../middlewares/auth.middleware.js'
//import {checkRoleAuth} from '../middlewares/roleAuth.middleware.js'
const router = Router();

/*
 Ordenamos el codigo enviando las funciones al controlador
    router.get('/usuarios',(req, res) => {
    res.send('mostrando Usuarios')
});*/

/*
    checkAuth: Verifica que el usuario tenga un token activo y generado por el sistema no por otro
    checkRoleAuth: Verifica el rol del usuario
*/

router.get('/getLotesCortados',getLotesCortado) 
router.get('/getLotesPorEditar',getLotesPorEditar) 
router.get('/getLoteById/:id',getLoteById) 
router.get('/getLotesCortadoyEstampado',getLotesCortadoyEstampado) 
router.put('/darBajaLoteById/:id',darBajaLoteById);
router.put('/enviarLoteEstampadoById/:id',enviarLoteEstampadoById); 
router.put('/updateSpecificInfoLoteById/:id',updateSpecificInfoLoteById) 
router.put('/updateLoteById/:id',updateLoteById) 
router.get('/getLotesByIdAparadorAndEstado/:idAparador/:estadoLotes',getLotesByIdAparadorAndEstado);
router.get('/getLotesByEstado/:estadoLotes',getLotesByEstado);
router.get('/getLotesByEstadoWithoutModels/:estadoLotes',getLotesByEstadoWithoutModels);
router.get('/getLotesPorContar',getLotesPorContar);
router.get('/getLotesPorSeparar',getLotesPorSeparar);

//Cuando exporto defaultm luego lo puedo llamar con el nombre que quiera
export default router;
