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

/* Esta funcion 
*/ 

export const get = async (req, res) => {
       
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

/* Funcion que recibe 3 parametros
    1.- molde (vans, star, giana)
    2.- seria(nino, adulto, dama)
    3.- Una talla en especifica

    - Funcion que devuelve el seriado restante e los distintos modelos del molde seleccionado y la 
    talla seleccionada.
    - Funcion que se emplea en la VISTA ORDEN_INYECCION_PAGE

   4.- Finalmente en la query me aseguro que el lote:
        - Haya sido CONTADO
        - Haya sido Separado
        - Y obviamente RESUELTO que es cuando el aparador entrega o devuelve
*/

/* OJO ESTA FUNCION SE COMUNICA CON TRANSFER LIST DEL FRONT Y NO SE DEBE MODIFICAR
LA POSICION EN QUE LA QUERY RETORNA LA TALLA, ES DECIR EL PRIMER ITEM */
export const getSeriadoRestanteByTalla = async(req,res) =>{
    try {
        const {molde, serie, talla}=req.params;
        console.log(molde,' ', serie, ' ',talla)
        const [seriado_restante_by_talla] = await pool.query(`SELECT  
            seriado_restante.${talla},
            seriado_restante.${talla} AS cantidad, 
            lotes.idlote,
            insertos.idinserto,
            insertos.color_inserto,
            modelos.idmodelo,
            seriado_restante.idseriadorestante,
            CONCAT(modelos.nombre_modelo,' ',modelos.serie_modelo,' ',modelos.pasador_mocasin,
            ' ',modelos.tipo_modelo,' ',color_modelos.color_modelo) AS infomodelo 
            FROM lotes
            INNER JOIN modelos ON lotes.idmodelo = modelos.idmodelo
            INNER JOIN seriado_restante ON lotes.idseriadorestante = seriado_restante.idseriadorestante
            INNER JOIN watch_produccion_aparado ON lotes.idlote = watch_produccion_aparado.idlote
            INNER JOIN insertos ON modelos.idinserto = insertos.idinserto
            INNER JOIN color_modelos ON modelos.idcolormodelo = color_modelos.idcolormodelo
            WHERE lotes.estado = 'Resuelto'
            AND watch_produccion_aparado.estado='Contado'
            AND seriado_restante.estado_seriado = 'Separado'
            AND modelos.nombre_modelo = '${molde}'
            AND modelos.serie_modelo = '${serie}' 
            AND seriado_restante.${talla} > 0 `);

        res.json(seriado_restante_by_talla);
    } catch (error) {
          return res.status(500).json({
            message:'Algo anda mal al insertar en la tabla watch y seriado restante: ',error})    
    }

}

 