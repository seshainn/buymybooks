import { auth } from '../utils/firebase'
import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [name, setName] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const user = auth.currentUser
    if (user?.email) {
      const userEmail = user.email
      setName(userEmail.slice(0, userEmail.indexOf('@')))
    }
  }, [])

  const handleLogout = async () => {
    await auth.signOut()
    setName(null)
    navigate('/')
  }
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
        {name ? (
          <button onClick={handleLogout} className='group cursor-pointer'>
            <h1 className='text-black hover:text-slate-200 relative'>
              welcome {name}
              <span className='absolute top-full right-0 bg-white text-gray-800 py-1 px-4 border border-gray-300 rounded shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                signout
              </span>
            </h1>
          </button>
        ) : (
          <button
            type='button'
            className='px-8 py-1 font-semibold trackin-widest text-lg text-slate-300 rounded-xl border-2 border-slate-700 bg-slate-700'
          >
            <Link to='/login'>Login</Link>
          </button>
        )}
        <div className='relative cursor-pointer'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='36'
            height='36'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-shopping-cart'
          >
            <circle cx='8' cy='21' r='1' />
            <circle cx='19' cy='21' r='1' />
            <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43' />
          </svg>
          <span className='absolute top-0 right-0 text-red-500 font-semibold px-3 rounded-full text-sm'>
            {0}
          </span>
        </div>
      </div>
      <Outlet />
      <br />
    </div>
  )
}

export default Navbar
