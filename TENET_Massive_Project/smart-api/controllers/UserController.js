const UserModel = require('../models/UserModel')
const fs = require('fs');
const path = require('path');

const bcrypt = require('bcrypt')
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'hdsjh=73974OIS^hSKHSDHgIU10';

function generateToken(id, email, userType) {
    const payload = { id, email, userType };
    const options = {
        expiresIn: '1d',
    };

    return jwt.sign(payload, secretKey, options);
}

class UserController {
    async addUser(req, res) {
        try {
            let dtUser = req.body;
            const nama = dtUser.nama;
            const email = dtUser.email;
            let pass = dtUser.kata_sandi;
            const passConfirm = dtUser.konfirmasi_sandi;

            const cekUser = await UserModel.getUserByEmail(email);
            const cekAdmin = await UserModel.getAdminByEmail(email);

            if (cekUser || cekAdmin) {
                res.status(409).json({ message: 'Email telah digunakan, Silakan Login!' })
            }

            else {
                const hashPass = bcrypt.hashSync(pass, saltRounds);
                await UserModel.addUser(nama, email, hashPass);
                res.status(201).json({ message: 'Berhasil Register, Silakan Login!' })
            }
        } catch (error) {
            console.error('Error tambah data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // AUTH USER / ADMIN
    async login(req, res) {
        try {
            const dtUser = req.body;
            const email = dtUser.email;
            let pass = dtUser.kata_sandi;

            const cekUser = await UserModel.getUserByEmail(email);
            const cekAdmin = await UserModel.getAdminByEmail(email);

            if (cekUser) {
                const cekSandi = bcrypt.compareSync(pass, cekUser[0].kata_sandi);
                if (!cekSandi) {
                    res.status(400).json({ message: 'Kata Sandi Salah' })
                } else {
                    const accessToken = generateToken(cekUser[0].id_user, cekUser[0].email, 'User');

                    res.status(200).json({ role: 'user', message: 'User Berhasil Login', accessToken })
                }
            } else if (cekAdmin) {
                const cekSandi = bcrypt.compareSync(pass, cekAdmin[0].kata_sandi);
                if (!cekSandi) {
                    res.status(400).json({ message: 'Kata Sandi Salah' })
                } else {
                    const accessToken = generateToken(cekAdmin[0].id_admin, cekAdmin[0].email, 'Admin');

                    res.status(200).json({ role: 'admin', message: 'Admin Berhasil Login', accessToken })
                }
            } else {
                res.status(404).json({ message: 'Email tidak ditemukan, Silakan Daftar!' })
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async lupaSandi(req, res) {
        try {
            const { email, keamanan } = req.body;

            const cekUser = await UserModel.getUserByEmail(email);
            const cekAdmin = await UserModel.getAdminByEmail(email);

            if (cekUser) {
                const cekKeamanan = cekUser[0].keamanan === keamanan;
                if (cekKeamanan) {
                    res.status(200).json({ message: 'Bisa Ubah Kata Sandi', email })
                } else {
                    res.status(401).json({ message: 'Kesalahan, tidak bisa mengubah kata sandi' });
                }
            } else if (cekAdmin) {
                const cekKeamanan = cekAdmin[0].keamanan === keamanan;
                if (cekKeamanan) {
                    res.status(200).json({ message: 'Bisa Ubah Kata Sandi', email })
                } else {
                    res.status(401).json({ message: 'Kesalahan, tidak bisa mengubah kata sandi' });
                }
            } else {
                res.status(404).json({ message: 'Email tidak ditemukan, Silakan Daftar!' })
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async ubahSandi(req, res) {
        try {
            const {email, kata_sandi, konfirmasi_sandi} = req.body;

            const cekUser = await UserModel.getUserByEmail(email);
            const cekAdmin = await UserModel.getAdminByEmail(email);

            if (cekUser) {
                const cekSandi = kata_sandi === konfirmasi_sandi;
                if (cekSandi) {
                    const hashPass = bcrypt.hashSync(kata_sandi, saltRounds);
                    await UserModel.updateSandiUser(hashPass, email)
                    res.status(201).json({ message: 'Berhasil Register, Silakan Login!' })
                } 
            } else if (cekAdmin) {
                const cekSandi = kata_sandi === konfirmasi_sandi;
                if (cekSandi) {
                    const hashPass = bcrypt.hashSync(kata_sandi, saltRounds);
                    await UserModel.updateSandiAdmin(hashPass, email)
                    res.status(201).json({ message: 'Berhasil Register, Silakan Login!' })
                } 
            } else {
                res.status(404).json({ message: 'Email tidak ditemukan, Silakan Daftar!' })
            }
        } catch (error) {
            
        }
    }

    // USER
    async getUserById(req, res) {
        try {
            const idUser = req.params.id;
            const user = await UserModel.getUserById(idUser);
            if (!user) {
                res.status(404).json({ message: 'Id user Tidak Ditemukan!' });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updatedUserData = req.body;
            const { nama, email, jenis_kelamin, tanggal_lahir } = updatedUserData;
            const ktpFiles = req.files['ktp'];
            const kkFiles = req.files['kk'];
            const fotoProfilFiles = req.files['foto_profil'];

            // Mengambil data sebelum diupdate
            const userDataBeforeUpdate = await UserModel.getUserById(userId);

            // Menghapus foto sebelumnya jika ada
            const fotoProfilBeforeUpdate = userDataBeforeUpdate[0]?.foto_profil;
            const fotoProfilPath = path.join(__dirname, '../uploads', fotoProfilBeforeUpdate);
            const fotoDefault = path.join(__dirname, '../uploads', 'Default_Profile.png');
            const cekDefault = fotoProfilPath === fotoDefault;
            const foto_profil = fotoProfilFiles?.[0]?.filename;
            if (fotoProfilBeforeUpdate && fotoProfilPath && fs.existsSync(fotoProfilPath) && !cekDefault && foto_profil) {
                fs.unlinkSync(fotoProfilPath); // Menghapus file
            }

            // Menghapus foto sebelumnya jika ada
            const ktpBeforeUpdate = userDataBeforeUpdate[0]?.ktp;
            const ktpProfilPath = path.join(__dirname, '../uploads', ktpBeforeUpdate);
            const ktp = ktpFiles?.[0]?.filename;
            if (ktpBeforeUpdate && ktpProfilPath && fs.existsSync(ktpProfilPath) && ktp) {
                fs.unlinkSync(ktpProfilPath); // Menghapus file
            }

            // Menghapus foto sebelumnya jika ada
            const kkBeforeUpdate = userDataBeforeUpdate[0]?.kk;
            const kkProfilPath = path.join(__dirname, '../uploads', kkBeforeUpdate);
            const kk = kkFiles?.[0]?.filename;
            if (kkBeforeUpdate && kkProfilPath && fs.existsSync(kkProfilPath) && kk) {
                fs.unlinkSync(kkProfilPath); // Menghapus file
            }

            await UserModel.updateUser(userId, nama, email, ktp ? ktp : ktpBeforeUpdate,
                kk ? kk : kkBeforeUpdate, foto_profil ? foto_profil : fotoProfilBeforeUpdate, jenis_kelamin, tanggal_lahir);

            res.status(200).json({ message: 'Data user berhasil di update' });
        } catch (error) {
            console.error('Error updating user data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // ADMIN
    async getAdminById(req, res) {
        try {
            const idAdmin = req.params.id;
            const admin = await UserModel.getAdminById(idAdmin);
            if (!admin) {
                res.status(404).json({ message: 'Id user Tidak Ditemukan!' });
            } else {
                res.status(200).json(admin);
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateAdmin(req, res) {
        try {
            const adminId = req.params.id;
            const updatedAdminData = req.body;
            const { nama, email, jenis_kelamin } = updatedAdminData;
            const fotoProfilFiles = req.files['foto_profil'];

            // Mengambil data admin sebelum diupdate
            const adminDataBeforeUpdate = await UserModel.getAdminById(adminId);

            // Menghapus foto profil sebelumnya jika ada
            const fotoProfilBeforeUpdate = adminDataBeforeUpdate[0]?.foto_profil;
            const fotoProfilPath = path.join(__dirname, '../uploads', fotoProfilBeforeUpdate);
            const fotoDefault = path.join(__dirname, '../uploads', 'Default_Profile.png');
            const cekDefault = fotoProfilPath === fotoDefault;
            const foto_profil = fotoProfilFiles?.[0]?.filename;

            if (fotoProfilBeforeUpdate && fotoProfilPath && fs.existsSync(fotoProfilPath) && !cekDefault && foto_profil) {
                fs.unlinkSync(fotoProfilPath); // Menghapus file
            }

            await UserModel.updateAdmin(adminId, nama, email, foto_profil ? foto_profil : fotoProfilBeforeUpdate, jenis_kelamin);

            res.status(200).json({ message: 'Data admin berhasil di update' });
        } catch (error) {
            console.error('Error updating admin data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new UserController()