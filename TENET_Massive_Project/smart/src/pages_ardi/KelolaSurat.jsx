import React from 'react'
import SidebarAdmin from '../component/SidebarAdmin';
import { PDFViewer } from '@react-pdf/renderer';
import SuratPengantar from './SuratPengantar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import "../styles/ardi.css";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const KelolaSurat = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = sessionStorage.getItem('accessToken');
  const tokenDecoded = jwtDecode(token);
  const idPengguna = tokenDecoded.id;
  const idPenggunaInt = parseInt(idPengguna);
  
  const formData = {
    updated_by: idPenggunaInt,
  };
  const handleSelesai = async () => {
    try {
      await axios.put(`http://localhost:3000/surat-selesai/${id}`, formData);
      navigate('/admin/arsip-surat')
    } catch (error) {
      console.error('Error handling selesai:', error.message);
    }
  };

  return (
    <div >
      <SidebarAdmin />
      <div className="dashboard--content">
        <h2>Kelola Surat</h2>
        <PDFViewer style={{ width: '98%', height: '75vh' }} className='shadow mt-3'>
          <SuratPengantar id={id} />
        </PDFViewer>
        <div className='d-flex justify-content-between me-4'>
          <div></div>
          <button className='btn-s mt-3' onClick={handleSelesai}>Selesai</button>
        </div>
      </div>
    </div>
  )
}

export default KelolaSurat