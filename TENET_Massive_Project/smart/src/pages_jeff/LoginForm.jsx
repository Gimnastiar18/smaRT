import { BiLogoGoogle } from "react-icons/bi";
import "../App.css";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";


const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    kata_sandi: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    kata_sandi: '',
  });

  const handleChange = (e) => {
    // Perbarui state saat nilai formulir berubah
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Alamat email tidak valid';
      isValid = false;
    } else {
      newErrors.email = '';
    }

    // Validate Kata Sandi
    if (formData.kata_sandi.trim() === '') {
      newErrors.kata_sandi = 'Kata Sandi harus diisi';
      isValid = false;
    } else {
      newErrors.kata_sandi = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios.post('http://localhost:3000/login', formData)
        .then(response => {
          sessionStorage.setItem('accessToken', response.data.accessToken)
          if (response.data.role === 'user') {
            navigate('/beranda');
          } else {
            navigate('/admin');
          }
          window.location.reload();
        })
        .catch(error => {
          // Handle API error
          if (error.response) {
            if (error.response.status === 400) {
              console.log('Kata Sandi Salah');
              setErrors({
                ...errors,
                kata_sandi: 'Kata Sandi Salah',
              });
            } else if (error.response.status === 404) {
              console.log('Email tidak ditemukan');
              setErrors({
                ...errors,
                email: 'Email tidak ditemukan',
              });
            }
          } else if (error.request) {
            // No response received
            console.error('No response received. Error:', error.request);
          } else {
            // Error sending the request
            console.error('Error sending request:', error.message);
          }
        });
    }
  };


  return (
    <div className="cntn-login vh-100">
      <div className="loginform">
        <img className="logo-file" src='../assets/surat.png' alt="" />
        <div gap={3}>
          <img className="logosmart mb-2" src='/logo-black.png' alt="" />
          <h1 className="blue-h1">Selamat Datang</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className={`form-control form-control-sm ${errors.email && 'is-invalid'}`}
                name="email"
                placeholder="Masukkan Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.email}</div>}
            </div>
            <div className="mb-3">
              <input
                type="password"
                className={`form-control form-control-sm ${errors.kata_sandi && 'is-invalid'}`}
                name="kata_sandi"
                placeholder="Masukkan Kata Sandi"
                value={formData.kata_sandi}
                onChange={handleChange}
              />
              {errors.kata_sandi && <div className="invalid-feedback" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.kata_sandi}</div>}
            </div>
            <div className="lupasandi mb-3" >
              <Link to='/lupa-sandi/' style={{ textDecoration: 'none' }}>Lupa Kata Sandi?</Link>
            </div>
            <div className="d-grid gap-2 btn-msk">
              <button className="btn" type="submit">
                Masuk
              </button>
            </div>
          </form>
          <div className="buat-akun">
            <p className="d-flex ">
              Belum punya akun?
              <Link to={'/register/'} style={{ textDecoration: 'none' }}>
                Daftar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
