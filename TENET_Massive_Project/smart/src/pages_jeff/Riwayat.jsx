import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/ardi.css";



const Riwayat = ({ waktu, id }) => {
    return (
        <Link to={`/detail-surat/${id}`} className='text-decoration-none'>
        <div className="card-surat bg-white text-center rounded border">
            <img className='m-2' src="/icon_jam.png" alt="" height={'79px'}/>
            <p className='text-black'>{waktu}</p>
        </div>
        </Link>
    )
}

export default Riwayat