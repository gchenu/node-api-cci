'use strict';

const mysql = require('mysql2');

// MYSQL CONFIG
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
};

const pool = mysql.createPool(dbConfig);

/* connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  }); */
  
module.exports = pool;