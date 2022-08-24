import React from 'react'
import { NextPage } from 'next'

import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../logic/movieSlice'
import { RootState, AppDispatch } from '../logic/store'
import { AuthState, logout } from '../logic/authSlice'

import { useEffect } from 'react'
import Router from 'next/router'
import Navbar from '../Navbar'
import Movie from '../Movie'

const HomeRouter : NextPage = () => {
    const moviesList = useSelector((state: RootState) => state.movies.moviesList)
    const authState: AuthState = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>()

    const doFetchMovies = () : void => {
        dispatch(fetchMovies())
    }

    useEffect(() => {
        if(!authState.isLoginSuccess){
            Router.push('/')
        }
    },[authState.isLoginSuccess])

    return (
        <div className="bg-[#2d3436] h-full w-full text-white">
            <Navbar/>
            <h1>Movies</h1>
            <button onClick={doFetchMovies}>Get Movies</button>
            <div className='flex flex-wrap justify-center'>
            {
                moviesList && moviesList.map((e : any, id: number) => {
                    return (
                        <Movie key={id} title={e.Title} poster={e.Poster} />
                    )
                })
            }   
            </div>         
        </div>
    )
}

export default HomeRouter