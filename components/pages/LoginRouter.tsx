import { NextPage } from 'next'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authLoginApi, AuthState } from '../logic/authSlice'
import { AppDispatch, RootState } from '../logic/store'

import Image from 'next/future/image'
import bg from '../../public/flixbg.jpg'

import { useState, useEffect } from 'react'
import Router from 'next/router'

const LoginRouter : NextPage = () => {
  const authState: AuthState = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()

  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailChange = (event : React.ChangeEvent<HTMLInputElement> ) => {
    setEmail(event.target.value)
  }

  const passwordChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const doSubmit = (event : React.SyntheticEvent) => {
    event.preventDefault()
    dispatch(authLoginApi({email, password}))
    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    if(authState.isLoginSuccess){
      Router.push('/home')
    }
  },[authState.isLoginSuccess])

  return (
    <div className='w-full h-screen'>
      <Image
            className='hidden sm:block absolute w-full h-full object-cover'
            src={bg}
            alt='/'
        />
      <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
      <div className='fixed w-full px-4 py-24 z-50'>
        <div className='max-w-[450px] h-[400px] mx-auto bg-black/75 text-white'>
          <div className='max-w-[320px] mx-auto py-16'>
            <h1 className='text-3xl font-bold'>Sign In</h1>
            {authState.isLoginPending ? <p className='p-3 bg-[#81ecec] my-2 text-black'>Sedang Loading...</p> : null}
            {authState.errorMessage && !authState.isLoginPending ? <p className='p-3 bg-red-400 my-2'>{authState.errorMessage}</p> : null}
            <form className='w-full flex flex-col py-4' onSubmit={doSubmit}>
              <input
                className='p-3 my-2 bg-gray-700 rouded'
                type='email'
                placeholder='Email'
                autoComplete='email'
                onChange={emailChange}
              />
              <input
                className='p-3 my-2 bg-gray-700 rouded'
                type='password'
                placeholder='Password'
                autoComplete='current-password'
                onChange={passwordChange}
              />
              <button className='bg-red-600 py-3 my-6 rounded font-bold'>
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginRouter