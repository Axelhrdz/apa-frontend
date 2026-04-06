import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminForbidden = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false); // remove alert from UI
      navigate('/'); // go back to home
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
        <h1>Forbidden view</h1>
        {showAlert && (
            <div style={{ color: 'red', marginBottom: '1rem' }}>
            You are not authorized to access this page
            </div>
        )}
    </div>
  );
};

export default AdminForbidden;