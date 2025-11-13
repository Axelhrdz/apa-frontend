import React from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  // console.log(`user from nav:}`, user)


  //------- Helper Functions -------
  const handleLogout = () => {
    console.log('logging out');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  }

  return (
    <nav className='flex justify-between items-center p-4 bg-stone-800 text-white'>
      <div>
        <Link to='/'>APA ASISTENTE</Link>
      </div>
      {/* render logout if user is logged in */}
      {user ? (
        <div>
          <button onClick={handleLogout} className='cursor-pointer text-white bg-blue-500 px-4 py-2 rounded-md'>Logout</button>
        </div>
      ) : (
        <div className='flex gap-4'>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
