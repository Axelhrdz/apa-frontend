import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import GuestHome from '../components/home/GuestHome';

const Home = ({ user, error }) => {


  console.log(user);
  return (
    <div className='h-[calc(100dvh-64px)] overflow-hidden flex flex-col items-center justify-center'>
      {error && <p className='text-red-500'>{error}</p>}
      {user ? (
        <div className='flex flex-col items-center justify-center'>
          <h2>Welcome, {user?.username}!</h2>
          <span>Go to <Link className='text-blue-500' to='/overview'>Overview</Link></span>
        </div>
      ) : (
        <GuestHome />
      )}
    </div>
  )
}

export default Home
