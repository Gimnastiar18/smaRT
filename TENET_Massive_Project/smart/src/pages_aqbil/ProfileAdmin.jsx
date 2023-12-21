import React, { useState, useEffect } from "react";
import "../styles/ProfileAdmin.css";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../component/SidebarAdmin";
import FotoNamaAdmin from "../component/FotoNamaAdmin";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';


const ProfileAdmin = () => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('accessToken');
  const tokenDecoded = jwtDecode(token);
  const idPengguna = tokenDecoded.id;

  // State untuk menyimpan data dari API
  const [data, setData] = useState([]);

  // Gunakan useEffect untuk melakukan permintaan HTTP saat komponen dimuat
  useEffect(() => {
    // Lakukan permintaan HTTP menggunakan Axios
    axios.get(`http://localhost:3000/admin/${idPengguna}`)
      .then(response => {
        // Set data ke dalam state
        setData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [])

  return (
    <div className="dashboard">
      <SidebarAdmin />

      <div className="dashboard--content">
        <h2>Pengaturan Profil</h2>

        <div className="cover_profil">
          <div className="bg--profil">
            <FotoNamaAdmin />

            <div className="form">
              <div className="admin--data">
                {data.map(item => (
                  <div className="admin--data2" key={item.id_admin}>
                    <label htmlFor="">Nama</label>
                    <div className="data--cover">{item.nama}</div>
                    <label htmlFor="">Email</label>
                    <div className="data--cover">{item.email}</div>
                    <label htmlFor="">Jenis Kelamin</label>
                    <div className="data--cover">{item.jenis_kelamin}</div>
                  </div>
                ))}

                <div>
                  <button className="btn-s mt-4" onClick={() => navigate("/admin/edit-admin")}>
                    Ubah Profil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmin;
