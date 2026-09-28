'use client'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import { axios } from 'axios'



export default function SignupPage() {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username:'',
  })

  const onSignup = async () => {

  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>signup</h1>
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
        type='text'
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder='password'
      />
      <button
        className='p-2 border border-gray-300 rounded-lg mt-2 mb-4 focus:outline-none focus:border-gray-600'>
        Signup
      </button>
      <Link href='/login'>
        Visit login
      </Link>
    </div>
  )
}
