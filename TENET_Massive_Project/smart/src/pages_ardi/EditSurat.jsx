import React from "react";
import { Link } from "react-router-dom";
import SidebarAdmin from "../component/SidebarAdmin";
import "../styles/ardi.css";


const EditSurat = () => {
  return (
    <div className="dashboard">
      <SidebarAdmin />

      <div className="dashboard--content">
        <h2>Edit Surat</h2>

        <div className='content'>
            {/* <h4 className='fw-bold'>Edit Surat</h4> */}
            <p className='mb-4 text-secondary'>Judul Surat</p>
            <div className='d-flex'>
                <div className="label-surat">
                    <p className='mb-4'>Nama Lengkap</p>
                    <p className='mb-4'>NIK</p>
                    <p className='mb-4'>Tempat/Tanggal Lahir</p>
                    <p className='mb-4'>Jenis Kelamin</p>
                    <p className='mb-4'>Agama</p>
                    <p className='mb-4'>Alamat</p>
                </div>
                <div className="data-surat">
                    <p className='mb-4'>: Ardi Setiaji</p>
                    <p className='mb-4'>: 1234567</p>
                    <p className='mb-4'>: Kuningan/10 Oktober 2002</p>
                    <p className='mb-4'>: Laki-laki</p>
                    <p className='mb-4'>: Islam</p>
                    <p className='mb-4'>: Desa Cimulya</p>
                </div>
            </div>
            <form className='d-grid gap-3' id='editSurat' name="editSurat" action="">
                <div className='d-flex justify-content-between'>
                    <label className='my-auto' htmlFor="noSurat">No Surat</label>
                    <input className='form-control border border-dark' type='text' name="noSurat" id="noSurat" defaultValue={"qwe123"}></input>
                </div>
                <div className='d-flex justify-content-between'>
                    <label className='my-auto' htmlFor="ttd">Ttd</label>
                    <input className='form-control border border-dark' type="file" name="ttd" id="ttd" />
                </div>
                <div className='d-flex justify-content-between mt-3'>
                    <Link to={"/admin/kelola-surat/"}><button className='btn-s'>Kembali</button></Link>
                    <input className='btn-s' type="submit" value="Submit" />
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default EditSurat;
