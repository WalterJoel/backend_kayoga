import { request } from 'express';
import {pool} from '../db.js'
import {tokenSign} from '../helpers/generateToken.helper.js'

export const login = async (req, res) => {
    try {
        const {email,contrasena}=req.body;
        console.log('email',email,contrasena)
        const [user]= await pool.query(`SELECT * FROM usuarios WHERE usuarios.email = '${email.toString()}' 
                                        AND usuarios.contrasena = '${contrasena.toString()}' `);
        
        //console.log(user)
        if(user){
            console.log(user)
            res.json({user});
            const tokenSession= await tokenSign(user[0]);
            console.log(tokenSession);
        }
        else{
            res.send({error:'Usuario no encontrado'});            
        }
        
    } catch (error) {
        return res.status(500).json({
        })
        
    }
};

export const logout =(req, res) => {
    try {
        //const token     = req.headers.authorization.split(' ').pop();
        
        console.log(req.headers);

        const authHeader = req.headers.authorization.split(' ').pop();
        //Hago expirar la cookie
        console.log('auth',authHeader);
        jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
            if (logout) {
                res.send({msg : 'Has sido desconectado' });
            } else {
                res.send({msg:'Error'});
            }
        });
    } 
    catch (error) {
        return res.status(500).json({
        })
    }
};