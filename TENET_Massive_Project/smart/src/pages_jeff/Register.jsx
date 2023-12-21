import "../app.css";
import "../styles/register.css";
import { BiLogoGoogle } from "react-icons/bi";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    kata_sandi: '',
    konfirmasi_sandi: '',
    setuju: '',
    keamanan: '',
  })

  const handleChange = (e) => {
    // Perbarui state saat nilai formulir berubah
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [errors, setErrors] = useState({
    nama: '',
    email: '',
    kata_sandi: '',
    konfirmasi_sandi: '',
    setuju: '',
  });

  const validateForm = async () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate Nama
    if (formData.nama.trim() === '') {
      newErrors.nama = 'Nama harus diisi';
      isValid = false;
    } else {
      newErrors.nama = '';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Alamat email tidak valid';
      isValid = false;
    } else {
      newErrors.email = '';
    }

    // Validate Kata Sandi
    if (formData.kata_sandi.length < 6) {
      newErrors.kata_sandi = 'Kata Sandi harus memiliki minimal 6 karakter';
      isValid = false;
    } else {
      newErrors.kata_sandi = '';
    }

    // Validate Konfirmasi Kata Sandi
    if (formData.konfirmasi_sandi !== formData.kata_sandi) {
      newErrors.konfirmasi_sandi = 'Konfirmasi Kata Sandi tidak sesuai';
      isValid = false;
    } else {
      newErrors.konfirmasi_sandi = '';
    }

    // Validate Setuju
    if (!formData.setuju) {
      newErrors.setuju = 'Anda harus menyetujui Ketentuan dan Layanan';
      isValid = false;
    } else {
      newErrors.setuju = '';
    }

    // Validate Pertanyaan Keamanan
    if (formData.keamanan.trim() === '') {
      newErrors.keamanan = 'Pertanyaan keamanan harus diisi';
      isValid = false;
    } else {
      newErrors.keamanan = '';
    }

    setErrors(newErrors);
    return isValid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await validateForm()) {
      try {
        const response = await axios.post('http://localhost:3000/register', formData);
        navigate('/login');
        console.log('Success:', response.data);
        setShowSuccessPopup(true);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 409) {
            console.log('Email telah digunakan');
            setErrors({
              ...errors,
              email: 'Email sudah digunakan',
            });
          }
        } else if (error.request) {
          console.error('No response received. Error:', error.request);
        } else {
          console.error('Error sending request:', error.message);
        }
      }
    }
  };


  const handleLoginClick = () => {
    navigate('/login');
    setShowSuccessPopup(false);
  };

  
  return (
    <div className="cntn-login vh-100">
      <div className="register-form">
        <div className="d-flex flex-column gap-2">
          <h1 className="blue-h1 text-center">Daftar</h1>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <label htmlFor="nama" className="bold-label">Nama</label>
                <input name="nama" type="text" className="form-control" value={formData.nama}
                onChange={handleChange} />
                {/* Display Nama validation error */}
                {errors.nama && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.nama}</div>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="bold-label">Alamat Email</label>
              <input name="email" type="email" className={`form-control ${errors.email && 'is-invalid'}`} value={formData.email}
                onChange={handleChange}/>
                {/* Display Email validation error */}
                {errors.email && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.email}</div>}
            </div>

            <div>
              <label htmlFor="kata_sandi" className="bold-label">Kata Sandi</label>
              <input name="kata_sandi" type="password" className="form-control" value={formData.kata_sandi}
                onChange={handleChange}/>
                {/* Display Kata Sandi validation error */}
                {errors.kata_sandi && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.kata_sandi}</div>}
            </div>

            <div>
              <label htmlFor="konfirmasi_sandi" className="bold-label">Konfirmasi Kata Sandi</label>
              <input name="konfirmasi_sandi" type="password" className="form-control" value={formData.konfirmasi_sandi}
                onChange={handleChange}/>
                {/* Display Konfirmasi Kata Sandi validation error */}
                {errors.konfirmasi_sandi && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.konfirmasi_sandi}</div>}
            </div>

            <div>
              <label htmlFor="keamanan" className="bold-label">Pertanyaan Keamanan</label>
              <input
                name="keamanan"
                type="text"
                className="form-control"
                value={formData.keamanan}
                placeholder="Karakter Favoritmu saat Kecil"
                onChange={handleChange}
              />
              {/* Display Pertanyaan Keamanan validation error */}
              {errors.keamanan && (
                <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>
                  {errors.keamanan}
                </div>
              )}
            </div>

            <div className="mb-2 mt-2">
              <label className="checkbox">
                <input type="checkbox" name="setuju" checked={formData.setuju} onChange={handleChange}/>
                Setuju dengan Ketentuan dan Layanan
              </label>
              {/* Display Setuju validation error */}
              {errors.setuju && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.setuju}</div>}
            </div>

            <div className="d-grid gap-2 btn-msk mt-5">
              <button className="btn-b" type="submit" disabled={!formData.setuju}>
                Daftar
              </button>
            </div>
          </form>

          {showSuccessPopup && (
            <div className="success-popup">
              <p>Registrasi berhasil! Silakan login.</p>
              <button onClick={handleLoginClick}>Login</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
