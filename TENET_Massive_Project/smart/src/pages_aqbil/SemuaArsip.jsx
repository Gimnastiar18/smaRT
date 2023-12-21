import React, { useState, useEffect } from "react";
import SidebarAdmin from "../component/SidebarAdmin";
import { useNavigate } from "react-router-dom";
import "../styles/SemuaArsip.css";
import axios from "axios";
import moment from 'moment/moment';
import 'moment/locale/id'
import LazyLoad from 'react-lazy-load';


export const SemuaArsip = () => {
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
  }, [])
  return (
    <div className="dashboard">
      <SidebarAdmin />

      <div className="dashboard--content">
        <h2>Arsip Surat</h2>

        <div className="cover--semuaArsip">
          <div className="list--semuaArsip">
            {data.map(item => (
            <LazyLoad key={item.id_surat_masuk} height={40} offsetVertical={500}>
              <div className="list--semua" >
                <div className="semuaArsip--detail">
                  <ul>
                    <li>
                      <p>
                        <b>{item.jenis_surat}</b> - {item.nama}
                      </p>
                    </li>
                  </ul>

                  <div className="button--arsip">
                    <p className="fw-bold">{item.nama_status}</p>
                  </div>
                </div>
              </div>
              </LazyLoad>
            ))}
        </div>
      </div>
    </div>
    </div >
  );
};
