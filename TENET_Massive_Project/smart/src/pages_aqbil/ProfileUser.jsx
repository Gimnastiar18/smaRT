import React, {useState, useEffect} from "react";
import "../styles/ProfileUser.css";
import { useNavigate } from "react-router-dom";
import SidebarUser from "../component/SidebarUser";
import FotoNamaUser from "../component/FotoNamaUser";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const ProfileUser = () => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('accessToken');
  const tokenDecoded = jwtDecode(token);
  const idPengguna = tokenDecoded.id;
  
  // State untuk menyimpan data dari API
  const [data, setData] = useState([]);

  // Gunakan useEffect untuk melakukan permintaan HTTP saat komponen dimuat
  useEffect(() => {
    // Lakukan permintaan HTTP menggunakan Axios
    axios.get(`http://localhost:3000/user/${idPengguna}`)
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
      <SidebarUser />

      <div className="dashboard--content">
        <h2>Pengaturan Profil</h2>
        <div className="cover">
          <div className="bg--profil">
            <FotoNamaUser />

            <div className="form">
              <div className="user--data">
              {data.map(item => (
                  <div className="user--data2" key={item.id_user}>
                    <label htmlFor="">Nama</label>
                    <div className="data--cover">{item.nama}</div>
                    <label htmlFor="">Email</label>
                    <div className="data--cover">{item.email}</div>
                    <label htmlFor="">Jenis Kelamin</label>
                    <div className="data--cover">{item.jenis_kelamin || 'Belum Di Atur'}</div>
                    <label htmlFor="">File KTP</label>
                    <div className="data--cover">{item.ktp || 'Belum Di Atur'}</div>
                    <label htmlFor="">File KK</label>
                    <div className="data--cover">{item.kk || 'Belum Di Atur'}</div>
                  </div>
                ))}

                <div>
                  <button className="btn-s mt-4" onClick={() => navigate("/edit-user/")}>Ubah Profil</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
