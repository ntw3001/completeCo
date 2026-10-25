'use client'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'



export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  })

  const buttonDisabled = !(
    user.email.length > 0 &&
    user.password.length > 0
  )

  const [loading, setLoading] = React.useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      console.log('login succeed', response.data)
      toast.success('login success')
      router.push('/profile')
    } catch(error) {
      if(error instanceof Error){
      console.log('login failure', error.message)
      toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>login</h1>
      <hr />
      <label htmlFor='email'>email</label>
      <input
        className='bg-gray-800'
        id='email'
        type='text'
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder='email'
      />
      <label htmlFor='password'>password</label>
      <input
        className='bg-gray-800'
        id='password'
        type='password'
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder='password'
      />
      <button
        className={
          buttonDisabled ? 'p-2 bg-gray-500 text-gray-400 rounded-lg mt-2 mb-4 focus:outline-none focus:border-gray-300' : 'p-2 border border-gray-300 rounded-lg mt-2 mb-4 focus:outline-none focus:border-gray-600'
        }
        onClick={onLogin}
        disabled={buttonDisabled || loading}>
        {loading ? 'Processing...' : 'Login'}
      </button>
      <Link href='/signup'>
        Visit signup page
      </Link>
    </div>
  )
}
