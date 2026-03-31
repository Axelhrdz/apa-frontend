import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import GuestHome from '../components/home/GuestHome';

const Home = ({ user, error }) => {
  

  console.log(user);
  return (
    // <div className='bg-[#000] text-white h-screen flex flex-col items-center justify-center'>
    //   <h1>Home</h1>
    //   {/*---- render error ----- */}
    //   {error && <p className='text-red-500'>{error}</p>}

    //   {/* ---- render user or login message ----- */}
    //   {user ? (
    //     <div className='flex flex-col items-center justify-center'>
    //       <h2>Welcome, {user?.username}!</h2>
    //       <span>Go to <Link className='text-blue-500' to='/overview'>Overview</Link></span>
    //     </div>
    //   ) : (
    //     <div>
    //       {/* <h2>Please login or register to conitnue <Link className='text-blue-500' to='/login'>Login</Link> or <Link className='text-blue-500' to='/register'>Register</Link></h2> */}
    //       <GuestHome />
    //     </div>
    //   )}


    //   <br />
    //   <div className='userInfo-div flex flex-col gap-2'>
    //   </div>
    // </div>
    <div>
      {error && <p className='text-red-500'>{error}</p>}
      {user ? (
        <div>
          <h2>Welcome, {user?.username}!</h2>
        </div>
      ) : (
        <GuestHome />
      )}
    </div>
  )
}

export default Home
