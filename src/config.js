import {config} from 'dotenv'
//Funcion propia de dotenv, para poder leer variables de entorno

config();
//process es un objeto global de node, env almacena todas las variables de mi pc    
console.log(process.env.PORT);

// con proces.ev.port le digo que use la variable de entorno del archivo.env o sino ||
export const PORT      = process.env.PORT ||  '3000';
export const DB_PORT      = process.env.DB_PORT ||    '7621';
export const DB_USER      = process.env.DB_USER || 'root';
export const DB_PASSWORD  = process.env.DB_PASSWORD || 'IRhxeHJNJ72J88fjO8bY';
export const DB_HOST      = process.env.DB_HOST || 'containers-us-west-21.railway.app';
export const DB_DATABASE  = process.env.DB_DATABASE || 'railway';

//const 