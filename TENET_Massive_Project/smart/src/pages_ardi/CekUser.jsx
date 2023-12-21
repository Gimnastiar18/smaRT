import React, { useState, useEffect } from 'react'
import SidebarAdmin from "../component/SidebarAdmin";
import "../styles/ardi.css";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

const CekUser = () => {
    const { id } = useParams();
    // State untuk menyimpan data dari API
    const [data, setData] = useState([]);

    // Gunakan useEffect untuk melakukan permintaan HTTP saat komponen dimuat
    useEffect(() => {
        // Lakukan permintaan HTTP menggunakan Axios
        axios.get(`http://localhost:3000/user/${id}`)
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
                <h2>Kelola Profil</h2>
                {data.map(item => (
                    <div className="d-flex justify-content-around mt-4" key={item.id_user}>
                        <div className="ktp-user ">
                            <h5 className='mb-0'>KTP</h5>
                            {item.ktp === null ? (
                                <p className='ktpUser'>KTP Belum di upload</p>
                            ) : (
                                <img className='ktpUser border border-dark rounded p-2' src={`http://localhost:3000/uploads/${item.ktp}`} alt="" />
                            )}
                        </div>
                        <div className="kk-user">
                            <h5 className='mb-0'>KK</h5>
                            {item.kk === null ? (
                                <p className='ktpUser'>KK Belum di upload</p>
                            ) : (
                                <img className='ktpUser border border-dark rounded p-2' src={`http://localhost:3000/uploads/${item.kk}`} alt=""  />
                            )}
                        </div>
                    </div>
                ))}
                <Link to={'/admin/surat-masuk'}>
                    <button className='btn-s mt-5'>Kembali</button>
                </Link>
            </div>
        </div>
    )
}

export default CekUser