
//Estrategia para poder autenticar
import {Strategy,ExtractJwt} from 'passport-jwt';


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secretkey'
}

export const JwtStrategy = new Strategy(options,(payload,done)=>{
    return done(null,payload);
});

console.log(JwtStrategy._jwtFromRequest) 



//Colocar el config.js

//Crear folder Strategies  para colocar la estrategia por tokens, jwtStrategy.js

