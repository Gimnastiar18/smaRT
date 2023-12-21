import React, { useState, useEffect } from 'react';
import { BiHome, BiBookAlt, BiExit, BiHistory, BiCog, BiEnvelope } from 'react-icons/bi'
import "../styles/sidebarUser.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FotoNamaUser from './FotoNamaUser'

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
        <div className='menu--user'>
            <div className="logo">
                <img src="../../public/logo.png" alt="" />
            </div>

            <div className="foto--user">
                <FotoNamaUser />
            </div>

            <div className="menu--listUser">
                <Link to="/beranda/" className={`item ${activeMenu === "/beranda/" ? "active" : ""}`}>
                    <BiHome className='icon' />
                    Beranda
                </Link>
                <Link to="/jenis-surat/" className={`item ${activeMenu === "/jenis-surat/" ? "active" : ""}`}>
                    <BiEnvelope className='icon' />
                    Buat Surat
                </Link>
                <Link to="/riwayat-surat/" className={`item ${activeMenu === "/riwayat-surat/" ? "active" : ""}`}>
                    <BiHistory className='icon' />
                    Riwayat
                </Link>
                <Link to="/profile-user/" className={`item ${activeMenu === "/profile-user/" ? "active" : ""}`}>
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