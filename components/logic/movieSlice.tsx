import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

const MOVIES_URL = 'https://www.omdbapi.com/'
const API_KEY = '3399d597'

export type MoviesState = {
    moviesList: Array<any> | undefined,
    isLoading: boolean,
    isModalLoading: boolean,
    modalState: boolean,
    modalInfo: any
}

const initialState: MoviesState = {
    moviesList: undefined,
    isLoading: false,
    isModalLoading: false,
    modalState: false,
    modalInfo: undefined
}

interface SearchInput {
    title: string
}

interface MovieInput {
    id: string
}

export const fetchMovies = createAsyncThunk<any,SearchInput, {state: RootState}>
(
    'movies/searchMovies', 
    async ({title}) => {
        const response = await axios.get(MOVIES_URL, {params: {
            apikey: API_KEY,
            s: title
        }})
        return (response.data) as any
})

export const fetchMovieDetails = createAsyncThunk<any, MovieInput, {state: RootState}>
(
    'movies/fetchMovieDetails',
    async ({id}) => {
        const response = await axios.get(MOVIES_URL, {
            params: {
                apikey: API_KEY,
                i: id
            }
        })
        return (response.data) as any
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        closeModal: (state) => {
            state.modalState = false
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchMovies.fulfilled, (state : MoviesState, action) => {
            state.moviesList = action.payload.Search
            state.isLoading = false
        })
        .addCase(fetchMovies.pending, (state : MoviesState) => {
            state.isLoading = true
        })
        .addCase(fetchMovies.rejected, (state: MoviesState) => {
            state.isLoading = false
        })
        /*         fetch Movie Details            */
        .addCase(fetchMovieDetails.pending, (state: MoviesState)=>{
            state.isModalLoading = true
        })
        .addCase(fetchMovieDetails.rejected, (state: MoviesState)=>{
            state.isModalLoading = false
        })         
        .addCase(fetchMovieDetails.fulfilled, (state: MoviesState, action)=>{
            state.isModalLoading = false
            state.modalState = true
            state.modalInfo = action.payload
        }) 
    }
})

export const {closeModal} = moviesSlice.actions

export default moviesSlice.reducer