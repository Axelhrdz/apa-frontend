import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Overview from './components/Overview';
import Test from './components/Test';

import Fraccionamientos from './pages/overview/Fraccionamientos';
import AperturasMasivas from './pages/overview/AperturasMasivas';
import AutosuficientesMasivas from './pages/overview/AutosuficientesMasivas';

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  //----- render user info right after login -----
  

  //------- Helper Functions -------


  console.log(`main app user info:`, user);

  //create function to fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      let token = localStorage.getItem('token');
      if(token) {
        try {
          const res = await axios.get('/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        }
        catch(error) {
          setError('failed to fetch user data');
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };
    fetchUser();
  },[localStorage.getItem('token')]);

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
        <Route path='/overview' element={<Overview />} />

        {/* way of using tools component with user auth */}
        {/* <Route path='/tools' element={user ? <Tools /> : <Navigate to='/login' />} /> */}



        <Route path='/fraccionamientos' element={<Fraccionamientos />} />
        <Route path='/aperturas-masivas' element={<AperturasMasivas />} />
        <Route path='/autosuficientes-masivas' element={<AutosuficientesMasivas />} />
      </Routes>
    </Router>
  )
}


export default App;