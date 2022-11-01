import {pool} from '../db.js'


/*Esta funcion aun no se utiliza, esta en mantenimiento */ 
export const updateSeriadoRestanteById = async (req, res) => {
    /* Este Primer try intenta actualizar la tabla seriado_restante, lo que significa
     que el aparador ha devuelto cierta cantidad de cortes */ 
    try {
        console.log(req.params.id);
        const idSeriadoRestante=req.params.id;
        const {talla1,talla2,talla3,talla4,talla5}=req.body;
        const [rows]= await pool.query(`UPDATE seriado_restante
                                        SET talla1= ${talla1},
                                            talla2= ${talla2},
                                            talla3= ${talla3},
                                            talla4= ${talla4},
                                            talla5= ${talla5}
                                        WHERE seriado_restante.idseriadorestante=${idSeriadoRestante} `);
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal en la consulta get all modelos and colors'
        })
        
    }
};
