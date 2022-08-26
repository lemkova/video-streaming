import { NextPage } from 'next'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './logic/store'
import {closeModal} from './logic/movieSlice'
import {useRouter} from 'next/router'

const MovieDesc : NextPage = () => {
  const movieDetails = useSelector((state: RootState) => state.movies.modalInfo)
  const dispatch = useDispatch<AppDispatch>()

  const router = useRouter()

  const viewMoreHook = () => {
    router.push({
      pathname: '/movie/[mid]',
      query: {mid: movieDetails.imdbID}
    })
    dispatch(closeModal())
  }

  return (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#2d3436] focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-[#636e72] rounded-t">
                  <h3 className="text-3xl font-semibold text-white">
                    Movie Details
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div>
                    <div>
                      <img src={movieDetails.Poster}/>
                    </div>
                    <div>
                      <p className="my-4 text-slate-500 text-lg leading-relaxed">
                        Name: {movieDetails.Title}<br/>
                        Year: {movieDetails.Year}<br/>
                        Language: {movieDetails.Language}<br/>
                      </p>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-[#636e72] rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=> {dispatch(closeModal())}}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={viewMoreHook}
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default MovieDesc