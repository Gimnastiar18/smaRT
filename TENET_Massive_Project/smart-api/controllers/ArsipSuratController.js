const ArsipSuratModel = require('../models/ArsipSuratModel')

class ArsipSuratController {
    async getAllArsip(req, res) {
        try {
            const arsip = await ArsipSuratModel.getAllArsip();
            res.status(200).json(arsip)
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getArsipById(req, res) {
        try {
            const idSuratMasuk = req.params.id;
            const arsip = await ArsipSuratModel.getArsipById(idSuratMasuk);
            if (!arsip) {
                res.status(404).json({ message: 'Id Surat Tidak Ditemukan!' });
            } else {
                res.status(200).json(arsip);
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getArsipByIdUser(req, res) {
        try {
            const idUser = req.params.id;
            const arsip = await ArsipSuratModel.getArsipByIdUser(idUser);
            if (!arsip) {
                res.status(404).json({ message: 'Id Surat Tidak Ditemukan!' });
            } else {
                res.status(200).json(arsip);
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async addSuratMasuk(req, res) {
        try {
            const dtSuratMasuk = req.body;
            await ArsipSuratModel.addSuratMasuk(dtSuratMasuk);
            res.status(201).json({ message: 'Permohonan Surat Telah dikirim' })
        } catch (error) {
            console.error('Error tambah data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getSuratMasuk(req, res) {
        try {
            const suratMasuk = await ArsipSuratModel.getSuratMasuk();
            res.status(200).json(suratMasuk)
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateNoSurat(req, res) {
        try {
            const idSuratMasuk = req.params.id;

            //ambil kode jenis surat
            let jenisSurat = await ArsipSuratModel.getJnsSuratById(idSuratMasuk);
            if (jenisSurat) {
                let noNew;
                //ambil angka no surat
                let noSuratLama = await ArsipSuratModel.getNoSurat();
                if (noSuratLama) {
                    let nomor = noSuratLama['COUNT(no_surat)'];
                    noNew = nomor + 1;
                } else {
                    noNew = 1;
                }
                const kodeSurat = jenisSurat.singkatan;
                //bulan dalam romawi
                let bulanSurat = new Date().getMonth() + 1;
                function convertToRoman(num) {
                    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
                    return romanNumerals[num - 1];
                }
                const bulanRomawi = convertToRoman(bulanSurat);

                //tahun
                const tahun = new Date().getFullYear();

                //no surat
                const noSurat = `${noNew}/${kodeSurat}/${bulanRomawi}/${tahun}`;
                await ArsipSuratModel.updateNoSurat(idSuratMasuk, noSurat)
                res.status(201).json({ message: `Surat id ${idSuratMasuk}, No Suratnya: ${noSurat}` })
            } else {
                res.status(404).json({ error: 'id Surat tidak ditemukan' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateSuratDitolak(req, res) {
        try {
            const idSuratMasuk = req.params.id;
            const idAdmin = 1; //hanya contoh nanti id admin diambil dari session/login
            await ArsipSuratModel.updateSuratDitolak(idSuratMasuk, idAdmin)
            res.status(200).json({ message: `Surat dengan id ${idSuratMasuk} berhasil ditolak` })
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateSuratSelesai(req, res) {
        try {
            const idAdmin = req.body;
            const idSuratMasuk = req.params.id;
            await ArsipSuratModel.updateSuratSelesai(idSuratMasuk, idAdmin)
            res.status(200).json({ message: `Surat dengan id ${idSuratMasuk} selesai dibuat` })
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new ArsipSuratController()