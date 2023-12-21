import React from "react";
import Surat from "./Surat";
import SidebarUser from "../component/SidebarUser";
import "../styles/ardi.css";


const JenisSurat = () => {
  return (
    <div className="dashboard">
      <SidebarUser />

      <div className="dashboard--content">
        <h2>Jenis Surat</h2>

          <div className="bg-jns-srt rounded d-flex justify-content-center">
            <div className="d-flex flex-wrap">
              <Surat title="Surat Keterangan Domisili" idSurat="1" />
              <Surat title="Surat Keterangan Usaha" idSurat="2" />
              <Surat title="SK Tidak Mampu" idSurat="3" />
              <Surat title="Surat Pengantar KTP" idSurat="4" />
              <Surat title="Surat Pengantar KK" idSurat="5" />
              <Surat title="Surat Keterangan Kematian" idSurat="6" />
              <Surat title="Surat Pengantar Nikah" idSurat="7" />
              <Surat title="Surat Permohonan Cerai" idSurat="8" />
              <Surat title="SK Penghasilan Orang Tua" idSurat="9" />
              <Surat title="SK Belum Menikah" idSurat="10" />
              <Surat title="SK Belum Memiliki Rumah" idSurat="11" />
            </div>
          </div>
        </div>
      </div>
  );
};

export default JenisSurat;
