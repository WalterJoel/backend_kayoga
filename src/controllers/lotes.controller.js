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
//Funcion que retorna la lista de lotes por Estado y por ID Aparador
export const getLotesByIdAparadorAndEstado = async(req,res) =>{
    try {
        const {idAparador,estadoLotes}=req.params
        console.log('ss',idAparador,estadoLotes);
        //Hay que tener cuidado en los inner join por el tema de los ids
        const [rows]= await pool.query(`SELECT lotes.idaparador, seriados.talla1,lotes.idlote,lotes.serie as serieLote, CONCAT(modelos.nombre_modelo,' ',modelos.serie_modelo,' ',modelos.pasador_mocasin,
                                        ' ',modelos.tipo_modelo) 
                                        AS infomodelo FROM lotes
                                        INNER JOIN aparadores ON lotes.idaparador = aparadores.idaparador
                                        INNER JOIN modelos ON lotes.idmodelo = modelos.idmodelo
                                        INNER JOIN seriados ON lotes.idseriado = seriados.idseriado
                                        WHERE lotes.estado = '${estadoLotes.toString()}' 
                                        AND lotes.idaparador=${idAparador}`);

        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal'
        })
        
    }
};

export const updateLoteById = async (req, res) => {
    try {
        console.log(req.params.id);
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
        console.log(req.params.id);
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