import React, { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {

  const data = useLoaderData()

  return (
    <div className='bg-gray-600 text-white text-3xl text-center p-5'>
      Github is yes, {data.followers} followers
      <img src={data.avatar_url} width={200} alt="" />
    </div>
  )

}

export default Github

export const githubInfoLoader = async () => {
  const response = await fetch('https://api.github.com/users/hiteshchoudhary')
  return response.json()
}
