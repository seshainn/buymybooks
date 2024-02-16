import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='min-h-screen w-full bg-slate-300'>
      <div className='flex justify-between items-center h-20 bg-slate-400 py-4 px-20'>
        <div className='flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-library-big'
          >
            <rect width='8' height='18' x='3' y='3' rx='1' />
            <path d='M7 3v18' />
            <path d='M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z' />
          </svg>
          <Link to='/'>
            <h1 className='text-2xl font-bold py-4'>BuyMyBooks</h1>
          </Link>
        </div>

        <div className='w-1/3 relative flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-search absolute left-4 opacity-30'
          >
            <circle cx='11' cy='11' r='8' />
            <path d='m21 21-4.3-4.3' />
          </svg>
          <input
            type='text'
            placeholder='Search ...'
            className='border rounded-full px-8 py-2 pl-12 bg-slate-300 focus:outline-none'
          />
        </div>
        <button
          type='button'
          className='px-8 py-1 font-semibold trackin-widest text-lg rounded-xl border-2 border-slate-700 bg-slate-700'
        >
          Login
        </button>
      </div>
      <Outlet />
      <br />
    </div>
  )
}

export default Navbar
