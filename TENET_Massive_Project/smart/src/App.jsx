import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Router Halaman Ardi
import BuatSurat from "./pages_ardi/BuatSurat";
import EditProfilUser from "./pages_ardi/EditProfilUser";
import EditProfilAdmin from "./pages_ardi/EditProfilAdmin";
import EditSurat from "./pages_ardi/EditSurat";
import JenisSurat from "./pages_ardi/JenisSurat";
import KelolaSurat from "./pages_ardi/KelolaSurat";
// Router Halaman Aqbil
import ProfileUser from "./pages_aqbil/ProfileUser";
import SuratMasuk from "./pages_aqbil/SuratMasuk";
import ArsipSurat from "./pages_aqbil/ArsipSurat";
import ProfileAdmin from "./pages_aqbil/ProfileAdmin";
import { SemuaArsip } from "./pages_aqbil/SemuaArsip";
import LandingPage from "./component/Landing";
import GantiKatsan from "./pages_ardi/GantiKatsan";
import CekUser from "./pages_ardi/CekUser";
import BerandaUser from "./pages_jeff/BerandaUser";
import RiwayatSurat from "./pages_jeff/RiwayatSurat";
import LoginForm from "./pages_jeff/LoginForm";
import RegisterForm from "./pages_jeff/Register";
import BerandaAdmin from "./pages_jeff/BerandaAdmin";
import LupaKatsan from "./pages_ardi/LupaKatsan";
import DetailSurat from "./pages_aqbil/DetailSurat";
import { jwtDecode } from "jwt-decode";
import NotFound from "./component/NotFound";

const App = () => {
  const isAuthenticated = sessionStorage.getItem('accessToken') !== null;
  const userType = isAuthenticated ? jwtDecode(sessionStorage.getItem('accessToken')).userType : null;
  return (
    <>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/lupa-sandi" element={<LupaKatsan />} />
          <Route path="/ubah-sandi" element={<GantiKatsan />} />

          {/* Admin routes */}
          {isAuthenticated && userType === 'Admin' && (
            <>
              <Route path="/admin/surat-masuk/" element={<SuratMasuk />} />
              <Route path="/admin/arsip-surat/" element={<SemuaArsip />} />
              <Route path="/admin/profil/" element={<ProfileAdmin />} />
              {/* <Route path="/admin/semua-arsip/" element={< />} /> */}
              <Route path="/admin/cek-user/:id" element={<CekUser />} />
              <Route path="/admin" element={<BerandaAdmin />} />
              <Route path="/admin/edit-admin/" element={<EditProfilAdmin />} />
              <Route path="/admin/kelola-surat/:id" element={<KelolaSurat />} />
              {/* <Route path="/admin/edit-surat/" element={<EditSurat />} /> */}
            </>
          )}

          {/* User routes */}
          {isAuthenticated && userType === 'User' && (
            <>
              <Route path="/beranda" element={<BerandaUser />} />
              <Route path="/profile-user/" element={<ProfileUser />} />
              <Route path="/riwayat-surat/" element={<RiwayatSurat />} />
              <Route path="/edit-user/" element={<EditProfilUser />} />
              <Route path="/jenis-surat/" element={<JenisSurat />} />
              <Route path="/buat-surat/:idSurat/" element={<BuatSurat />} />
              <Route path="/detail-surat/:id" element={<DetailSurat />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
};

export default App;



