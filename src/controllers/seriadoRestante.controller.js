import { request } from 'express';
import {pool} from '../db.js'


/* Funcion que:
1.- Inserta en la tabla seriado restante (Seriado del Aparador)
2.- Inserta en la tabla watch aparado
3.- Actualiza la tabla Lote, colocando el id del Seriado Restante
4.- Actualiza la tabla Lote, colocando el estado del Lote a Resuelto(Entregado)
5.- EN el if talla>0 valido que el lote entregado sea star o varon, mediante el campo talla 1, esto
   con el fin de no mostrar en la tabla separar lote
*/
export const createSeriadoRestante = async (req, res) => {
    try {
        const {talla1,talla2,talla3,talla4,talla5,estado_tabla_lote,
               estado_tabla_watch_aparado,descripcion_aparador,idlote}=req.body;
        console.log(req.body)
        let fecha_creacion = new Date();
        fecha_creacion=fecha_creacion.toLocaleString('PET',{timeZone:'America/Lima'});
        const total_pares_segun_aparador = (parseInt(talla1)+parseInt(talla2)+parseInt(talla3)+parseInt(talla4)+parseInt(talla5));
        const [rows]= await pool.query(`INSERT INTO 
                       watch_produccion_aparado(idlote,fecha_creacion,estado,total_pares_segun_aparador) 
                        VALUES (?, ?, ?, ?)`,
                        [idlote,fecha_creacion,estado_tabla_watch_aparado,total_pares_segun_aparador]);
        try {
            let estado_seriado = 'Por Separar';
            
            if(talla1>0){
                estado_seriado='Separado'
            }
            const [tabla_seriado_restante]= await pool.query(`INSERT INTO 
                       seriado_restante(talla1,talla2,talla3,talla4,talla5,descripcion_aparador,estado_seriado) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)`,
                        [talla1,talla2,talla3,talla4,talla5,descripcion_aparador,estado_seriado]);
            const id_seriado_restante_insertado = tabla_seriado_restante.insertId;
            console.log('seriado restante insertado',id_seriado_restante_insertado);        
            try {   
                console.log('entro al ultimo ')
                const [rows]= await pool.query(`UPDATE lotes
                                        SET idseriadorestante=${id_seriado_restante_insertado},
                                            lotes.estado='${estado_tabla_lote.toString()}'
                                            WHERE lotes.idlote=${idlote}` );
                //Envio la respuesta                                        
                res.json(rows);
                console.log('rows',rows)
            } catch (error) {
                return res.status(500).json({
                    message:'Algo anda mal al insertar en la tabla watch y seriado restante'})    
            }
        } catch (error) {
              return res.status(500).json({
                message:'Algo anda mal al insertar en la tabla watch y seriado restante'})    
        }
        
   }catch (error) {
        return res.status(500).json({
            message:'Algo anda mal al insertar en la tabla watch aparado'
        })
        
    }
};



export const updateSeriadoRestanteAlSeparar = async (req, res) => {
       
    try {
        const {talla2,talla21,talla3,talla31,talla4,talla41,talla5,talla51,
                idseriadorestante}=req.body;
        const estado_seriado = 'Separado';
        const [tabla_seriado_restante]= await pool.query(`UPDATE
                   seriado_restante SET  talla2=${talla2}, talla21=${talla21},talla3=${talla3},
                                         talla31=${talla31}, talla4=${talla4},talla41=${talla41},
                                         talla5=${talla5},talla51=${talla51}, estado_seriado='${estado_seriado}'
                    WHERE seriado_restante.idseriadorestante=${idseriadorestante}`);
        res.json(tabla_seriado_restante);
    } catch (error) {
          return res.status(500).json({
            message:'Algo anda mal al insertar en la tabla watch y seriado restante'})    
    }
};