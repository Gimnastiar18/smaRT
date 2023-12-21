import React, {useState, useEffect} from "react";
import "../styles/foto_namaUser.css";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const FotoNamaUser = () => {
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
    <>
    {data.map(item => (
    <div className="user--detail" key={item.id_user}>
      <img src={`http://localhost:3000/uploads/${item.foto_profil}`} alt="" />
      <h4 className="username">{item.nama}</h4>
    </div>
    ))}
    </>
  );
};

export default FotoNamaUser;
