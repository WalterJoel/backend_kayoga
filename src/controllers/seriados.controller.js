import {pool} from '../db.js'

export const getSeriados = async(req, res) => {
    try {
        const [rows]= await pool.query('SELECT * FROM seriados')
        res.json(rows);
        //res.send('Post Success');    
        
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal'
        })
        
    }

};

export const createSeriados = async (req,res)=>{
    try {
        const {talla1,talla2,talla3,talla4} = req.body;
        const [rows]= await pool.query('INSERT INTO seriados(talla1,talla2,talla3,talla4) VALUES (?, ?, ?, ?)',[talla1,talla2,talla3,talla4])
        
        res.send('Post Success');    
        
    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal'
        })
        
    }
}