import React, { useState, useEffect } from 'react';
import { BiHome, BiExit, BiCog, BiEnvelope, BiArchive } from 'react-icons/bi'
import "../styles/sidebarAdmin.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FotoNamaAdmin from './FotoNamaAdmin'

const sidebar = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        // Hapus token dari sessionStorage
        navigate('/login')
        sessionStorage.removeItem('accessToken');
        window.location.reload();
    }
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState(location.pathname);


    useEffect(() => {
        setActiveMenu(location.pathname);
    }, [location.pathname]);

    return (
        <div className='menu--admin'>
            <div className="logo">
                <img src="../../public/logo.png" alt="" />
            </div>

            <div className="foto--admin">
                <FotoNamaAdmin />
            </div>

            <div className="menu--listAdmin">
                <Link to="/admin" className={`item ${activeMenu === "/admin" ? "active" : ""}`}>
                    <BiHome className='icon' />
                    Beranda
                </Link>
                <Link to="/admin/surat-masuk/" className={`item ${activeMenu === "/admin/surat-masuk/" ? "active" : ""}`}>
                    <BiEnvelope className='icon' />
                    Surat Masuk
                </Link>
                <Link to="/admin/arsip-surat/" className={`item ${activeMenu === "/admin/arsip-surat/" ? "active" : ""}`}>
                    <BiArchive className='icon' />
                    Arsip Surat
                </Link>
                <Link to="/admin/profil/" className={`item ${activeMenu === "/admin/profil/" ? "active" : ""}`}>
                    <BiCog className='icon' />
                    Pengaturan
                </Link>
                <p></p>
                <Link className="item" onClick={handleLogout}>
                    <BiExit className='icon' />
                    Keluar
                </Link>
            </div>
        </div>
    )
}

export default sidebar