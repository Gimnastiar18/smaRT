import "../styles/ardi.css";
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

const GantiKatsan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  
  const [formData, setFormData] = useState({
    email: email,
    kata_sandi: '',
    konfirmasi_sandi: '',
  });

  const [errors, setErrors] = useState({
    kata_sandi: '',
    konfirmasi_sandi: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (formData.kata_sandi.length < 6) {
      newErrors.kata_sandi = 'Kata Sandi harus memiliki minimal 6 karakter';
      isValid = false;
    }

    if (formData.konfirmasi_sandi !== formData.kata_sandi) {
      newErrors.konfirmasi_sandi = 'Konfirmasi Kata Sandi tidak sesuai';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.put('http://localhost:3000/ubah-sandi', formData);
        console.log('Success:', response.data);
        navigate('/login');
      } catch (error) {
        // Error handling
      }
    }
  };

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
      <div className="bg-kng d-flex justify-content-around align-items-center border rounded shadow">
        <img src="/logo-black.png" alt="" width={'290px'} />
        <div className="form-update-sandi">
          <h3 className='fw-bold text-center mb-3'>Ganti Kata Sandi</h3>
          <form className='d-flex flex-column gap-3' id='updateSandi' onSubmit={handleSubmit}>
            <div>
              <input className='form-control rounded' type="password" name="kata_sandi" id="kata_sandi" placeholder='Kata Sandi Baru' value={formData.kata_sandi} onChange={handleChange} />
              {errors.kata_sandi && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.kata_sandi}</div>}
            </div>
            <div>
              <input className='form-control rounded' type="password" name="konfirmasi_sandi" id="konfirmasi_sandi" placeholder='Konfirmasi Kata Sandi Baru' value={formData.konfirmasi_sandi} onChange={handleChange} />
              {errors.konfirmasi_sandi && <div className="text-danger" style={{ fontSize: '12px', marginTop: '5px' }}>{errors.konfirmasi_sandi}</div>}
            </div>
            <input className='btn-b' type="submit" value="Simpan" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default GantiKatsan;
