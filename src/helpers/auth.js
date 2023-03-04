/* Creando un middleware, es decir las rutas primero pasan este filtro */
export const isUserAuthenticated = (req,res,next) => {
    if (req)  {
        console.log('s')
        return next();
    }
    /* else {
        //req.send('error no autenticado')
        req.flash('error', 'No Autorizado');
        return res.status(500).json({
            message:'No has iniciado sesion'
        })
    }*/

}
