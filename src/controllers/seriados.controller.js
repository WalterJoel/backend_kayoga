import {pool} from '../db.js'

export const Seriados = async(req, res) => {
    try {
        const [rows]= await pool.query(`SELECT * FROM lotes WHERE lotes.estado = 'Cortado'`);
        res.json(rows);
        //return rows;
        res.send('Post Success');  
        
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal'
        })
        
    }

};

//Gabito tiene que mejorar este codigo Dios usando async await sin try catch
export const createSeriados = async (req,res)=>{
    try {
        const {talla1,talla2,talla3,talla4,talla5,metraje,color,descripcion,garibaldi,contrafuerte,etiquetas,estado,serie} = req.body;
        let fecha_creacion = new Date();
        fecha_creacion=fecha_creacion.toLocaleString('PET',{timeZone:'America/Lima'});
        console.log('FECHA',fecha_creacion);
        //Primero inserto en la tabla seriados
        const [seriado]= await pool.query('INSERT INTO seriados(talla1,talla2,talla3,talla4,talla5) VALUES (?, ?, ?, ?, ?)',[talla1,talla2,talla3,talla4,talla5])
        const id_seriado_insertado=seriado.insertId;
        console.log('seriado', id_seriado_insertado);
        //Ahora inserto en la tabla lote
        try {
            const [lote_insertado]= await pool.query(`INSERT INTO 
                                                        lotes(metraje,color,fecha_creacion,descripcion,garibaldi,
                                                        contrafuerte,etiquetas,estado,idseriado,
                                                        serie) 
                                                        VALUES (?, ?, ?, ?,?, ?, ?, ?,?,?)`,
                                                        [metraje,color,fecha_creacion,descripcion,garibaldi,contrafuerte,etiquetas,estado,id_seriado_insertado,serie])
            //*********** Muy importante que en POST el servidor responda para poder redireccionar u otra accion */
            const result = await res.json(lote_insertado);          
        } catch (error) {
            return res.status(500).json({
                message:'Algo anda mal al insertar en la tabla lote'})    
        }
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal en la tabla seriado'
        })
    }
}