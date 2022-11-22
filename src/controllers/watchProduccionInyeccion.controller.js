import {pool} from '../db.js'

//Obtengo el json que guarde en la tabla watch_produccion_inyeccion
export const getOrdenInyeccion = async(req,res)=>{
        try {
                const [orden_inyeccion]= await pool.query(` 
                                        SELECT * FROM watch_produccion_inyeccion
                                        WHERE estado_orden = 'ABIERTA' `);
                res.json(orden_inyeccion) 
                
        } catch (error) {
                return res.status(500).json({
                        message:'Algo anda mal al insertar en la tabla watch y seriado restante', error})    
        }
}

/* Esta funcion:
1.-  Guarda en formato JSON toda la informacion de la orden generada 
*/
export const saveOrdenInyeccion = async (req, res) => {
        try {
            //orden_inyeccion_json es todo el json devuelto por eso no uso { }
            const orden_inyeccion_json =req.body;
             // itero por las cantidades para obtener el total de pares
             console.log('ssss ',orden_inyeccion_json);
             let pares_orden = 0;
             orden_inyeccion_json.map((pares)=>{
                pares_orden += pares['cantidad'];
             })

            let fecha_creacion = new Date();
            fecha_creacion=fecha_creacion.toLocaleString('PET',{timeZone:'America/Lima'});
            console.log(fecha_creacion);
            const [produccion_inyeccion]= await pool.query(` 
                        INSERT INTO watch_produccion_inyeccion
                        (orden_inyeccion,fecha_creacion,pares_orden)
                        VALUES (?, ?, ?)`,
                        [JSON.stringify(orden_inyeccion_json),fecha_creacion,pares_orden]);
            res.json(produccion_inyeccion)            
        } catch (error) {
              return res.status(500).json({
                message:'Algo anda mal al insertar en la tabla watch y seriado restante', error})    
        }
};
