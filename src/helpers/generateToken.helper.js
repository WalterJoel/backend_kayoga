import jwt from 'jsonwebtoken';

export const tokenSign = async (user) => {
    return jwt.sign(
        {
            _id:user.idusuario,
            role:user.rol
        },
        //LLave maestra para encriptar y saber quien genera los token como la E en RSA
        process.env.JWT_SECRET,
        {
            expiresIn: '1',
        }
    );
}

//Desencripta con mi clave secreta
export const verifyToken = async (token) => {
    try {
        return jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return null;
    }

}