import { request } from 'express';
import {pool} from '../db.js'

export const getInsertosBySerie = async (req, res) => {
    try {
        const {serieInserto} = req.params;
        const [rows]= await pool.query(`SELECT CONCAT(modelo_inserto,' ',serie_inserto,' ',color_inserto) AS  info_inserto,
                                        talla1,talla2,talla3,talla4,talla5,idinserto
                                        FROM insertos 
                                        WHERE insertos.serie_inserto ='${serieInserto}'`);
        res.json(rows);
        
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal'
        })
        
    }
};
/*Funcion para actualizar todos los Insertos*/ 
export const updateAllInsertos = (req, res) => {
    try {
        const allInsertos = req.body;
        //console.log(allInsertos)
        let rows = [];
        allInsertos.map(async(row,i)=>{
            const {talla1,talla2,talla3,talla4,talla5,idinserto} = row;
            console.log(row.idinserto)
            rows= await pool.query(`UPDATE insertos
                                            SET talla1=${row.talla1},talla2=${row.talla2},talla3=${row.talla3},
                                            talla4=${row.talla4},talla5=${row.talla5}
                                        WHERE insertos.IDinserto =${row.idinserto}`);
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
