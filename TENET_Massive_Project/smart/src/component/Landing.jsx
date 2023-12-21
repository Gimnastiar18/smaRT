import React from 'react'
import { Link } from 'react-router-dom'
import { BsInstagram, BsFacebook, BsMailbox2,  } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import "../styles/ardi.css";


const Landing = () => {
    return (
        <>
            <div className="navigasi d-flex justify-content-between align-items-center">
                <img
                    className="logo-landing"
                    alt=""
                    src="./logo.png"
                    width={'150px'}
                />

                <div className="menu d-flex align-items-center">
                    <div className="menu-item d-flex">
                        <div className="state">
                            <a href="#hero" className="menu-title text-decoration-none text-white">Beranda</a>
                        </div>
                        <div className="ms-4 state">
                            <a href="#tentang-kami" className="menu-title text-decoration-none text-white">Tentang Kami</a>
                        </div>
                        <div className="ms-4 state">
                            <a href="#layanan" className="menu-title text-decoration-none text-white">Layanan</a>
                        </div>
                    </div>
                    <div className="d-flex ms-5">
                        <Link to={'/login'}><button className='btn-login'>Masuk</button></Link>
                        <Link to={'/register'}><button className='btn-login ms-2'>Daftar</button></Link>

                    </div>
                </div>
            </div>
            <section className="hero d-flex align-items-center justify-content-between vh-100" id='hero'>
                <div className="hero-text">
                    <img className="logo-landing" src="./logo.png" alt="" width={'150px'} />
                    <p className='text-hero mt-3'>Solusi Administrasi Praktis, Layanan Terpercaya untuk Kesejahteraan Lingkungan!</p>
                </div>
                <div className="hero-img">
                    <img src="assets/section.png" alt="" />
                </div>
            </section>
            <section className="tentang-kami vh-100" id='tentang-kami'>
                <div className="section-title d-flex justify-content-center align-items-center">
                    <h2 className='fw-bold'>Tentang Kami</h2>
                </div>
                <div className="about-content d-flex justify-content-between align-items-center">
                    <img src="assets/aboutus.png" alt="" />
                    <p className='text-about'>Kami adalah tim yang berdedikasi di RT 11 Wanasari, Cibitung, kota
                        Bekasi siap membantu Anda dalam proses pengurusan surat pengantar.
                        Dengan pengalaman dan komitmen kami, kami memastikan pelayanan
                        yang cepat, mudah, dan efisien.</p>
                </div>
            </section>
            <section className="layanan" id='layanan'>
                <div className="section-title d-flex justify-content-center align-items-center">
                    <h2 className='fw-bold'>Layanan Kami</h2>
                </div>
                <div className="layanan-content d-flex flex-wrap">
                    <div className="content-surat rounded pb-4 px-4 text-center">
                        <img src="assets/surat.png" alt="" />
                        <h4>Keterangan Domisili</h4>
                        <p className='text-secondary'>Mudah dan cepat dapatkan Surat Keterangan Domisili dengan layanan online kami. Proses simpel, tanpa perlu datang ke kantor.</p>
                    </div>
                    <div className="content-surat rounded pb-4 px-4 text-center">
                        <img src="assets/surat.png" alt="" />
                        <h4>Pengantar KTP</h4>
                        <p className="text-secondary">Dapatkan Pengantar KTP dengan cepat dan praktis melalui layanan online kami. Isi formulir, kami yang uruskan. Proses tanpa ribet, waktu Anda lebih efisien</p>
                    </div>
                    <div className="content-surat rounded pb-4 px-4 text-center">
                        <img src="assets/surat.png" alt="" />
                        <h4>Surat Keterangan Tidak Mampu</h4>
                        <p className="text-secondary">Mendapatkan pengajuan surat keterangan tidak mampu secara online dan kami akan membantu Anda mendapatkan dokumen yang diperlukan</p>
                    </div>
                    <div className="content-surat rounded pb-4 px-4 text-center">
                        <img src="assets/surat.png" alt="" />
                        <h4>Keterangan Usaha</h4>
                        <p className="text-secondary">Segera peroleh Surat Keterangan Usaha dengan mudah melalui layanan online kami. Ajukan permohonan, lengkapi detail usaha Anda, dan kami akan memprosesnya secara efisien</p>
                    </div>
                    <div className="content-surat rounded pb-4 px-4 text-center">
                        <img src="assets/surat.png" alt="" />
                        <h4>Pengantar KK</h4>
                        <p className="text-secondary">Memudahkan proses pengajuan surat pengantar untuk perpindahan Kartu Keluarga dari RT 11 Wanasari dengan layanan kami.</p>
                    </div>
                    <div className="content-surat rounded pb-4 px-4 text-center">
                        <img src="assets/surat.png" alt="" />
                        <h4>Pengantar Nikah</h4>
                        <p className="text-secondary">Dapatkan Pengantar Nikah secara cepat dan tanpa repot melalui layanan online kami. Proses simpel, cukup isi formulir, kami yang mengurus.</p>
                    </div>
                </div>
            </section>
            <div className="selengkapnya vh-100 text-center mt-5">
                <h4 className='fw-bold'>Lihat layanan selengkapnya</h4>
                <p>Lihat pilihan layanan lainnya dengan daftar smaRT
                    atau masuk jika sudah memiliki akun</p>
                <Link to={'/register'}>
                    <button className='btn-s'>Daftar Sekarang</button>
                </Link> <br />
                <img src="./assets/service.png" alt="" />
            </div>

            <div className="footer text-white d-flex flex-column">
                <div className="content-footer d-flex justify-content-around">
                    <div className="img-footer d-flex align-items-center">
                    <img src="./logo.png" alt="" width={'200px'} />
                    </div>
                    <div className="footer-des">
                        <p>Tingkatkan efisiensi, dapatkan surat pengantar RT anda secara online!</p>
                        <p>Layanan Surat Online smaRT hadir untuk memudahkan warga RT 11 Wanasari, Bekasi.</p>
                    </div>
                    <div className="footer-nav d-flex flex-column">
                        <h6>NAVIGASI</h6>
                        <a href='#hero' className='text-decoration-none text-white'>Beranda</a>
                        <a href='#tentang-kami' className='text-decoration-none text-white'>Tentang Kami</a>
                        <a href='#layanan' className='text-decoration-none text-white'>Layanan</a>
                    </div>
                    <div className="footer-detail d-flex flex-column">
                        <h6>DETAIL KAMI</h6>
                        <a className='text-decoration-none text-white' href=''><FaLocationDot/> Bekasi, Indonesia</a>
                        <a className='text-decoration-none text-white' href=''><IoCall/> +628-2345-6789</a>
                        <a className='text-decoration-none text-white' href='mailto:tenet123@gmail.com'><BsMailbox2/> tenet123@gmail.com</a>
                    </div>
                    <div className="footer-sosmed d-flex flex-column">
                        <h6>SOSIAL MEDIA</h6>
                        <a className='text-decoration-none text-white' href=""><BsInstagram /> tenet.id</a>
                        <a className='text-decoration-none text-white' href=""><BsFacebook /> tenet.id</a>
                        <a className='text-decoration-none text-white' href=''><BsMailbox2 /> tenet123@gmail.com</a>

                    </div>
                </div>
                <div className="copyright text-center m-5">
                    <p>Copyright @ 2023 - TENET</p>
                </div>
            </div>
        </>
    )
}

export default Landing