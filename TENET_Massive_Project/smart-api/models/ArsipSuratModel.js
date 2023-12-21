const connection = require('../config')

class ArsipSuratModel {
  getAllArsip() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM table_arsip_surat JOIN table_surat USING(id_surat) JOIN table_status USING(id_status) ORDER BY updated_time DESC', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  getArsipById(idSuratMasuk) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM table_arsip_surat JOIN table_surat USING(id_surat) WHERE id_surat_masuk = ?', [idSuratMasuk], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length > 0 ? results : null);
        }
      });
    });
  }

  getArsipByIdUser(idUser) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM table_arsip_surat JOIN table_surat USING(id_surat) JOIN table_status USING(id_status) WHERE id_user = ? ORDER BY waktu_diajukan DESC', [idUser], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length > 0 ? results : null);
        }
      });
    });
  }

  addSuratMasuk(dtSuratMasuk) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO table_arsip_surat SET ?', dtSuratMasuk, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  getSuratMasuk() {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM table_arsip_surat JOIN table_surat USING(id_surat) WHERE id_status = "1" ORDER BY waktu_diajukan ASC`, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  getNoSurat() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(no_surat) FROM table_arsip_surat WHERE no_surat IS NOT NULL', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0])
        }
      })
    })
  }

  getJnsSuratById(idSuratMasuk) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT singkatan FROM table_arsip_surat JOIN table_surat USING(id_surat) WHERE id_surat_masuk = ?', [idSuratMasuk], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  updateNoSurat(idSuratMasuk, noSurat) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE table_arsip_surat SET no_surat= ? WHERE id_surat_masuk = ?', [noSurat, idSuratMasuk], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    })
  }

  updateSuratDitolak(idSuratMasuk, idAdmin) {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE table_arsip_surat SET id_status = '2', updated_time = CURRENT_TIMESTAMP, updated_by = ? WHERE id_surat_masuk = ?`, [idAdmin, idSuratMasuk], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    })
  }

  updateSuratSelesai(idSuratMasuk, idAdmin) {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE table_arsip_surat SET id_status = '3', updated_time = CURRENT_TIMESTAMP, updated_by = ? WHERE id_surat_masuk = ?`, [idAdmin, idSuratMasuk], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    })
  }
}

module.exports = new ArsipSuratModel()