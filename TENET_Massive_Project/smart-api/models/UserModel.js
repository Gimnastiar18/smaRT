const connection = require('../config')

class UserModel {
    getUserById(idUser) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT nama, email, jenis_kelamin, tanggal_lahir, ktp, kk, foto_profil FROM table_user WHERE id_user = ?', [idUser], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.length > 0 ? results : null);
                }
            });
        });
    }

    addUser(nama, email, hashPass, keamanan) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO table_user(nama, email, kata_sandi, keamanan) VALUES(?, ?, ?, ?) ', [nama, email, hashPass, keamanan], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT id_user, email, kata_sandi, keamanan FROM table_user WHERE email = ?', [email], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.length > 0 ? results : null);
                }
            });
        })
    }

    updateUser(idUser, nama, email, ktp, kk, foto_profil, jenis_kelamin, tanggal_lahir) {
        return new Promise((resolve, reject) => {
            connection.query(
                'UPDATE table_user SET nama = ?, email = ?, ktp = ?, kk = ?, foto_profil = ?, jenis_kelamin = ?, tanggal_lahir = ? WHERE id_user = ?',
                [nama, email, ktp, kk, foto_profil, jenis_kelamin, tanggal_lahir, idUser],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }

    updateSandiUser(hashPass, email) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE table_user SET kata_sandi = ? WHERE email = ?', [hashPass, email], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    getAdminByEmail(email) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT id_admin, email, kata_sandi, keamanan FROM table_admin WHERE email = ?', [email], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.length > 0 ? results : null);
                }
            });
        })
    }

    getAdminById(idAdmin) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT nama, email, foto_profil, jenis_kelamin FROM table_admin WHERE id_admin = ?', [idAdmin], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.length > 0 ? results : null);
                }
            });
        });
    }

    updateAdmin(idAdmin, nama, email, foto_profil, jenis_kelamin) {
        return new Promise((resolve, reject) => {
            connection.query(
                'UPDATE table_admin SET nama = ?, email = ?, foto_profil = ?, jenis_kelamin = ? WHERE id_admin = ?',
                [nama, email, foto_profil, jenis_kelamin, idAdmin],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }

    updateSandiAdmin(hashPass, email ) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE table_admin SET kata_sandi = ? WHERE email = ?', [hashPass, email], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = new UserModel()
