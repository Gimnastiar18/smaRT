import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/ardi.css";


const Surat = ({ title, idSurat }) => {
    return (
        <Link to={`/buat-surat/${idSurat}/`} style={{textDecoration: 'none' }}>
        <div className="card-surat bg-white text-center rounded border">
            <img className='m-2' src="/public/img-surat.png" alt="" />
            <p className='text-black'>{title}</p>
        </div>
        </Link>
    )
}

export default Surat