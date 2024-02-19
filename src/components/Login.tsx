import {
  signInWithGoogleRedirect,
  userDocUpdtFunc,
  loginWithEmailPassword,
} from '../utils/firebase'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSchema } from '../utils/schemas'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { auth } from '../utils/firebase'
import { getRedirectResult } from 'firebase/auth'
import { useState } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState, reset } = useForm<
    z.infer<typeof UserSchema>
  >({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { errors } = formState

  // handle invalid credentials error (includes unsigned email or wrong password)
  const formSubmit = async (formData: z.infer<typeof UserSchema>) => {
    const response = await loginWithEmailPassword(
      formData.email,
      formData.password
    )
    if (response?.status === 200) {
      navigate('/')
    } else {
      reset()
      if (response?.message) {
        setErrorMessage(response.message)
      }
    }
  }

  const loginWithGoogle = async () => {
    await signInWithGoogleRedirect()
  }

  useEffect(() => {
    const googleRedirect = async () => {
      const response = await getRedirectResult(auth)
      if (response) {
        await userDocUpdtFunc(response.user)
        navigate('/')
      }
    }
    googleRedirect()
  }, [navigate])

  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24 bg-slate-100'>
      <div className='w-3/4 max-w-xl flex flex-col items-center justify-center bg-white rounded-xl space-y-5 p-12'>
        <h1 className='text-black text-lg font-medium'>Login Form</h1>
        <form onSubmit={handleSubmit(formSubmit)} className='w-full'>
          <div className='flex flex-col space-y-4'>
            <div className='flex flex-col'>
              <input
                type='email'
                placeholder='Enter email'
                {...register('email')}
                className='bg-slate-200 text-md text-black placeholder:text-md placeholder:text-center placeholder:text-slate-500 rounded-md border border-slate-100 px-5 py-2 focus:outline-none'
              />
              <p className='text-red-900 text-sm'>{errors.email?.message}</p>
            </div>
            <div className='flex flex-col'>
              <input
                type='password'
                placeholder='Enter password'
                {...register('password')}
                className='bg-slate-200 text-md text-black placeholder:text-md placeholder:text-center placeholder:text-slate-500 rounded-md border border-slate-100 px-5 py-2 focus:outline-none'
              />
              <p className='text-red-900 text-sm'>{errors.password?.message}</p>
            </div>
            <p className='text-red-900 text-sm font-semibold'>{errorMessage}</p>
            <button
              type='submit'
              className='rounded-lg bg-slate-500 px-2 py-2 text-lg'
            >
              Login
            </button>
            <p className='text-sm text-black text-center'>
              New User? Signup{' '}
              <Link
                to='/signup'
                className='hover:text-slate-500 hover:underline'
              >
                here
              </Link>
            </p>
          </div>
        </form>

        <div className='w-full flex justify-between items-center'>
          <div className='w-1/2 border-2 border-slate-200'></div>
          <div className='text-slate-400 flex-center px-3'>
            <p>or</p>
          </div>
          <div className='w-1/2 border-2 border-slate-200'></div>
        </div>

        <button
          type='submit'
          className='rounded-lg bg-slate-500 px-2 py-2 text-lg w-full mt-10'
          onClick={loginWithGoogle}
        >
          Login with GOOGLE
        </button>
      </div>
    </div>
  )
}

export default Login
