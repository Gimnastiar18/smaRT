import React, { useEffect, useState } from 'react'
import SidebarUser from '../component/SidebarUser'
import "../styles/DetailSurat.css";
import { PDFViewer } from '@react-pdf/renderer';
import { BiBlock, BiUpload } from 'react-icons/bi';
import SuratPengantar from '../pages_ardi/SuratPengantar';
import moment from 'moment/moment';
import 'moment/locale/id'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const DetailSurat = () => {
    const { id } = useParams();
    // State untuk menyimpan data dari API
    const [data, setData] = useState([]);
    const [error, setError] = useState([])

    // Gunakan useEffect untuk melakukan permintaan HTTP saat komponen dimuat
    useEffect(() => {
        // Lakukan permintaan HTTP menggunakan Axios
        axios.get(`http://localhost:3000/arsip-surat/surat/${id}`)
            .then(response => {
                // Set data ke dalam state
                setData(response.data);
            })
            .catch(error => {
                // Tangani kesalahan
                if (error.response && error.response.status === 404) {
                    // Tangani status 404 (Not Found)
                    setError('Data tidak ditemukan.');
                } else {
                    // Tangani kesalahan lainnya
                    setError('Terjadi kesalahan dalam memuat data.');
                }
            });
    }, []) // Dependensi kosong agar useEffect hanya dijalankan sekali

    return (
        <div className="dashboard">
            <SidebarUser />
            <div className="dashboard--content">
                {data.map(item => (
                    <div className="pratinjau" key={item.id_surat_masuk}>
                        <h2>Pratinjau</h2>
                        {item.id_status !== 3 ? ( //saat surat blm dibuat
                            <div className="content--detail">
                                <div className="status--surat">
                                    <h5 className='mb-4 text-center'>Status Surat</h5>
                                    <div className="detail-status">
                                        <ul className='list-unstyled'>
                                            {item.id_status !== 2 ? (  //saat status hanya diajukan
                                                <li>Diajukan <BiUpload /> {moment(item.waktu_diajukan).format('LLLL')} WIB</li>
                                            ) : ( // saat status ditolak
                                                <>
                                                    <li className='mb-3'>Diajukan<BiUpload /> {moment(item.waktu_diajukan).format('LLLL')} WIB</li>
                                                    <li>Ditolak<BiBlock /> {moment(item.updated_time).format('LLLL')} WIB</li>
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                <div className="ms-3 pratinjau--surat">
                                    <img src="/surat-kosong.png" alt="" />
                                    <h5><b>Surat Belum Tersedia</b></h5>
                                </div>

                            </div>

                        ) : ( //saat pdf sdh dibuat
                            <PDFViewer style={{ width: '98%', height: '75vh' }} className='shadow mt-3'>
                                <SuratPengantar id={item.id_surat_masuk} />
                            </PDFViewer>
                        )}

                        <div className="btn--detail mt-3">
                            <Link to={'/beranda'}>
                                <button className="btn-s">Kembali</button>

                            </Link>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetailSurat;