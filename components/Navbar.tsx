import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { NextPage } from 'next'
import { AppDispatch, RootState } from './logic/store'
import { fetchMovies } from './logic/movieSlice'
import { logout } from './logic/authSlice'
import { useDispatch, useSelector } from 'react-redux'

interface NavbarProps {
  isHome?: boolean
}

const Navbar : NextPage<NavbarProps> = (props) => {

  const dispatch = useDispatch<AppDispatch>()
  const searchLoading = useSelector((state: RootState) => state.movies.isLoading)

  const [search, setSearch] = useState<string>();

  const onSearchChange = (event : React.ChangeEvent<HTMLInputElement> ) => {
    setSearch(event.target.value)
  }

  const doSearch = (event : React.SyntheticEvent) => {
    event.preventDefault()
    if (search !== undefined){
      dispatch(fetchMovies({title: search}))
    }
  }

  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full'>
      <div>
        <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>
          NGABFLIX
        </h1>
      </div>
      <div className='flex'>
        { props.isHome &&

        <div className='flex items-center'>
          {searchLoading &&
          <FontAwesomeIcon size='lg' icon={faSpinner} title="Loading..." className='fa-spin'/>
          }
          <button 
            className='cursor-pointer bg-transparent border-0 outline-0 h-[32px] w-[32px] p-0 flex items-center justify-center mr-2'
            onClick={doSearch}
          >
            <FontAwesomeIcon size='lg' icon={faMagnifyingGlass} />
          </button>
          <input 
            className="border-[1px] border-solid border-white mr-4 h-[30px] text-[14px] bg-[#40404080] rounded px-[10px] focus:opacity-[1] w-[200px] focus:bg-[#000000cc]"
            type='text'
            placeholder='Cari film'
            onChange={onSearchChange}
          />
        </div>
        }
        <button
              className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'
              onClick={() => { dispatch(logout()) }}
        >
              Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar