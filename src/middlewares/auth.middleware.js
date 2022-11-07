import {verifyToken}  from '../helpers/generateToken.helper.js';

//Este middleware solamente verifica que el token entrante fue Generado por mi sistema
export const checkAuth = async(req,res,next)=>{
    try {
        /* token = "Bearer  tokenssdsds......" por eso split encuentra un espacio y luego elimina el primer
        elemento con pop */
        console.log(req.headers);
        const token     = req.headers.authorization.split(' ').pop();
        console.log(req.headers)
        const tokenData = await verifyToken(token);
        console.log(tokenData);
        if(tokenData._id){
            //next() : It will run or execute the code after all the middleware function is finished.
            next();
        }
        else{
            res.status(409); 
            res.send({error:'No coincide el token generado'})
        }
    } catch (error) {
        console.log(error);
        res.status(409); 
        res.send({error:'No tienes token, no iniciaste sesion'})
    }
}