import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarUser from "../component/SidebarUser";
import "../styles/ardi.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const BuatSurat = () => {
const navigate = useNavigate();
  const { idSurat } = useParams();
  const token = sessionStorage.getItem('accessToken');
  const tokenDecoded = jwtDecode(token);
  const idPengguna = tokenDecoded.id;

  // State untuk menyimpan judul kartu
  const [title, setTitle] = useState("");

  // Daftar surat
  const jnsSurat = [
    { idSurat: "1", title: "Surat Keterangan Domisili" },
    { idSurat: "2", title: "Surat Keterangan Usaha" },
    { idSurat: "3", title: "Surat Keterangan Tidak Mampu" },
    { idSurat: "4", title: "Surat Pengantar KTP" },
    { idSurat: "5", title: "Surat Pengantar KK" },
    { idSurat: "6", title: "Surat Keterangan Kematian" },
    { idSurat: "7", title: "Surat Pengantar Nikah" },
    { idSurat: "8", title: "Surat Permohonan Cerai" },
    { idSurat: "9", title: "Surat Keterangan Penghasilan Orang Tua" },
    { idSurat: "10", title: "Surat Keterangan Belum Menikah" },
    { idSurat: "11", title: "Surat Keterangan Belum Memiliki Rumah" },
  ];

  // Gunakan useEffect untuk mengambil data judul berdasarkan id
  useEffect(() => {
    const surat = jnsSurat.find((surat) => surat.idSurat === idSurat);
    if (surat) {
      setTitle(surat.title);
    }
  }, [idSurat, jnsSurat]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const idSuratInt = parseInt(idSurat);
    const idPenggunaInt = parseInt(idPengguna);
    const nama = event.target.elements.nama.value;
    const nik = event.target.elements.nik.value;
    const tempatLahir = event.target.elements.tempat_lahir.value;
    const tanggalLahir = event.target.elements.tanggal_lahir.value;
    const jenisKelamin = event.target.elements.jenis_kelamin.value;
    const agama = event.target.elements.agama.value;
    const alamat = event.target.elements.alamat.value;
  
    const formData = {
      id_surat: idSuratInt,
      id_user: idPenggunaInt,
      nama: nama,
      nik: nik,
      tempat_lahir: tempatLahir,
      tanggal_lahir: tanggalLahir,
      jenis_kelamin: jenisKelamin,
      agama: agama,
      alamat: alamat,
    };

    axios.post('http://localhost:3000/buat-surat', formData)
        .then(response => {
          console.log('Success:', response.data);
          navigate('/riwayat-surat');
        })
        .catch(error => {
          console.error('Error:', error);
        });
  };

  return (
    <div className="dashboard">
      <SidebarUser />

      <div className="dashboard--content">
        <h2>Buat Surat</h2>

        <div className="">
          <h4 className="">{title}</h4>
          <p className="mb-4 text-secondary">
            Mohon isi data berikut ini dengan benar.
          </p>
          <form
            className="d-grid gap-3"
            id="buatSurat"
            onSubmit={handleSubmit}
          >
            <input className="d-none" type="text" name="id_surat" defaultValue={idSurat}/>
            <input className="d-none" type="text" name="id_user" defaultValue={idPengguna}/>
            <div className="d-flex justify-content-between">
              <label className="my-auto" htmlFor="nama">
                Nama Lengkap
              </label>
              <input
                className="form-control border border-dark"
                type="text"
                name="nama"
                id="nama"  
              />
            </div>
            <div className="d-flex justify-content-between">
              <label className="my-auto" htmlFor="nik">
                NIK
              </label>
              <input
                className="form-control border border-dark"
                type="text"
                name="nik"
                id="nik" 
              />
            </div>
            <div className="d-flex justify-content-between">
              <label className="my-auto" htmlFor="tempat_lahir">
                Tempat Lahir
              </label>
              <input
                className="form-control border border-dark"
                type="text"
                name="tempat_lahir"
                id="tempat_lahir" 
              />
            </div>
            <div className="d-flex justify-content-between">
              <label className="my-auto" htmlFor="tanggal_lahir">
                Tanggal Lahir
              </label>
              <input
                className="form-control border border-dark"
                type="date"
                name="tanggal_lahir"
                id="tanggal_lahir" 
              />
            </div>
            <div className="d-flex justify-content-between">
              <label className="my-auto" htmlFor="jenis_kelamin">
                Jenis Kelamin
              </label>
              <select
                className="form-select border border-dark"
                name="jenis_kelamin"
                id="jenis_kelamin"  
              >
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div className="d-flex justify-content-between">
              <label className="my-auto" htmlFor="agama">
                Agama
              </label>
              <select
                className="form-select border border-dark"
                name="agama"
                id="agama" 
              >
                <option value="islam">Islam</option>
                <option value="kristen">Kristen</option>
                <option value="hindu">Hindu</option>
                <option value="budha">Budha</option>
                <option value="khonghucu">Khonghucu</option>
              </select>
            </div>
            <div className="d-flex justify-content-between">
              <label className="my-auto" htmlFor="alamat">
                Alamat
              </label>
              <textarea
                className="form-control border border-dark"
                name="alamat"
                id="alamat"
              ></textarea>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <div></div>
              <input className="btn-s" type="submit" value="Kirim" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuatSurat;
