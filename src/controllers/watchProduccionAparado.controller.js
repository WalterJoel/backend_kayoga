import {pool} from '../db.js'

/* Esta funcion:
1.- Actualiza la tabla watch aparado y la pone en estado Contado
2.- Actualiza la tabla watch aparado y le agrega la fecha de conteo
3.- Actualiza la tabla watch aparado y le agrega la cantidad de pares contados por el Contador.
4.- Actualiza la tabla seriado_Restante con el nuevo conteo listo para ser distribuido */


export const updateWatchAparado = async (req, res) => {
       
        try {
            let {talla1}=req.body;
            const {talla2,talla3,talla4,talla5,
                estado_tabla_watch_aparado,idseriadorestante,idlote,descripcion_contador}=req.body;
            console.log('inicio',req.body)
            if(talla1===''){
                talla1=0
            }
            let fecha_conteo = new Date();
            fecha_conteo=fecha_conteo.toLocaleString('PET',{timeZone:'America/Lima'});
            const total_pares_segun_contador = (parseInt(talla1)+parseInt(talla2)+parseInt(talla3)+parseInt(talla4)+parseInt(talla5));

            const [tabla_seriado_restante]= await pool.query(`UPDATE
                       seriado_restante SET  talla1=${talla1}, talla2=${talla2},talla3=${talla3},talla4=${talla4},talla5=${talla5}
                        WHERE seriado_restante.idseriadorestante=${idseriadorestante}`);
            try {   
                console.log('entro al ultimo ')
                const [rows]= await pool.query(`UPDATE watch_produccion_aparado
                                        SET estado='${estado_tabla_watch_aparado.toString()}',
                                            fecha_conteo='${fecha_conteo.toString()}',
                                            descripcion_contador='${descripcion_contador.toString()}',
                                            total_pares_segun_contador=${total_pares_segun_contador}
                                        WHERE watch_produccion_aparado.idlote=${idlote}` );
                //Envio la respuesta                                        
                res.json(rows);
                console.log('rows',rows)
            } catch (error) {
                return res.status(500).json({
                    message:'Algo anda mal al actualizar en la tabla watch y seriado restante'})    
            }
        } catch (error) {
              return res.status(500).json({
                message:'Algo anda mal al insertar en la tabla watch y seriado restante'})    
        }
};