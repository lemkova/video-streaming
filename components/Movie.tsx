import { NextPage } from 'next'
import React from 'react'

type MovieProps = {
    title: string,
    poster: string
}

const Movie : NextPage = ({title, poster} : MovieProps) => {

    let title_trim = title.length > 28 ? (title.slice(0, 25).slice(-1) === ' ' ? title.slice(0, 24) : title.slice(0, 25)) + "..." : title
    return (
        <div className="w-[250px] h-[400px] relative cursor-pointer m-[1em] hover:shadow-2xl">
        <p className="absolute bottom-0 w-[250px] h-[50px] m-0 text-center py-[12px] px-0 font-semibold box-border text-white bg-[#636e72]">{title_trim}</p>
        <div>
            <img
                    className='w-[250px] h-[400px] object-cover'
                    width="200"
                    title={title}
                    src={poster}
                />
        </div>
        </div>
    )
}

export default Movie