import React from 'react'
import { NextPage } from 'next'

import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../logic/store'
import { AuthState } from '../logic/authSlice'

import { useEffect, useState } from 'react'
import Router from 'next/router'
import Navbar from '../Navbar'
import Movie from '../Movie'
import MovieDesc from '../MovieDesc'

export interface PropsData {
    data?: any
}

type MoviesData = Array<any>

const HomeRouter : NextPage<PropsData> = (props: PropsData) => {
    const moviesList = useSelector((state: RootState) => state.movies.moviesList)
    const showModal = useSelector((state: RootState) => state.movies.modalState)
    const authState: AuthState = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>()

    const [movies, setMovies] = useState<MoviesData>([]);

    useEffect(() => {
        if(moviesList !== undefined){
            setMovies(moviesList)
        }
    },[moviesList])

    useEffect(() => {
        if(moviesList == undefined){
            setMovies(props.data.Search)
        }
    },[])

    useEffect(() => {
        if(!authState.isLoginSuccess){
            Router.push('/')
        }
    },[authState.isLoginSuccess])

    return (
        <>
            { showModal &&
                <MovieDesc />

            }
            <div className="bg-[#303030] min-h-screen w-full text-white">
                <Navbar isHome/>
                <div className='flex flex-wrap justify-center'>
                {
                    movies && movies.map((e : any, id: number) => {
                        return (
                            <Movie key={id} title={e.Title} poster={e.Poster} mid={e.imdbID} />
                        )
                    })
                }   
                </div>         
            </div>
        </>
    )
}

export default HomeRouter