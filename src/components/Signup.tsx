import { signUpWithEmailPassword, userDocUpdtFunc } from '../utils/firebase'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { newUserSchema } from '../utils/schemas'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState, reset } = useForm<
    z.infer<typeof newUserSchema>
  >({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { errors } = formState

  //Handle error that occurs when same email is used with multiple providers.
  const formSubmit = async (formData: z.infer<typeof newUserSchema>) => {
    const response = await signUpWithEmailPassword(
      formData.email,
      formData.password
    )
    if (response) {
      if ('message' in response && response.message) {
        reset()
        setErrorMessage(response.message)
      } else if ('user' in response) {
        await userDocUpdtFunc(response.user, {
          displayName: formData.name,
        })
        navigate('/')
      }
    }
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24 bg-slate-100'>
      <div className='w-3/4 max-w-xl flex flex-col items-center justify-center bg-white rounded-xl space-y-5 p-12'>
        <h1 className='text-black text-lg font-medium'>Signup Form</h1>
        <form onSubmit={handleSubmit(formSubmit)} className='w-full'>
          <div className='flex flex-col space-y-4'>
            <div className='flex flex-col'>
              <input
                type='name'
                placeholder='Enter name'
                {...register('name')}
                className='bg-slate-200 text-md text-black placeholder:text-md placeholder:text-center placeholder:text-slate-500 rounded-md border border-slate-100 px-5 py-2 focus:outline-none'
              />
              <p className='text-red-900 text-sm'>{errors.name?.message}</p>
            </div>
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
              Signup
            </button>
            <p className='text-sm text-black text-center'>
              Existing User? Login{' '}
              <Link
                to='/login'
                className='hover:text-slate-500 hover:underline'
              >
                here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
