'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast';



export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username:'',
  })

  const buttonDisabled = !(
    user.email.length > 0 &&
    user.password.length > 0 &&
    user.username.length > 0
  )

  const [loading, setLoading] = React.useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log('signup success:', response.data)
      router.push('/login')
    } catch (error) {
      if (error instanceof Error) {
        console.log('Signup failed:', error.message)
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? 'Processing...' : 'Signup'}</h1>
      <hr />
      <label htmlFor='username'>username</label>
      <input
        className='bg-gray-800'
        id='username'
        type='text'
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder='username'
      />
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
        onClick={onSignup}
        disabled={buttonDisabled || loading}
        className='p-2 border border-gray-300 rounded-lg mt-2 mb-4 focus:outline-none focus:border-gray-600'>{buttonDisabled ? 'Signup unavailable' : 'Signup'}
      </button>
      <Link href='/login'>
        Visit login
      </Link>
    </div>
  )
}
