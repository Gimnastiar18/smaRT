import React, { useState, useEffect } from 'react';
import "../styles/ardi.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LupaKatsan = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    keamanan: '',
  });

  const [errors, setErrors] = useState({
    email: '',
  });

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

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop the function if form is not valid
    }

    axios.post('http://localhost:3000/lupa-sandi', formData)
      .then(response => {
        navigate('/ubah-sandi', { state: { email: formData.email } });
      })
      .catch(error => {
        // Handle API error
        if (error.response) {
          if (error.response.status === 401) {
            console.log('Kesalahan, tidak bisa mengubah kata sandi');
            setErrors({
              ...errors,
              email: 'Kesalahan, tidak bisa mengubah kata sandi',
            });
          } else if (error.response.status === 404) {
            console.log('Email tidak ditemukan');
            setErrors({
              ...errors,
              email: 'Email tidak ditemukan',
            });
          }
        } else if (error.request) {
          console.error('No response received. Error:', error.request);
        } else {
          console.error('Error sending request:', error.message);
        }
      });
  };

  return (
    <div>
      <div className='d-flex vh-100 justify-content-center align-items-center'>
        <div className="bg-kng d-flex justify-content-around align-items-center border rounded shadow">
          <img src="/logo-black.png" alt="" width={'290px'} />
          <div className="form-update-sandi">
            <h3 className='fw-bold text-center mb-3'>Lupa Kata Sandi</h3>
            <form className='d-flex flex-column gap-3' id='lupaSandi' onSubmit={handleSubmit}>
              <input className='form-control rounded' type="email" name="email" id="email" placeholder='Masukkan Email' value={formData.email}
                onChange={handleChange} />
              {errors.email && <div className="error">{errors.email}</div>}
              <input className='form-control rounded' type="text" name="keamanan" id="keamanan" placeholder='Karakter Favoritmu Saat Kecil?' value={formData.keamanan}
                onChange={handleChange} />
              <input className='btn-b' type="submit" value="Kirim" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LupaKatsan;
