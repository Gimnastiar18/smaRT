import React, { useRef, useEffect, useState } from "react";
import SidebarUser from "../component/SidebarUser";
import userImage from "../assets/image.jpg";
import { MdEdit } from "react-icons/md";
import "../styles/ardi.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfilUser = () => {
  const navigate = useNavigate();

  const token = sessionStorage.getItem('accessToken');
  const tokenDecoded = jwtDecode(token);
  const idPengguna = tokenDecoded.id;

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
  }, [])

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const idPenggunaInt = parseInt(idPengguna);
    const nama = event.target.elements.nama.value;
    const email = event.target.elements.email.value;
    const jenisKelamin = event.target.elements.jenis_kelamin.value;
    const fotoProfil = fileInputRef.current.files[0];
    const ktp = event.target.elements.ktp.files[0];
    const kk = event.target.elements.kk.files[0];


    const formData = {
      id_admin: idPenggunaInt,
      nama: nama,
      email: email,
      jenis_kelamin: jenisKelamin,
      foto_profil: fotoProfil,
      ktp: ktp,
      kk: kk,
    }

    try {
      await axios.put(`http://localhost:3000/user/${idPenggunaInt}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate('/profile-user')
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="dashboard">
      <SidebarUser />

      <div className="dashboard--content">
        <h2>Pengaturan Profil</h2>
        <div className="cover">
          <div className="bg--profil">
            <div className="form">
              {data.map(item => (
                <div className="user--data" key={item.id_user}>
                  <form
                    className="user--data2"
                    id="editUser"
                    name="editUser"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                  >
                    <div className="user--detail">
                      <div className="img-user" style={{ cursor: 'pointer' }} onClick={handleImageClick}>
                        <img src={`http://localhost:3000/uploads/${item.foto_profil}`} alt="" />
                        <MdEdit className="edit-icon" />
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          accept="image/*"
                        />
                      </div>
                      <h4 className="username">{item.nama}</h4>
                    </div>
                    <div className="d-flex flex-column">
                      <label htmlFor="nama" className="fw-bold">
                        Nama
                      </label>
                      <input
                        className="form-control border border-dark"
                        type="text"
                        name="nama"
                        id="nama"
                        defaultValue={item.nama}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <label htmlFor="email" className="fw-bold">
                        Alamat Email
                      </label>
                      <input
                        className="form-control border border-dark"
                        type="email"
                        name="email"
                        id="email"
                        defaultValue={item.email}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <label htmlFor="jenis_kelamin" className="fw-bold">
                        Jenis Kelamin
                      </label>
                      <select
                        className="form-select border border-dark"
                        name="jenis_kelamin"
                        id="jenis_kelamin"
                      >
                        <option value="Laki-Laki">Laki-Laki</option>
                        <option value="Perempuan" >Perempuan</option>
                      </select>
                    </div>
                    <div className="d-flex flex-column">
                      <label htmlFor="ktp" className="fw-bold">
                        File KTP
                      </label>
                      <input
                        className="form-control border border-dark"
                        type="file"
                        name="ktp"
                        id="ktp"
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <label htmlFor="kk" className="fw-bold">
                        File KK
                      </label>
                      <input
                        className="form-control border border-dark"
                        type="file"
                        name="kk"
                        id="kk"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <input className="btn-s" type="submit" value="Simpan" />
                    </div>
                  </form>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilUser;
