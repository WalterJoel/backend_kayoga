import { request } from 'express';
import {pool} from '../db.js'

export const getLotesCortado = async (req, res) => {
    try {
        const [rows]= await pool.query(`SELECT * FROM lotes WHERE lotes.estado = 'Cortado'`);
        res.json(rows);
        //res.send('Post Success');  
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal'
        })
        
    }
};

//Puedo editar cualquier lote, excepto los resueltos o anulados
export const getLotesPorEditar = async (req, res) => {
    try {
        const [rows]= await pool.query(`SELECT * FROM lotes WHERE lotes.estado != 'Resuelto' 
                                                            AND lotes.estado != 'Anulado' `);
        res.json(rows);
        //res.send('Post Success');  
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal'
        })
        
    }
};
//Funcion que retorna la lista de lotes por Estado y por ID Aparador
export const getLotesByIdAparadorAndEstado = async(req,res) =>{
    try {
        const {idAparador,estadoLotes}=req.params
        //console.log('ss',idAparador,estadoLotes);
        //Hay que tener cuidado en los inner join por el tema de los ids
        const [rows]= await pool.query(`SELECT 
                                        lotes.metraje,
                                        lotes.idaparador, 
                                        lotes.fecha_creacion as fechaCorte, 
                                        lotes.color as color_lona,
                                        lotes.fecha_creacion,
                                        lotes.garibaldi,lotes.contrafuerte,
                                        seriados.talla1 as talla1Seriado,
                                        seriados.talla2 as talla2Seriado,
                                        seriados.talla3 as talla3Seriado,
                                        seriados.talla4 as talla4Seriado,
                                        seriados.talla5 as talla5Seriado,

                                        aparadores.sobrenombre as nombreAparador,
                                        
                                        seriado_restante.talla1 as talla1SeriadoRes,
                                        seriado_restante.talla2 as talla2SeriadoRes,
                                        seriado_restante.talla21 as talla21SeriadoRes,
                                        seriado_restante.talla3 as talla3SeriadoRes,
                                        seriado_restante.talla31 as talla31SeriadoRes,
                                        seriado_restante.talla4 as talla4SeriadoRes,
                                        seriado_restante.talla41 as talla41SeriadoRes,
                                        seriado_restante.talla5 as talla5SeriadoRes,
                                        seriado_restante.talla51 as talla51SeriadoRes,

                                        lotes.idlote,
                                        lotes.serie as serieLote,
                                        lotes.detalle_insumos_aparado,
                                        watch_produccion_aparado.fecha_creacion as fechaEntregaAparado,
                                        watch_produccion_aparado.fecha_conteo,
                                        watch_produccion_aparado.total_pares_segun_aparador,
                                        watch_produccion_aparado.total_pares_segun_contador,
                                        watch_produccion_aparado.descripcion_contador,
                                        seriado_restante.descripcion_aparador,
                                        lotes.descripcion as descripcion_cortador, 
                                        lotes.estado as estado_lote,
                                        CONCAT(modelos.nombre_modelo,' ',modelos.serie_modelo,' ',modelos.pasador_mocasin,
                                        ' ',modelos.tipo_modelo, ' ',color_modelos.color_modelo) 
                                        AS infomodelo, CONCAT(seriados.talla1+seriados.talla2+seriados.talla3+seriados.talla4+seriados.talla5)
                                        AS total_pares_seriado_inicial
                                        FROM lotes
                                        INNER JOIN aparadores ON lotes.idaparador = aparadores.idaparador
                                        INNER JOIN modelos ON lotes.idmodelo = modelos.idmodelo
                                        INNER JOIN color_modelos ON modelos.idcolormodelo = color_modelos.idcolormodelo
                                        INNER JOIN seriados ON lotes.idseriado = seriados.idseriado
                                        LEFT JOIN seriado_restante ON lotes.idseriadorestante = seriado_restante.idseriadorestante
                                        LEFT JOIN watch_produccion_aparado ON lotes.idlote = watch_produccion_aparado.idlote
                                        WHERE lotes.estado = '${estadoLotes.toString()}' 
                                        AND lotes.idaparador=${idAparador}`);

        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal'
        })
        
    }
};
//Funcion que retorna la lista de lotes por Estado y por ID Aparador, 
/* Esta funcion utiliza left join porque cuando su estado del lote es aparado, aun no tiene 
registro en la tabla watch produccion aparado ni tampoco un seriado restante */
export const getLotesByEstado = async(req,res) =>{
    try {
        const {estadoLotes}=req.params
        //Hay que tener cuidado en los inner join por el tema de los ids
        const [rows]= await pool.query(`SELECT 
                                        lotes.metraje,lotes.idaparador, 
                                        lotes.fecha_creacion as fechaCorte, 
                                        lotes.color as color_lona,
                                        lotes.fecha_creacion,
                                        lotes.garibaldi,lotes.contrafuerte,
                                        seriados.talla1 as talla1Seriado,
                                        seriados.talla2 as talla2Seriado,
                                        seriados.talla3 as talla3Seriado,
                                        seriados.talla4 as talla4Seriado,
                                        seriados.talla5 as talla5Seriado,

                                        aparadores.sobrenombre as nombreAparador,
                                        
                                        seriado_restante.talla1 as talla1SeriadoRes,
                                        seriado_restante.talla2 as talla2SeriadoRes,
                                        seriado_restante.talla21 as talla21SeriadoRes,
                                        seriado_restante.talla3 as talla3SeriadoRes,
                                        seriado_restante.talla31 as talla31SeriadoRes,
                                        seriado_restante.talla4 as talla4SeriadoRes,
                                        seriado_restante.talla41 as talla41SeriadoRes,
                                        seriado_restante.talla5 as talla5SeriadoRes,
                                        seriado_restante.talla51 as talla51SeriadoRes,

                                        lotes.idlote,
                                        lotes.serie as serieLote,
                                        lotes.detalle_insumos_aparado,
                                        watch_produccion_aparado.fecha_creacion as fechaEntregaAparado,
                                        watch_produccion_aparado.fecha_conteo,
                                        watch_produccion_aparado.total_pares_segun_aparador,
                                        watch_produccion_aparado.total_pares_segun_contador,
                                        watch_produccion_aparado.descripcion_contador,
                                        seriado_restante.descripcion_aparador,
                                        lotes.descripcion as descripcion_cortador, 
                                        lotes.estado as estado_lote,
                                        CONCAT(modelos.nombre_modelo,' ',modelos.serie_modelo,' ',modelos.pasador_mocasin,
                                        ' ',modelos.tipo_modelo, ' ',color_modelos.color_modelo) 
                                        AS infomodelo, CONCAT(seriados.talla1+seriados.talla2+seriados.talla3+seriados.talla4+seriados.talla5)
                                        AS total_pares_seriado_inicial
                                        FROM lotes
                                        INNER JOIN modelos ON lotes.idmodelo = modelos.idmodelo
                                        INNER JOIN color_modelos ON modelos.idcolormodelo = color_modelos.idcolormodelo
                                        INNER JOIN aparadores ON lotes.idaparador = aparadores.idaparador
                                        INNER JOIN seriados ON lotes.idseriado = seriados.idseriado
                                        LEFT JOIN seriado_restante ON lotes.idseriadorestante = seriado_restante.idseriadorestante
                                        LEFT JOIN watch_produccion_aparado ON lotes.idlote = watch_produccion_aparado.idlote
                                        WHERE lotes.estado = '${estadoLotes.toString()}' 
                                    `);

        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message:error
        })
        
    }
};

