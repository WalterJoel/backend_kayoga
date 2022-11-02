import { request } from 'express';
import {pool} from '../db.js'


/* Funcion que:
1.- Inserta en la tabla seriado restante (Seriado del Aparador)
2.- Inserta en la tabla watch aparado
3.- Actualiza la tabla Lote, colocando el id del Seriado Restante
4.- Actualiza la tabla Lote, colocando el estado del Lote a Resuelto(Entregado)
*/
export const createSeriadoRestante = async (req, res) => {
    try {
        const {talla1,talla2,talla3,talla4,talla5,estado_tabla_lote,
               estado_tabla_watch_aparado,descripcion_aparador,idlote}=req.body;
        let fecha_creacion = new Date();
        fecha_creacion=fecha_creacion.toLocaleString('PET',{timeZone:'America/Lima'});
        const total_pares_segun_aparador = (parseInt(talla1)+parseInt(talla2)+parseInt(talla3)+parseInt(talla4)+parseInt(talla5));
        const [rows]= await pool.query(`INSERT INTO 
                       watch_produccion_aparado(idlote,fecha_creacion,estado,total_pares_segun_aparador) 
                        VALUES (?, ?, ?, ?)`,
                        [idlote,fecha_creacion,estado_tabla_watch_aparado,total_pares_segun_aparador]);
        try {
            const [tabla_seriado_restante]= await pool.query(`INSERT INTO 
                       seriado_restante(talla1,talla2,talla3,talla4,talla5,descripcion_aparador) 
                        VALUES (?, ?, ?, ?, ?, ?)`,
                        [talla1,talla2,talla3,talla4,talla5,descripcion_aparador]);
            const id_seriado_restante_insertado = tabla_seriado_restante.insertId;
            console.log('seriado restante insertado',id_seriado_restante_insertado);        
            try {   
                const [rows]= await pool.query(`UPDATE lotes
                                        SET idseriadorestante=${id_seriado_restante_insertado},
                                            estado='${estado_tabla_lote.toString()}'
                                        WHERE lotes.idlote=${idLote}` );
                //Envio la respuesta                                        
                const result = res.json({message: "Se inserto exitosamente watch aparado y seriado restante", status: 201});
            } catch (error) {
                
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
