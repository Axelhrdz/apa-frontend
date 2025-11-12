import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

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
    };
    fetchUser();
  },[]);



  return(
    <Router>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/register' element={<Register setUser={setUser}/>} />
      </Routes>
    </Router>
  )
}


export default App;