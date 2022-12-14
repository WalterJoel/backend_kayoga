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

/* Esta funcion: la lleva a cabo el usuario administrador
1.-  Guarda en formato JSON toda la informacion de la orden generada 
*/
export const saveOrdenInyeccion = async (req, res) => {
       
        try {
                //orden_inyeccion_json es todo el json devuelto por eso no uso { }
                const orden_inyeccion_json =req.body;
                // itero por las cantidades para obtener el total de pares
                let pares_orden = 0;
                orden_inyeccion_json.map((pares)=>{
                        pares_orden += parseInt(pares['cantidad']);
                })

                let fecha_creacion = new Date();
                fecha_creacion=fecha_creacion.toLocaleString('PET',{timeZone:'America/Lima'});
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




/* Esta funcion se ejecuta cuando el maquinista guarda su produccion:
1.-  Los maquinistas cierran la orden                
2.- Actualizamos la tabla watch_produccion_inyeccion agregando fecha_cierre_orden y pares_inyectados
*/
async function getAndUpdateCantidades(idwatch){
        const [total_insertos]= await pool.query(` 
                SELECT 
                SUM(talla1+talla2+talla3+talla4+talla5) AS mySUM
                FROM insertos`);
        const [total_zapatillas]= await pool.query(`
                SELECT 
                SUM(talla1+talla2+talla21+talla3+talla31+talla4+talla41+talla5+talla51) AS mySUM
                FROM zapatillas
                `);
        const [total_cortes]= await pool.query(`SELECT 
                SUM(talla1+talla2+talla21+talla3+talla31+talla4+talla41+talla5+talla51) AS mySUM
                FROM seriado_restante
                `);
        if(total_insertos&&total_zapatillas&&total_cortes){
                const [rows]= await pool.query(`UPDATE watch_produccion_inyeccion
                                                SET 
                                                total_insertos_inicio   = ${total_insertos[0].mySUM},
                                                total_zapatillas_inicio = ${total_zapatillas[0].mySUM},
                                                total_cortes_inicio     = ${total_cortes[0].mySUM}
                                                WHERE watch_produccion_inyeccion.idwatch_produccion_inyeccion=${idwatch}` ); 
                return rows;
        }                
}
export const saveOrdenInyeccionMaquinista= async (req, res) => {
        try {
                const orden_inyeccion_json =req.body;
                
                //Total pares que cuenta el maquinista
                let pares_inyectados = 0;
                let idwatch_produccion_inyeccion = 0;
                //let
                orden_inyeccion_json.map(async(pares)=>{
                        pares_inyectados += parseInt(pares['cantidad']);
                        idwatch_produccion_inyeccion = pares.idwatch_produccion_inyeccion;
                })
                //Si agrego los totales
                const agregar_datos_watch = await getAndUpdateCantidades(idwatch_produccion_inyeccion);
                console.log(agregar_datos_watch, ' datos')
                if(agregar_datos_watch){
                        let fecha_cierre_orden = new Date();
                        fecha_cierre_orden=fecha_cierre_orden.toLocaleString('PET',{timeZone:'America/Lima'});
                        //Actualizo la tabla watch_produccion_inyeccion 1 sola vez
                        const [rows]= await pool.query(`UPDATE watch_produccion_inyeccion
                                SET estado_orden='CERRADA', 
                                fecha_cierre_orden='${fecha_cierre_orden}',
                                pares_inyectados = ${pares_inyectados}
                                WHERE watch_produccion_inyeccion.idwatch_produccion_inyeccion=${idwatch_produccion_inyeccion}` );
                        // Actualizo los cortes y los insertos uno por uno
                        orden_inyeccion_json.map(async(pares,i,arr)=>{
                                let idseriadorestante = pares.idseriadorestante;
                                let idinserto         = pares.idinserto;
                                let name_talla        = pares.talla_insert;
                        //Acorto la talla21 a talla2, porque los insertos son tallas fijas 26 28. etc
                                let name_talla_for_inserto = name_talla.substr(0,6);
                                let cantidad          = parseInt(pares.cantidad);
                                let idmodelo          = pares.idmodelo;
                                // Primero intento actualizar los cortes
                                try {
                                        const [cortes]= await pool.query(`UPDATE seriado_restante
                                        SET ${name_talla}= (ifnull(${name_talla},0)-${cantidad}) 
                                        WHERE seriado_restante.idseriadorestante=${idseriadorestante}`);
                                        // Segundo intento actualizar los insertos
                                        try {
                                                const [insertos]= await pool.query(`UPDATE insertos
                                                SET ${name_talla_for_inserto}= (ifnull(${name_talla_for_inserto},0)-${cantidad}) 
                                                WHERE insertos.idinserto=${idinserto}`);
                                                // Tercero, intento actualizar el stock de zapatillas
                                                try {
                                                        const [zapatillas]= await pool.query(`UPDATE zapatillas
                                                        SET ${name_talla}= (ifnull( ${name_talla}, 0 )+ ${cantidad}) 
                                                        WHERE zapatillas.idmodelo=${idmodelo}`);
                                                        if(arr.length-1 === i){
                                                                res.json(zapatillas);
                                                        }
                                                } catch (error) {
                                                        console.log('eroor ',error)
                                                        return res.status(500).json({
                                                        message:'Error al actualizar el stock de zapatillas', error})                    
                                                }
                                        } catch (error) {
                                                console.log('eroor ',error)
                                                return res.status(500).json({
                                                message:'Error al actualizar los insertos', error})                    
                                        }

                                } catch (error) {
                                        console.log('eroor ',error)
                                        return res.status(500).json({
                                        message:'Error al actualizar los cortes', error})    
                                }
                        })
                }

        } 
        catch (error) {
                console.log(error, ' Error al modificar el watch inyeccion')
        return res.status(500).json({
                message:'Algo anda mal al insertar en la tabla watch y seriado restante', error})    
        }
};


/* Funcion que verifica si hay ordenes de inyeccion abiertas */ 
export const verificarOrdenInyeccionAbierta = async (req, res) => {
        try {
            const [produccion_inyeccion]= await pool.query(` SELECT estado_orden FROM 
                                watch_produccion_inyeccion 
                                WHERE estado_orden ='ABIERTA'
                                ORDER BY idwatch_produccion_inyeccion DESC LIMIT 1
                                `);
            res.json(produccion_inyeccion)            
        } catch (error) {
              return res.status(500).json({
                message:'Algo anda mal al traer las ordenes de inyeccion', error})    
        }
};