//Recordemos que los lotes cortados, aun no se les ha asignado un modelo, por eso se crea esta ruta
export const getLotesByEstadoWithoutModels = async(req,res) =>{
    try {
        const {estadoLotes}=req.params
        //Hay que tener cuidado en los inner join por el tema de los ids
        const [rows]= await pool.query(`SELECT lotes.metraje,lotes.idaparador, lotes.fecha_creacion as fechaCorte,
                                        lotes.color as color_lona,lotes.fecha_creacion,lotes.garibaldi,lotes.contrafuerte,
                                        seriados.talla1,lotes.idlote,lotes.serie as serieLote,
                                        lotes.descripcion as descripcion_cortador, lotes.estado as estado_lote,
                                        CONCAT(seriados.talla1+seriados.talla2+seriados.talla3+seriados.talla4+seriados.talla5)
                                        AS total_pares_seriado_inicial
                                        FROM lotes
                                        INNER JOIN seriados ON lotes.idseriado = seriados.idseriado
                                        WHERE lotes.estado = '${estadoLotes.toString()}' 
                                    `);

        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal'
        })
        
    }
};
/*  Esta funcion la utilizo en editarLotePage
    - Puedo editar cualquier lote, excepto los resueltos o anulados
    - Editamos el seriado de corte solo si el lote esta en estado cortado
    - 
*/ 
export const updateSpecificInfoLoteById = async (req, res) => {
    try {
        const idLote=req.params.id;
        const {metraje, color, descripcion, detalle_insumos_aparado,
              garibaldi,contrafuerte,talla1,talla2,talla3,talla4,talla5}=req.body;
        
        const [rows]= await pool.query(`UPDATE lotes
                                        SET 
                                        metraje=${metraje}, 
                                        color=${color},
                                        detalle_insumos_aparado= ifnull('${detalle_insumos_aparado.toString()}','.'), 
                                        descripcion='${descripcion.toString()}',
                                        garibaldi='${garibaldi}',
                                        contrafuerte='${contrafuerte}',
                                        talla1=${talla1},
                                        talla2=${talla2},
                                        talla3=${talla3},
                                        talla4=${talla4},
                                        talla5=${talla5}
                                        WHERE lotes.idlote=${idLote} ` );
        res.json(rows);
        
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal al Actualizar el lote'
        })
    }
};
//Este update lo es utilizado en DetailPageLote.js en el front cuando un lote se envia al aparador
export const updateLoteById = async (req, res) => {
    try {
        const idLote=req.params.id;
        const {idaparador,idmodelo,detalle_insumos_aparado,estado}=req.body;
        
        const [rows]= await pool.query(`UPDATE lotes
                                        SET idaparador=${idaparador}, idmodelo=${idmodelo}
                                        , detalle_insumos_aparado='${detalle_insumos_aparado.toString()}'
                                        , estado='${estado.toString()}'
                                        WHERE lotes.idlote=${idLote} ` );
        res.json(rows);
        
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal en updatelotebyid'
        })
    }
};
export const getLoteById = async (req, res) => {
    try {
        const idlote=req.params.id;
//        INNER JOIN modelos ON lotes.idmodelo = modelos.idmodelo                                        

        const [rows]= await pool.query(`SELECT * FROM lotes
                                        INNER JOIN seriados ON lotes.idseriado = seriados.idseriado
                                        WHERE lotes.idlote=${idlote} ` );
        res.json(rows);        
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal'
        })
        
    }
};

