import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarAdmin from "../component/SidebarAdmin";
import { useNavigate } from "react-router-dom";
import "../styles/SuratMasuk.css";
import { Link } from "react-router-dom";

const SuratMasuk = () => {
  const navigate = useNavigate()

  // State untuk menyimpan data dari API
  const [data, setData] = useState([]);

  // Gunakan useEffect untuk melakukan permintaan HTTP saat komponen dimuat
  useEffect(() => {
    // Lakukan permintaan HTTP menggunakan Axios
    axios.get('http://localhost:3000/surat-masuk')
      .then(response => {
        // Set data ke dalam state
        setData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []) // Dependensi kosong agar useEffect hanya dijalankan sekali

  const handleBuat = async (id_surat_masuk) => {
    try {
      await axios.put(`http://localhost:3000/surat-dibuat/${id_surat_masuk}`);
      navigate(`/admin/kelola-surat/${id_surat_masuk}`)
    } catch (error) {
      console.error('Error handling selesai:', error.message);
    }
  }
  const handleTolak = async (id_surat_masuk) => {
    try {
      await axios.put(`http://localhost:3000/surat-ditolak/${id_surat_masuk}`);
      navigate('/admin/arsip-surat')
    } catch (error) {
      console.error('Error handling selesai:', error.message);
    }
  }
  return (
    <div className="dashboard">
      <SidebarAdmin />

      <div className="dashboard--content">
        <h2>Surat Masuk</h2>

        <div className="cover--surat">
          <div className="list--surat">
            {data.length === 0 ? (
              <p>Belum ada permohonan surat</p>
            ) : (
              data.map(item => (
                <div className="list--masuk" key={item.id_surat_masuk}>
                  <div className="masuk--detail">
                    <ul>
                      <li>
                        <p>
                          {item.jenis_surat} - <Link className="text-decoration-none" to={`/admin/cek-user/${item.id_user}`}>{item.nama}</Link>
                        </p>
                      </li>
                    </ul>
                    <div>
                      <button className="btn-y" onClick={() => handleTolak(item.id_surat_masuk)}>
                        Tolak
                      </button>
                      <button className="btn-s ms-3" onClick={() => handleBuat(item.id_surat_masuk)}>
                        Buat
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuratMasuk;
