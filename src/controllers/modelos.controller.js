import {pool} from '../db.js'

export const getAllModelos = async (req, res) => {
    try {
        const [rows]= await pool.query(`SELECT * FROM modelos
                                        INNER JOIN color_modelos ON modelos.idcolormodelo = color_modelos.idcolormodelo
                                        INNER JOIN insertos ON modelos.idinserto = insertos.idinserto`);
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
        const [rows]= await pool.query(`SELECT idmodelo, CONCAT(nombre_modelo,' ', serie_modelo,' ',tipo_modelo,' ',pasador_mocasin,' ',color_modelo) AS valor_concatenado
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

/* Esta funcion retorna el stock de zapatillas
1.- Busca dado el parametro serie y el modelo.
2.- En su consulta devuelve:
    2.1 : idmodelo, idzapatilla, talla1 hasta talla51, valor concatenado(datos modelo)
    en el front ya se procesa
3.- El idzapatilla es usado luego para actualizar el stock
Probando funcion ss    
*/ 

export const getZapatillasBySerie=async(req,res)=>{
    try {
        let serie  = (req.params.serie);
        let modelo = (req.params.modelo);
        serie  = serie.toString();
        modelo = modelo.toString(); 
        //Concateno los valores de tsssipo modelo, color, etc para mi busqueda en el front
        const [rows]= await pool.query(`SELECT modelos.idmodelo, zapatillas.idzapatilla, zapatillas.talla1,zapatillas.talla2,zapatillas.talla21,zapatillas.talla3,
                                        zapatillas.talla31,zapatillas.talla4,zapatillas.talla41,zapatillas.talla5,zapatillas.talla51,
                                        CONCAT(nombre_modelo,' ', serie_modelo,' ',tipo_modelo,' ',pasador_mocasin,' ',color_modelo) 
                                        AS valor_concatenado 
                                        FROM modelos
                                        INNER JOIN color_modelos ON modelos.idcolormodelo = color_modelos.idcolormodelo
                                        INNER JOIN zapatillas ON modelos.idmodelo = zapatillas.idmodelo
                                        WHERE modelos.serie_modelo ='${serie}' 
                                        AND   modelos.nombre_modelo= '${modelo}' `);
        res.json(rows);

    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal'
        })
    }
}

/* Esta funcion actualiza el stock de zapatillas haciendo un map por todo el array de JSON */
export const updateAllZapatillas = (req, res) => {
    try {
        const allZapatillas = req.body;
        console.log('body',req.body);
        let rows = [];
        allZapatillas.map(async(row,i)=>{
            rows= await pool.query(`UPDATE zapatillas
                                    SET talla1=${row.talla1},talla2=${row.talla2},
                                    talla21=${row.talla21},talla3=${row.talla3},talla31=${row.talla31},
                                    talla4=${row.talla4},talla41=${row.talla41},talla5=${row.talla5},talla51=${row.talla51}
                                    WHERE zapatillas.idzapatilla =${row.idzapatilla}`);
        })
        /*const [rows]= await pool.query(`SELECT serie_inserto,CONCAT(modelo_inserto,' ',serie_inserto,' ',color_inserto) AS  info_inserto,
                                        talla1,talla2,talla3,talla4,talla5,idinserto
                                        FROM insertos 
                                        WHERE insertos.serie_inserto ='${serieInserto}'`);*/
        res.json(rows);
        
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal'
        })
        
    }
};
