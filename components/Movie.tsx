import { NextPage } from 'next'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './logic/store'
import {fetchMovieDetails} from './logic/movieSlice'
import Image from 'next/image'

type MovieProps = {
    key?: number,
    title: string,
    poster: string,
    mid: string
}

const Movie : NextPage<MovieProps> = (props : MovieProps) => {

    const dispatch = useDispatch<AppDispatch>()

    let title = props.title
    let poster = props.poster
    let mid = props.mid
    let title_trim = title.length > 28 ? (title.slice(0, 25).slice(-1) === ' ' ? title.slice(0, 24) : title.slice(0, 25)) + "..." : title
    return (
        <div className="w-[250px] h-[400px] relative cursor-pointer m-[1em] hover:shadow-2xl"
        onClick={()=>{dispatch(fetchMovieDetails({id: mid}))}}>
            <p className="absolute bottom-0 w-[250px] h-[50px] m-0 text-center py-[12px] px-0 font-semibold box-border text-white bg-[#636e72]">{title_trim}</p>
            <div>
                <Image
                        className='w-[250px] h-[400px] object-cover'
                        width="250"
                        height='350'
                        title={title}
                        src={poster}
                        alt={title}
                    />
            </div>
        </div>
    )
}

export default Movie