'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
// import { convertServerPatchToFullTree } from 'next/dist/client/components/segment-cache/navigation'

export default function ProfilePage() {

  const router = useRouter()
  const [data, setData] = useState('nowt')

  const logout = async () => {
    try {
      await axios.get('api/users/logout')
      toast.success('Logout successful')
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'An unknown error occurred'

      console.log({ error: message })
      toast.error(message)
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data)
    setData(res.data.data._id)
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <hr />
      <p>profile page</p>
      <h2 className='text-white p-2 rounded bg-gray-700'>{data === 'nowt' ? 'No user data' : <Link href={`/profile/${data}`}>User ID: {data}</Link>}</h2>
      <hr />
      <button
      onClick={logout}
      className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >Logout</button>
      <button
      onClick={getUserDetails}
      className='bg-green-700 mt-4 hover:bg-green-900 text-white font-bold py-2 px-4 rounded'
      >Get User Details</button>
    </div>
  )
}
