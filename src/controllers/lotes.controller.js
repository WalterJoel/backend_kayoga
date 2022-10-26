import {pool} from '../db.js'

export const getLotesCortado = async (req, res) => {
    try {
        const [rows]= await pool.query(`SELECT * FROM lotes WHERE lotes.estado = 'Cortado'`);
        res.json(rows);


        //res.send('Post Success');  
        
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal'
        })
        
    }
};

export const updateLoteById = async (req, res) => {
    try {
        console.log(req.params.id);
        const idlote=req.params.id;
        
        
        // const [rows]= await pool.query(`UPDATE lotes
        //                                 SET serie = 'Alfred Schmidt', City= 'Frankfurt'
        //                                 WHERE CustomerID = 1;
        //                                 WHERE lotes.idlote=${idlote} ` );
        res.json(rows);
        
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal'
        })
    }
};
export const getLoteById = async (req, res) => {
    try {
        console.log(req.params.id);
        const idlote=req.params.id;
//        INNER JOIN modelos ON lotes.idmodelo = modelos.idmodelo                                        

        const [rows]= await pool.query(`SELECT * FROM lotes
                                        INNER JOIN seriados ON lotes.idseriado = seriados.idseriado
                                        WHERE lotes.idlote=${idlote} ` );
        res.json(rows);        
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal'
        })
        
    }
};