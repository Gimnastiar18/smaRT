import React from 'react'
import SidebarAdmin from '../component/SidebarUser'

const BerandaUser = () => {
  return (
    <div className="dashboard">
      <SidebarAdmin />

      <div className="dashboard--content">
        <h2>Beranda</h2>
      </div>
    </div>
  )
}

export default BerandaUser