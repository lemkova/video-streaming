import React from 'react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full'>
      <div>
        <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>
          NGABFLIX
        </h1>
      </div>
      <div>

      <button
            className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'
          >
            Logout
          </button>
      </div>
    </div>
  )
}

export default Navbar