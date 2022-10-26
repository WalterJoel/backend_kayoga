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
        console.log(req.body);
        //Primero inserto en la tabla seriados
        const [seriado]= await pool.query('INSERT INTO seriados(talla1,talla2,talla3,talla4,talla5) VALUES (?, ?, ?, ?, ?)',[talla1,talla2,talla3,talla4,talla5])
        const id_seriado_insertado=seriado.insertId;
        console.log('seriado', id_seriado_insertado);
        //Segundo inserto en la tabla seriados_restantes, los demas campos que no se especifican son 0 por default
        try {
            //const result = await res.json(seriado);          


            const [seriado_restante]= await pool.query('INSERT INTO seriado_restante(talla1,talla2,talla3,talla4,talla5) VALUES (?, ?, ?, ?, ?)',[talla1,talla2,talla3,talla4,talla5])
            //res.send('Se inserto en la tabla seriado restante');    
            //Ahora inserto en la tabla lote
            const id_seriadorestante_insertado = seriado_restante.insertId;
            console.log('id_seriadorestante',id_seriadorestante_insertado);
            try {
                const [lote_insertado]= await pool.query(`INSERT INTO 
                                                            lotes(metraje,color,descripcion,garibaldi,
                                                            contrafuerte,etiquetas,estado,idseriado,
                                                            idseriadorestante,serie) 
                                                            VALUES (?, ?, ?, ?,?, ?, ?, ?,?,?)`,
                                                            [metraje,color,descripcion,garibaldi,contrafuerte,etiquetas,estado,id_seriado_insertado,id_seriadorestante_insertado,serie])
                //*********** Muy importante que en POST el servidor responda para poder redireccionar u otra accion */
                const result = await res.json(lote_insertado);          
            
            } catch (error) {
                return res.status(500).json({
                    message:'Algo anda mal al insertar en la tabla lote'})    
            }
        } catch (error) {
            return res.status(500).json({
                message:'Algo anda mal al insertar en la tabla seriado restante'})
        }
        
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal en la tabla seriado'
        })
        
    }
}