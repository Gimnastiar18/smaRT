import React from 'react'
import SidebarAdmin from "../component/SidebarAdmin";
import "../styles/ardi.css";
import { Link } from 'react-router-dom';

const BerandaAdmin = () => {
    return (
        <div className="dashboard">
            <SidebarAdmin />

            <div className="dashboard--content">
                <h2>Beranda</h2>
                <div className='b-admin d-flex flex-column justify-content-center align-items-center'>
                    <div className='bg-b-admin rounded-4 p-4 mt-4'>
                        <h1 className='fw-bold'>Selamat Datang, Admin</h1>
                    </div>
                    <div className='bg-b-admin rounded-4 p-4 mt-3 d-flex justify-content-between align-items-center'>
                        <img src="/icon-surat-masuk.png" alt="" />
                        <h1 className='fw-bold'>Surat Masuk</h1>
                        <Link className='align-self-end' to='/admin/surat-masuk'>
                        <button className='btn-s'>Lihat Detail</button>
                        </Link>
                    </div>
                    <div className='bg-b-admin rounded-4 p-4 mt-3 d-flex justify-content-between align-items-center'>
                        <img className='ms-4' src="/icon-arsip-surat.png" alt="" />
                        <h1 className='fw-bold'>Arsip Surat</h1>
                        <Link className='align-self-end' to='/admin/arsip-surat/'>
                        <button className='btn-s'>Lihat Detail</button>
                        </Link>                    </div>
                </div>
            </div>
        </div>
    )
}

export default BerandaAdmin