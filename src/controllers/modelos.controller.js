import {pool} from '../db.js'

export const getAllModelos = async (req, res) => {
    try {
        const [rows]= await pool.query(`SELECT * FROM modelos`);
        res.json(rows);

    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal en la consulta get all modelos and colors'
        })
        
    }
};

export const getAllModelosBySerieAndColor= async (req, res) => {
    try {
        let serie = (req.params.serie);
        serie = serie.toString();
        //Concateno los valores de tipo modelo, color, etc para mi busqueda en el front
        const [rows]= await pool.query(`SELECT idmodelo, CONCAT(nombre_modelo,' ', serie_modelo,' ',tipo_modelo,' ',color_modelo) AS valor_concatenado
                                        FROM modelos
                                        INNER JOIN color_modelos ON modelos.idcolormodelo = color_modelos.idcolormodelo
                                        INNER JOIN insertos ON modelos.idinserto = insertos.idinserto
                                        WHERE serie_modelo = '${serie}' `);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal'
        })
    }
};

