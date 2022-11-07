//import mysql from 'mysql2/promise';
import {createPool} from 'mysql2/promise';

import {DB_DATABASE,
        DB_HOST,
        DB_USER,
        DB_PASSWORD,
        DB_PORT} from './config.js'
//Equivalente a createConnection function
export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
});

  /*
pool.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });*/