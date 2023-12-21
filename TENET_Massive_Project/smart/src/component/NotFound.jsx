import React, { useState, useEffect } from 'react';

const NotFound = () => {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    // Setelah 3 detik, atur showSpinner menjadi false
    const timeoutId = setTimeout(() => {
      setShowSpinner(false);
    }, 2000);

    // Membersihkan timeout jika komponen dibongkar sebelum 3 detik
    return () => clearTimeout(timeoutId);
  }, []); // [] sebagai dependensi agar useEffect hanya dijalankan sekali setelah render pertama

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      {showSpinner ? (
        <div className="spinner-border" role="status">
          
        </div>
      ) : (
        <div className='h1'>404 Not Found</div>
      )}
    </div>
  );
};

export default NotFound;
