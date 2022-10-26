import {pool} from '../db.js'

export const getAllAparadores = async (req, res) => {
    try {
        const [rows]= await pool.query(`SELECT * FROM aparadores
                                        INNER JOIN usuarios ON aparadores.idusuario = usuarios.idusuario
                                        INNER JOIN personas ON usuarios.idpersona = personas.idpersona
                                        `);
        res.json(rows);

    } catch (error) {
        return res.status(500).json({
            message:'Algo anda mal al retornar los aparadores'
        })
        
    }
};