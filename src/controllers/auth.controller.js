import {pool} from '../db.js'
import jwt from 'jsonwebtoken';


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

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    //Valido usuario y contrasenia
    const [user]= await pool.query(`SELECT * FROM usuarios WHERE usuarios.email = '${email.toString()}' 
                                    AND usuarios.contrasena = '${password.toString()}' `);

    if (user.length === 0) {
        return res.status(401).send('El usuario no existe');
    }
    const token        = jwt.sign({_id: user.idusuario}, 'secretkey',{expiresIn:'100'});
    const onlyDataUser = user[0]; 
    return res.status(200).json({token,onlyDataUser});
};
