import React, { useState, useEffect } from "react";
import '../styles/Table.css';
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import moment from "moment";
import 'moment/locale/id'

const DynamicTable = () => {
  const token = sessionStorage.getItem('accessToken');
  const tokenDecoded = jwtDecode(token);
  const idPengguna = tokenDecoded.id;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/arsip-surat/${idPengguna}`)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [idPengguna]);

  const ThData = () => (
    <>
      <th>Hari / Tanggal</th>
      <th>Nama</th>
      <th>Jenis Surat</th>
      <th>Status</th>
      <th>Unduh</th>
    </>
  );

  const tdData = () => {
    if (loading) {
      return <tr><td colSpan={5}>Loading...</td></tr>;
    }

    if (data.length === 0) {
      return <tr><td colSpan={5}>Anda belum membuat permohonan surat</td></tr>;
    }

    return data.map((rowData) => (
      <tr key={rowData.id_surat_masuk}>
        <td>{moment(rowData.waktu_diajukan).format('LLL')}</td>
        <td>{rowData.nama}</td>
        <td>
          <Link to={`/detail-surat/${rowData.id_surat_masuk}`} className="text-decoration-none">
            {rowData.jenis_surat}
          </Link>
        </td>
        <td>{rowData.nama_status}</td>
        <td>
            <Link to={`/detail-surat/${rowData.id_surat_masuk}`}>
              <button type="button" className="btn-s" disabled={rowData.id_status !== 3}>
                Unduh
              </button>
            </Link>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <table className="table-custom table-hover table-bordered">
        <thead>
          <tr>
            <ThData className="text-center"/>
          </tr>
        </thead>
        <tbody>{tdData()}</tbody>
      </table>
    </div>
  );
}

export default DynamicTable;
