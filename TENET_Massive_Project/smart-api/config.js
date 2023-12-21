const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const connection = mysql.createPool(db)

if (connection) {
    console.log('Koneksi berhasil')
} else {
    console.log('koneksi gagal')
}

module.exports = connection
