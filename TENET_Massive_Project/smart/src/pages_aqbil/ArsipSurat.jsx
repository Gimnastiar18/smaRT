import React, {useState, useEffect} from "react";
import axios from 'axios';
import SidebarAdmin from "../component/SidebarAdmin";
import { useNavigate } from "react-router-dom";
import "../styles/ArsipSurat.css";

const ArsipSurat = () => {
  const navigate = useNavigate();

  // State untuk menyimpan data dari API
  const [data, setData] = useState([]);

  // Gunakan useEffect untuk melakukan permintaan HTTP saat komponen dimuat
  useEffect(() => {
    // Lakukan permintaan HTTP menggunakan Axios
    axios.get('http://localhost:3000/arsip-surat')
      .then(response => {
        // Set data ke dalam state
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []) // Dependensi kosong agar useEffect hanya dijalankan sekali

  return (
    <div className="dashboard">
      <SidebarAdmin />

      <div className="dashboard--content">
        <h2>Arsip Surat</h2>

        <div className="cover--arsip">
          <div className="list--arsip">
          {data.map(item => (
              <div className="list--detail" key = {item.id_surat_masuk}>
                <div className="arsip--detail">
                  <ul>
                    <li>
                      <p>
                        {item.jenis_surat} - {item.nama}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="button--lihat">
            <button className="btn-s" onClick={() => navigate("/admin/semua-arsip/")}>
              Lihat Semua
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArsipSurat;
