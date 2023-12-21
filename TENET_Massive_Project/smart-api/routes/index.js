const express = require('express');
const router = express.Router();
// const SuratController = require('../controllers/SuratController');
const UserController = require('../controllers/UserController');
const ArsipSuratController = require('../controllers/ArsipSuratController');
const verifyToken = require('../middleware/VerifyToken')

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:'uploads/',
    filename:(req, file, cb) => {
        return cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const upload = multer({
    storage: storage
})

router.post('/register', UserController.addUser) //user buat akun
router.post('/login', UserController.login) // user/admin login
router.post('/buat-surat' , ArsipSuratController.addSuratMasuk) //user buat surat
router.get('/surat-masuk', ArsipSuratController.getSuratMasuk) //tampil surat masuk di admin
router.put('/surat-dibuat/:id', ArsipSuratController.updateNoSurat) //saat admin tekan buat (maka no surat dibuat otomatis)
router.put('/surat-selesai/:id', ArsipSuratController.updateSuratSelesai) //saat admin tekan selesai
router.put('/surat-ditolak/:id', ArsipSuratController.updateSuratDitolak) //saat admin tekan tolak
router.get('/arsip-surat', ArsipSuratController.getAllArsip) //menampilkan semua arsip di admin
router.get('/arsip-surat/:id', ArsipSuratController.getArsipByIdUser) //menampilkan arsip per user
router.get('/arsip-surat/surat/:id', ArsipSuratController.getArsipById) //menampilkan arsip per id atau saat user tekan salah satu arsip surat
router.get('/user/:id', UserController.getUserById) //admin cek users
router.put('/user/:id', upload.fields([{ name: 'kk', maxCount: 1 }, { name: 'ktp', maxCount: 1 }, { name: 'foto_profil', maxCount: 1 }]), UserController.updateUser)
router.get('/admin/:id', UserController.getAdminById)
router.put('/admin/:id', upload.fields([{ name: 'foto_profil', maxCount: 1 }]), UserController.updateAdmin);
router.post('/lupa-sandi', UserController.lupaSandi) 
router.put('/ubah-sandi', UserController.ubahSandi) 

module.exports = router