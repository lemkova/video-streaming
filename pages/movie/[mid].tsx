import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'

const MOVIES_URL = 'https://www.omdbapi.com/'
const API_KEY = '3399d597'

const Movie : NextPage = () => {
  const router = useRouter()
  const { mid } = router.query

  const [movieData, setMovieData] = useState<any>()
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {

      const res = await axios.get(MOVIES_URL, {
        params: {
            apikey: API_KEY,
            i: mid
        }
      })
      const data = res.data
      setMovieData(data)
      setShow(true)
      console.log(movieData)
    }
    fetchData().catch(console.error)
  },[])

  return (
    <div className='bg-[#2d3436] min-h-screen'>
      <Navbar/>
      { show &&
      <div className='bg-[#636e72] h-[768px] mx-20 mt-8 py-6 px-6 rounded-lg flex'>
        <div>
          <img src={movieData.Poster}/>
        </div>
        <div className='mx-4'>
          <p className='text-slate-200'>
            Title: {movieData.Title} <br/>
            Year: {movieData.Year} <br/>
            Rated: {movieData.Rated} <br/>
            Genre: {movieData.Genre} <br/>
            Director: {movieData.Director} <br/>
            Actors: {movieData.Actors} <br/>
            Language: {movieData.Language} <br/>
            Country: {movieData.Country} <br/>
            Plot: {movieData.Plot} <br/>
            IMDB Rating: {movieData.imdbRating} <br/>
          </p>
        </div>
      </div>
      }
    </div>
  )
}


export default Movie