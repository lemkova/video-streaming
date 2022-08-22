import React from 'react'
import { NextPage } from 'next'

import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../logic/movieSlice'
import { RootState, AppDispatch } from '../logic/store'
import { AuthState, logout } from '../logic/authSlice'

import { useEffect } from 'react'
import Router from 'next/router'
import Navbar from '../Navbar'

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
        <div>
            <Navbar/>
            <h1>Movies</h1>
            <button onClick={doFetchMovies}>Get Movies</button>
            <button onClick={() => {dispatch(logout())}}>Logout</button>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Poster</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        moviesList.map((e : any, id: number) => {
                            return (
                                <tr key={id}>
                                    <td>{e.Title}</td>
                                    <td>{e.Year}</td>
                                    <td className='w-40 h-40'><img src={e.Poster}/></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>            
        </div>
    )
}

export default HomeRouter