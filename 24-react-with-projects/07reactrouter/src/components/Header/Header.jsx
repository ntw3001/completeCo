import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='shadow sticky z-50 top-0'>
      <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <Link to='/' className='flex items-center'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/960px-LEGO_logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20231016092137' className='mr-3 h-12' alt='logo' />
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
