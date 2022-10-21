import { request, Router } from "express";
import  {pool} from '../db.js'

const router = Router();

router.get('/bd', async(req, res) => { 
    const result = await pool.query("SELECT * FROM usuarios")
    res.json(result);
    //res.send('hoolll')
        //if (err) throw err;
        //res.send(result);
}); 

export default router; 