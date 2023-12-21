import React, { useState, useEffect } from 'react'
import Surat from '../pages_ardi/Surat'
import Riwayat from './Riwayat';
import SidebarUser from "../component/SidebarUser";
import "../styles/ardi.css";
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import 'moment/locale/id'
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

const BerandaUser = () => {
  const token = sessionStorage.getItem('accessToken');
  const tokenDecoded = jwtDecode(token);
  const idPengguna = tokenDecoded.id;

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3000/arsip-surat/${idPengguna}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="dashboard">
      <SidebarUser />

      <div className="dashboard--content">
        <h2>Beranda</h2>

        <div className="bg-beranda-kng rounded mb-3">
          <h5 className='mt-1 mb-0'>Halo, </h5>
          <h5 className='mt-0'>Mau buat surat apa?</h5>
        </div>

        <div className="bg-jns-srt rounded mb-3">
          <div className="d-flex flex-wrap">
            <Surat title="Surat Keterangan Domisili" idSurat="1" />
            <Surat title="Surat Keterangan Usaha" idSurat="2" />
            <Surat title="SK Tidak Mampu" idSurat="3" />
          </div>
          <div>
            <Link to={'/jenis-surat/'} className='text-decoration-none d-flex justify-content-end'>
              <button className='btn-s my-2'>Buat Surat</button>
            </Link>
          </div>
        </div>

        <div className="bg-jns-srt rounded">
          <div className="d-flex flex-wrap">
            {data.length === 0 ? (
              <p className='h6 mt-3'>Sebelum membuat permohonan surat, Lengkapi data Anda <Link className='text-decoration-none' to={'/edit-user'}>disini</Link></p>
            ) : (data.slice(0, 3).map(item => (
              <div key={item.id_surat_masuk}>
                <Riwayat waktu={moment(item.waktu_diajukan).format('LL')} id={item.id_surat_masuk} />
              </div>
            ))
            )}
          </div>
          <div>
            <Link to={'/riwayat-surat/'} className='text-decoration-none d-flex justify-content-end'>
              <button className='btn-s my-2'>Riwayat Surat</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BerandaUser