/***  Esta funcion retorna los lotes que tienen que contar 
 1.- El aparador debio entregar el lote(Estado Resuelto)
 2.- La información del estado contado o no contado se extrae de la tabla Watch Aparado 
*/

export const getLotesPorContar = async (req, res) => {
    try {
        const watch_produccion_aparado_estado = 'Por Contar';
//        INNER JOIN modelos ON lotes.idmodelo = modelos.idmodelo                                        

        const [rows]= await pool.query(`SELECT 
                                        lotes.idlote,
                                        watch_produccion_aparado.total_pares_segun_aparador as conteoAparador ,
                                        lotes.idseriadorestante,
                                        
                                        seriados.talla1 as talla1Seriado,
                                        seriados.talla2 as talla2Seriado,
                                        seriados.talla3 as talla3Seriado,
                                        seriados.talla4 as talla4Seriado,
                                        seriados.talla5 as talla5Seriado,

                                        lotes.serie as serieLote,
                                        CONCAT(modelos.nombre_modelo,' ',modelos.serie_modelo,' ',modelos.pasador_mocasin,
                                        ' ',modelos.tipo_modelo,' ',color_modelos.color_modelo) AS infomodelo
                                        FROM lotes
                                        INNER JOIN seriados ON lotes.idseriado = seriados.idseriado
                                        INNER JOIN modelos ON lotes.idmodelo = modelos.idmodelo
                                        INNER JOIN color_modelos ON modelos.idcolormodelo = color_modelos.idcolormodelo
                                        INNER JOIN watch_produccion_aparado ON lotes.idlote = watch_produccion_aparado.idlote
                                        WHERE watch_produccion_aparado.estado = '${watch_produccion_aparado_estado}'` );
        res.json(rows);        
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal'
        })
        
    }
};

/***  Esta funcion retorna los lotes que Walter tiene que separar
 
 1.- El aparador debio entregar el lote(Estado Resuelto)
 2.- En la tabla watch_produccion_aparado, el estado debe estar en contado(Para saber si ya lo contaron)

*/

export const getLotesPorSeparar = async (req, res) => {
    try {
        const watch_produccion_aparado_estado = 'Contado';
        const seriado_restante_estado         = 'Por Separar';
//        INNER JOIN modelos ON lotes.idmodelo = modelos.idmodelo                                        

        const [rows]= await pool.query(`SELECT lotes.idlote,
                    watch_produccion_aparado.total_pares_segun_aparador,
                    watch_produccion_aparado.total_pares_segun_contador,

                    seriado_restante.talla1 as talla1SeriadoRes,
                    seriado_restante.talla2 as talla2SeriadoRes,
                    seriado_restante.talla3 as talla3SeriadoRes,
                    seriado_restante.talla4 as talla4SeriadoRes,
                    seriado_restante.talla5 as talla5SeriadoRes,

                    lotes.idseriadorestante,seriados.talla1,lotes.serie as serieLote,
                    CONCAT(modelos.nombre_modelo,' ',modelos.serie_modelo,' ',modelos.pasador_mocasin,
                    ' ',modelos.tipo_modelo,' ',color_modelos.color_modelo) AS infomodelo
                    FROM lotes
                    INNER JOIN seriados ON lotes.idseriado = seriados.idseriado
                    INNER JOIN modelos ON lotes.idmodelo = modelos.idmodelo
                    INNER JOIN color_modelos ON modelos.idcolormodelo = color_modelos.idcolormodelo
                    INNER JOIN watch_produccion_aparado ON lotes.idlote = watch_produccion_aparado.idlote
                    INNER JOIN seriado_restante ON lotes.idseriadorestante = seriado_restante.idseriadorestante
                    WHERE watch_produccion_aparado.estado = '${watch_produccion_aparado_estado}'
                    AND seriado_restante.estado_seriado = '${seriado_restante_estado}'` );
        res.json(rows);        
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal'
        })
        
    }
};

