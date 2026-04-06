import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Overview from './components/Overview';
import Test from './components/Test';


import AdminDashboard from './pages/admin/AdminDashboard';
import AdminForbidden from './pages/admin/AdminForbidden';

import Fraccionamientos from './pages/overview/Fraccionamientos';
import AperturasMasivas from './pages/overview/AperturasMasivas';
import AutosuficientesMasivas from './pages/overview/AutosuficientesMasivas';

function App() {
  const [user, setUser] = useState(null);
  console.log('user', user);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  //----- render user info right after login -----
  

  //------- Helper Functions -------

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        console.log('from users/me, in front');
        console.log(res.data.user);


        setUser(res.data.user); // same shape as login
        setError('');
      } catch {
        localStorage.removeItem('token');
        setUser(null);
        setError('failed to fetch user data');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if(isLoading) {
    return (
      <div className='bg-stone-900 text-white h-screen flex flex-col items-center justify-center'>
        <div id='loading-div' className='text-2xl font-bold'>Loading...</div>
      </div>
    );
  }
  


  return(
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home user={user} error={error} />} />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login setUser={setUser} />} />
        <Route path='/register' element={user ? <Navigate to='/' /> : <Register setUser={setUser}/>} />

        {/* tools dahsboard */}
        <Route path='/overview' element={user ? <Overview /> : <Navigate to='/login' />} />

        {/* way of using tools component with user auth */}
        {/* <Route path='/tools' element={user ? <Tools /> : <Navigate to='/login' />} /> */}

        {/* admin dashboard */}
        <Route path='/admin' element={user && user.role === 'admin' ? <AdminDashboard /> : <AdminForbidden />} />

        <Route path='/fraccionamientos' element={user ? <Fraccionamientos /> : <Navigate to='/login' />} />
        <Route path='/aperturas-masivas' element={user ? <AperturasMasivas /> : <Navigate to='/login' />} />
        <Route path='/autosuficientes-masivas' element={user ? <AutosuficientesMasivas /> : <Navigate to='/login' />} />
      </Routes>
    </Router>
  )
}


export default App;